import { FieldBase } from './field-base.class';

export class TextField extends FieldBase<string> {
  controlType = 'textbox';
  type: string;
  hint: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
