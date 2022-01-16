import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent implements OnInit {
  projects: Observable<Project[]> | undefined;
  projectDataLoaded = false;
  columns = [
    {
      columnDef: 'title',
      header: 'Title',
      cell: (project: Project) => `${project.title}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (project: Project) => `${project.description}`,
    },
    {
      columnDef: 'reference',
      header: 'Ref.',
      cell: (project: Project) => `${project.reference}`,
    },
    {
      columnDef: 'accessCode',
      header: 'Code',
      cell: (project: Project) => `${project.accessCode}`,
    },
  ];
  displayedColumns: string[] = [
    'title',
    'description',
    'reference',
    'accessCode',
    'createdDate',
  ];
  dataSource: MatTableDataSource<Project> = new MatTableDataSource();
  id: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects = () => {
    this.projectService.getProjects().subscribe((res) => {
      this.dataSource = new MatTableDataSource(
        res.map((item: any) => {
          return Object.assign(
            { id: item.payload.doc.id },
            item.payload.doc.data()
          );
        })
      );
    });
    this.projectDataLoaded = true;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
