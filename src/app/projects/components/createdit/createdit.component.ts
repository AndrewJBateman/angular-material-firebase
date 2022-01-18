import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Project } from 'src/app/projects/models/Project';
import { ProjectService } from 'src/app/projects/services/project.service';

@Component({
  selector: 'app-createdit-project',
  templateUrl: './createdit.component.html',
  styleUrls: ['./createdit.component.scss'],
})
export class CreateditComponent implements OnInit {
  projectForm!: FormGroup;
  title = 'Create Project';
  id: string | undefined;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.projectService.getProjectEdit().subscribe((res) => {
      console.log('res: ', res);
      this.title = 'Edit Project';
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

  onSaveProject() {
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
        this.toastr.info(`The project was saved`, 'Database updated');
      },
      (err) => {
        this.loading = false;
        this.toastr.error('An error occured; ', 'ERROR');
      }
    );
  };

  editProject = async (id: string) => {
    const project: any = {
      title: this.projectForm.value.title,
      description: this.projectForm.value.description,
      reference: this.projectForm.value.reference,
      deadline: this.projectForm.value.deadline,
      accessCode: this.projectForm.value.accessCode,
      updatedDate: new Date(),
    };
    this.loading = true;
    await this.projectService.editProject(id, project).then(
      () => {
        this.loading = false;
        this.title = 'Create Project';
        this.projectForm.reset();
        this.id = undefined;
        this.toastr.info(`The project was updated`, 'Database updated');
      },
      (err) => {
        console.log(err);
      }
    );
  };

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
