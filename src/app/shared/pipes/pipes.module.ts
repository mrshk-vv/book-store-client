import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { EditionPipe } from './edition.pipe';
import { CurrencyPipe } from './currency.pipe';
import { StatusPipe } from './status.pipe';
import { Status } from 'src/app/enums/status-type';
import { TotalAmountPipe } from './total-amount.pipe';
@NgModule({
  imports: [
  ],
  exports: [
      CurrencyPipe,
      EditionPipe,
      StatusPipe,
      TotalAmountPipe
  ],
  declarations: [
      CurrencyPipe,
      EditionPipe,
      StatusPipe,
      TotalAmountPipe
   ]
})
export class PipesModule {
  static forRoot(){
    return{
      ngModule: PipesModule,
      providers: []
    }
  }
 }
