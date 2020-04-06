import { FieldBase } from './field-base.class';

export class NumberField extends FieldBase<string> {
  controlType = 'numberfield';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
