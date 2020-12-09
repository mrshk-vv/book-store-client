import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

import { PipesModule } from 'src/app/shared/pipes/pipes.module';





@NgModule({
  declarations: [
    OrderComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    PipesModule.forRoot(),

    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class OrderModule { }
