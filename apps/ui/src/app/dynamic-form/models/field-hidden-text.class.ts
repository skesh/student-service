import { FieldBase } from './field-base.class';

export class HiddenTextField extends FieldBase<string> {
  controlType = 'hiddentextbox';

  constructor(options: {} = {}) {
    super(options);
  }
}
