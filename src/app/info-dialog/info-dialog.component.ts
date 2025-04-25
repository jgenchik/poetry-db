import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class InfoDialogComponent {

  dialogRef = inject(MatDialogRef<InfoDialogComponent>);


  // constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

}
