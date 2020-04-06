export class FieldBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type?: string;
  directory?: string;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  hint?: string;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      directory?: string;
      options?: any[];
      optionLabel?: string;
      optionValue?: string;
      hint?: string;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.directory = options.directory || '/';
    this.options = options.options || [];
    this.optionLabel = options.optionLabel || '';
    this.optionValue = options.optionValue || '';
    this.hint = options.hint || '';
  }
}
