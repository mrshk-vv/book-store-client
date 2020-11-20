import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner-view/spinner-view.component';



@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
