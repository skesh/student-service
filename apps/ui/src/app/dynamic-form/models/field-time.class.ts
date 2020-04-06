import { FieldBase } from './field-base.class';

export class TimeField extends FieldBase<string> {
  controlType = 'timefield';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
