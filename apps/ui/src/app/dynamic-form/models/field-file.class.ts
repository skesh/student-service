import { FieldBase } from './field-base.class';

export class FileField extends FieldBase<string> {
  controlType = 'filefield';
  type: string;
  directory: '/';

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
