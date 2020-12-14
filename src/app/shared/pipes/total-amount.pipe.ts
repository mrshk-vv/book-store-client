import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total-amount'
})
export class TotalAmountPipe implements PipeTransform {

  transform(items: any[], attr: string): any {
    return items.reduce((a, b) => a + b[attr], 0);
  }

}
