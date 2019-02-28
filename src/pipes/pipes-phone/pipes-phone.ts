import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pipesPhone',
})
export class PipesPhonePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string = '', ...args) {
    let cleaned = ('' + value).replace(/\D/g, '');
    let match1 = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    let match2 = cleaned.match(/^(\d{3})(\d{3})$/);
    let match3 = cleaned.match(/^(\d{3})$/);
    if (match1) {
      return '(' + match1[1] + ') ' + match1[2] + ' - ' + match1[3];
    }
    if (match2) {
      return '(' + match2[1] + ') ' + match2[2] + ' - ';
    }
    if (match3) {
      return '(' + match3[1] + ') ';
    }
    return value;
  }
}

