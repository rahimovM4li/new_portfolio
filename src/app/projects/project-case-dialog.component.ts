import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';
import { Project } from './projects.component';

@Component({
  selector: 'app-project-case-dialog',
  standalone: true,
  imports: [MatDialogModule, NgForOf],
  templateUrl: './project-case-dialog.component.html',
  styleUrl: './project-case-dialog.component.css'
})
export class ProjectCaseDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private dialogRef: MatDialogRef<ProjectCaseDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  openLink(url: string | undefined): void {
    if (!url) {
      return;
    }

    window.open(url, '_blank', 'noopener');
  }
}
