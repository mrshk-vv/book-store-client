import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value){
      case 0:{
        return 'None'
      }

      case 1:{
        return 'Paid'
      }

      case 2:{
        return 'Unpaid'
      }
    }
  }

}
