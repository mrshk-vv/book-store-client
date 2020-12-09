import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner-view/spinner-view.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatMenuModule} from '@angular/material/menu';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    PipesModule.forRoot(),
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  exports: [
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ]
})
export class SharedModule { }
