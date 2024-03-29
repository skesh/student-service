import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldBase } from './models/field-base.class';

@Injectable({
  providedIn: 'root'
})
export class FieldControlService {
  constructor() {}

  toFormGroup(fields: FieldBase<any>[]) {
    const group: any = {};

    fields.forEach((field: FieldBase<any>) => {
      group[field.key] = field.required
        ? new FormControl(field.value || '', Validators.required)
        : new FormControl(field.value || '');
    });

    return new FormGroup(group);
  }
}
