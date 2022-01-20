import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { Project } from "src/app/projects/models/Project";
import { ProjectService } from "src/app/projects/services/project.service";

@Component({
	selector: "app-createdit-project",
	templateUrl: "./createdit.component.html",
	styleUrls: ["./createdit.component.scss"],
})
// @ViewChild('projectForm', {static: true}) projectForm: NgForm
export class CreateditComponent implements OnInit {
	projectForm!: FormGroup;
	title = "Create Project";
	id: string | undefined;
	loading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private projectService: ProjectService,
		private toastr: ToastrService,
	) {
		this.initForm();
	}

	// on init get project values if passed for editing
	ngOnInit(): void {
		this.projectService.getProjectEdit().subscribe(res => {
			this.title = "Edit Project";
			this.id = res.id;
			this.projectForm.patchValue({
				title: res.title,
				description: res.description,
				reference: res.reference,
				deadline: res.deadline,
				accessCode: res.accessCode,
			});
		});
	}

	onClearForm = () => {
		this.initForm();
		this.projectForm.setErrors(null);
	};
	onSaveProject = (): void => {
		this.id === undefined ? this.addProject() : this.editProject(this.id);
	};

	addProject = () => {
		const project: any = {
			title: this.projectForm.value.title,
			description: this.projectForm.value.description,
			reference: this.projectForm.value.reference,
			deadline: this.projectForm.value.deadline,
			accessCode: this.projectForm.value.accessCode,
			createdDate: new Date(),
			updatedDate: new Date(),
		};
		this.loading = true;
		this.projectService.saveProject(project).then(
			() => {
				this.loading = false;
				this.projectForm.reset();
				this.toastr.info(`Project was saved`, "DATABASE UPDATED");
			},
			err => {
				this.loading = false;
				this.toastr.error("An error occured; ", "ERROR");
			},
		);
	};

	editProject = (id: string): void => {
		const project: any = {
			title: this.projectForm.value.title,
			description: this.projectForm.value.description,
			reference: this.projectForm.value.reference,
			deadline: this.projectForm.value.deadline,
			accessCode: this.projectForm.value.accessCode,
			updatedDate: new Date(),
		};
		this.loading = true;
		this.projectService.editProject(id, project).then(
			() => {
				this.loading = false;
				this.title = "Create Project";
				this.projectForm.reset();
				this.id = undefined;
				this.toastr.info(`Project was updated`, "DATABASE UPDATED");
			},
			err => {
				console.log(err);
			},
		);
	};

	private initForm = (): void => {
		this.projectForm = this.fb.group({
			title: [
				"",
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(16),
				],
			],
			description: [
				"",
				[
					Validators.required,
					Validators.minLength(10),
					Validators.maxLength(50),
				],
			],
			reference: [
				"",
				[Validators.required, Validators.minLength(6), Validators.maxLength(6)],
			],
			accessCode: [
				"",
				[Validators.required, Validators.minLength(4), Validators.maxLength(4)],
			],
			deadline: ["", [Validators.required, Validators.minLength(8)]],
		});
	};
}
