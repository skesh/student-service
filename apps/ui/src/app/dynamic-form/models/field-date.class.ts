import { FieldBase } from './field-base.class';

export class DateField extends FieldBase<string> {
  controlType = 'datefield';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
