import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PrintingEditionEffects } from 'src/app/store/printing-edition/printing-edition.effects';
import { printingEditionReducer, PRINTING_EDITION_REDUCER_NODE } from 'src/app/store/printing-edition/printing-edition.reducer';
import { PrintingEditionDetailComponent } from './printing-edition-detail/printing-edition-detail.component';
import { PrintingEditionListComponent } from './printing-edition-list/printing-edition-list.component';

const routes: Routes = [
  {
    path:'printingEdition/list', component: PrintingEditionListComponent
  },
  {
    path:'printingEdition/detail', component: PrintingEditionDetailComponent
  },
];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forChild(routes),
    CommonModule,
    ],
  exports: [],
  declarations:  [
    PrintingEditionListComponent,
    PrintingEditionDetailComponent
  ],
  providers: [],
})
export class PrintingEditionModule { }
