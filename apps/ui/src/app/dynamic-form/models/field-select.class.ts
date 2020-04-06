import { FieldBase } from './field-base.class';

export class SelectField extends FieldBase<string> {
  controlType = 'selectfield';
  type: string;
  options: [];
  optionLabel: 'label';
  optionValue: 'value';

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
