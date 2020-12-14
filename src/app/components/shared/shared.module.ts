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
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { SpinnerEffect } from './spinner-view/spinner.effect';



@NgModule({
  declarations: [
    HomeComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([SpinnerEffect]),
    PipesModule.forRoot(),
    IvyCarouselModule,

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
