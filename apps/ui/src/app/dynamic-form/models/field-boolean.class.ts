import { FieldBase } from './field-base.class';

export class BooleanField extends FieldBase<string> {
  controlType = 'booleanfield';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
