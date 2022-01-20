import { Component, OnInit, ViewChild } from "@angular/core";
import { map, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";

import { Project } from "src/app/projects/models/Project";
import { ProjectService } from "src/app/projects/services/project.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { DeleteComponent } from "../../dialogs/delete/delete.component";

@Component({
	selector: "app-list-projects",
	templateUrl: "./list-projects.component.html",
	styleUrls: ["./list-projects.component.scss"],
})
export class ListProjectsComponent implements OnInit {
	projects: Observable<Project[]> | undefined;
	projectDataLoaded = false;
	columns = [
		{
			columnDef: "title",
			header: "Title",
			cell: (project: Project) => `${project.title}`,
		},
		{
			columnDef: "description",
			header: "Description",
			cell: (project: Project) => `${project.description}`,
		},
		{
			columnDef: "reference",
			header: "Ref.",
			cell: (project: Project) => `${project.reference}`,
		},
		{
			columnDef: "accessCode",
			header: "Code",
			cell: (project: Project) => `${project.accessCode}`,
		},
	];
	displayedColumns: string[] = [
		"title",
		"description",
		"reference",
		"accessCode",
		"createdDate",
		"actions",
	];
	dataSource: MatTableDataSource<Project> = new MatTableDataSource();
	id: string = "";
	index: number = -1;

	constructor(
		private projectService: ProjectService,
		private toastr: ToastrService,
		private dialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.getProjects();
	}

	getProjects = () => {
		this.projectService.getProjects().subscribe(res => {
			this.dataSource = new MatTableDataSource(
				res.map((item: any) => {
					return Object.assign(
						{ id: item.payload.doc.id },
						item.payload.doc.data(),
					);
				}),
			);
		});
		this.projectDataLoaded = true;
	};

	applyFilter = (event: Event) => {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	};

  // pass project data to form for editing
	onEditProject = (project: Project) => {
		this.projectService.addProjectEdit(project);
	};

	onCreateProject = () => {};

	onDeleteProject = (
		id: string,
		title: string,
		description: string,
		reference: string,
		accessCode: number,
		createdDate: Date,
	) => {
		const dialogRef = this.dialog.open(DeleteComponent, {
			data: { id, title, description, reference, accessCode, createdDate },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				const foundIndex = this.projectService.dataChange.value.findIndex(
					p => (p.id = this.id),
				);
				this.projectService.dataChange.value.splice(foundIndex, 1);
			}
		});
	};
}
