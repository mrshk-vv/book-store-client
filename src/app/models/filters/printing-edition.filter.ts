import { Type } from '@angular/core';
import { Edition } from 'src/app/enums/EditionType';

export interface PrintingEditionFilter{
  searchString?: string
  types?: Array<Edition>
  minPrice?: number
  maxPrice?: number
}
