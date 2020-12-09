import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { EditionPipe } from './edition.pipe';
import { CurrencyPipe } from './currency.pipe';
@NgModule({
  imports: [
  ],
  exports: [
    CurrencyPipe,
    EditionPipe
  ],
  declarations: [
    CurrencyPipe,
    EditionPipe
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
