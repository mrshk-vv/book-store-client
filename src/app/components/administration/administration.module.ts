import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from 'src/app/shared/pipes/currency.pipe';
import { EditionPipe } from 'src/app/shared/pipes/edition.pipe';

import { PrintingEditionComponent } from './printing-edition/printing-edition.component';
import { AuthorComponent } from './author/author.component';

import { authorReducer, AUTHOR_REDUCER_NODE } from 'src/app/store/author/author.reducer';
import { AuthorEffects } from 'src/app/store/author/author.effects';

import { printingEditionReducer, PRINTING_EDITION_REDUCER_NODE } from 'src/app/store/printing-edition/printing-edition.reducer';
import { PrintingEditionEffects } from 'src/app/store/printing-edition/printing-edition.effects';

import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



import { AuthorItemComponent } from './author/author-item/author-item.component';
import { PrintingEditionItemComponent } from './printing-edition/printing-edition-item/printing-edition-item.component';

import { EnumsToArrayPipe } from 'src/app/shared/pipes/enums-to-array.pipe';

import {RoleGuardService as RoleGuard, ROLE_GUARD}  from 'src/app/shared/auth/role-guard.service';
import { MatSortModule } from '@angular/material/sort';
import { UserComponent } from './user/user.component';
import { UserItemComponent } from './user/user-item/user-item.component';
import { userReducer, USER_REDUCER_NODE } from 'src/app/store/user/user.reducer';
import { UserEffects } from 'src/app/store/user/user.effects';

export const routes: Routes = [
  {
    path:'administration/printing-editions',
    component: PrintingEditionComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path:'administration/authors',
    component: AuthorComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path: 'administration/users',
    component: UserComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  }
]


@NgModule({
  declarations: [
    PrintingEditionComponent,
    PrintingEditionItemComponent,
    AuthorComponent,
    AuthorItemComponent,
    UserComponent,
    UserItemComponent,

    CurrencyPipe,
    EditionPipe,
    EnumsToArrayPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature(AUTHOR_REDUCER_NODE,authorReducer),
    StoreModule.forFeature(PRINTING_EDITION_REDUCER_NODE, printingEditionReducer),
    StoreModule.forFeature(USER_REDUCER_NODE, userReducer),
    EffectsModule.forFeature([AuthorEffects, PrintingEditionEffects, UserEffects]),
    ReactiveFormsModule,
    FormsModule,

    MatTableModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatSortModule,
    MatSlideToggleModule
  ],
  exports: [
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatSortModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: ROLE_GUARD,
      useClass: RoleGuard,
    }
  ],
  entryComponents:[AuthorItemComponent, PrintingEditionItemComponent, UserItemComponent]
})
export class AdministrationModule { }
