import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ClientOrdersComponent } from './client-orders/client-orders.component';

import {RoleGuardService as RoleGuard, ROLE_GUARD}  from 'src/app/shared/auth/role-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'my-orders',
    component: ClientOrdersComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Client'
    }
  },
];


@NgModule({
  declarations: [
    OrderComponent,
    CheckoutComponent,
    ClientOrdersComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule.forRoot(),
    FormsModule,

    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: ROLE_GUARD,
      useClass: RoleGuard,
    }
  ],
  entryComponents: [CheckoutComponent, PaymentComponent]
})
export class OrderModule { }
