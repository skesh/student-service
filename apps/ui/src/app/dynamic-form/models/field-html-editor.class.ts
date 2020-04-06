import { FieldBase } from './field-base.class';

export class HtmlEditorField extends FieldBase<string> {
  controlType = 'htmleditorfield';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
