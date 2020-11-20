import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumsToArrayPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (var enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({key: enumMember, value: value[enumMember]});
        console.log("ХУЙ")
        console.log("enum member: ", value[enumMember]);
      }
    }
    return keys;
  }
}
