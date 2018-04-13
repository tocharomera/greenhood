import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avg'
})
export class AvgArrayPipe implements PipeTransform {
  transform(value: any, cmp?: any): any {
    if (!Array.isArray(value) || value.length === 0 ||
      (cmp && typeof (value) === 'object' && !value[0][cmp])) {
      return value;
    }
    let rslt = 0;
    value.forEach(ele => {
      const val = parseFloat(cmp ? ele[cmp] : ele);
      rslt += Number.isNaN(val) ? 0 : val;
    });
    return rslt / value.length;
  }
}

@Pipe({
  name: 'sum'
})
export class SumArrayPipe implements PipeTransform {
  transform(value: any, cmp?: any): any {
    if (!Array.isArray(value) || value.length === 0 ||
      (cmp && typeof (value) === 'object' && !value[0][cmp])) {
      return value;
    }
    let rslt = 0;
    value.forEach(ele => {
      const val = parseFloat(cmp ? ele[cmp] : ele);
      rslt += Number.isNaN(val) ? 0 : val;
    });
    return rslt;
  }
}
@Pipe({
  name: 'sort',
  pure: false
})
export class SortArrayPipe implements PipeTransform {
  transform(value: any, cmp?: any): any {
    if (!Array.isArray(value) || value.length === 0 ||
      (cmp && typeof (value) === 'object' && !value[0][cmp] && !value[0][cmp.substr(1)])) {
      return value;
    }
    let delta = 1;
    let col = cmp;
    if (cmp && cmp.startsWith('-')) {
      delta = -1;
      col = col.substr(1);
    }
    let kk = Array.from(value);
    const rslt = kk.sort((a, b) => {
      let val1 = cmp ? a[col] : a;
      let val2 = cmp ? b[col] : b;
      if (typeof (val1) === 'string') { val1 = val1.toLowerCase(); }
      if (typeof (val2) === 'string') { val2 = val2.toLowerCase(); }
      if (val1 == val2) {
        return 0;
      } else if (val1 < val2) {
        return -delta;
      } else {
        return -delta;
      }
    });
    return rslt;
  }
}

export const PIPES_ARRAYS = [AvgArrayPipe, SumArrayPipe, SortArrayPipe];

