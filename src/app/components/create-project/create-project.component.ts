import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  id: string | undefined;

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    projectForm: FormGroup;
    this.initForm();
  }

  ngOnInit(): void {}

  onSaveProject = () => {
    this.id === undefined
      ? this.saveProject(this.projectForm.value)
      : this.editProject(this.id);
  };

  saveProject = (projectData: Project) => {
    console.log('Saving', projectData);
    this.projectService.createProject(projectData);
    this.projectForm.reset();
  };

  editProject = (id: string) => {};

  private initForm = (): void => {
    this.projectForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      reference: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      accessCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      deadline: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  };
}
