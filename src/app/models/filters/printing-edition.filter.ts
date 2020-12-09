import { Type } from '@angular/core';
import { Currency } from 'src/app/enums/currency-type';
import { Edition } from 'src/app/enums/edition-type';

export interface PrintingEditionFilter{
  searchString?: string
  types?: Array<Edition>
  minPrice?: number
  maxPrice?: number
  currency?: Currency
  sort?: boolean
}
