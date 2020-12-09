import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintingEditionDetailComponent } from './printing-edition-detail/printing-edition-detail.component';
import { PrintingEditionListComponent } from './printing-edition-list/printing-edition-list.component';

import {RoleGuardService as RoleGuard, ROLE_GUARD}  from 'src/app/shared/auth/role-guard.service';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'printing-editions/list',
    component: PrintingEditionListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Client'
    }
  },
  {
    path:'printing-edition/detail/:id',
    component: PrintingEditionDetailComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Client'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([]),
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PipesModule.forRoot(),

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule
    ],
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule
  ],
  declarations:  [
    PrintingEditionListComponent,
    PrintingEditionDetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: ROLE_GUARD,
      useClass: RoleGuard,
    }
  ],
})
export class PrintingEditionModule { }
