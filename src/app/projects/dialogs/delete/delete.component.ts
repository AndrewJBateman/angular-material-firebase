import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public projectService: ProjectService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onCancelDelete(): void {
    this.dialogRef.close();
  }

  onConfirmDelete(): void {
    this.projectService.deleteProject(this.data.id).then(
      () => {
        this.toastr.success(
          `Project (id: ${this.data.id}) successfully deleted`,
          'PROJECT DELETED'
        );
      },
      (err) => {
        this.toastr.error('An error occured', 'ERROR', err.message);
      }
    );
  }
}
