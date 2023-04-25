import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newOrderby'
})
export class NewOrderbyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
