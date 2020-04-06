import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
})
export class PhoneMaskPipe implements PipeTransform {
  transform(value: any): string {
    const countryCode = value.slice(0, 2);
    const code = value.slice(2, 6);
    const s1 = value.slice(6, 8);
    const s2 = value.slice(8, 10);
    const s3 = value.slice(10, 12);
    return `${countryCode} (${code}) ${s1}-${s2}-${s3}`;
  }
}
