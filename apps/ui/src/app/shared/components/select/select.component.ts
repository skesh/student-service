import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input('value') val: string;
  @Input() options: string[];
  @Input() placeholder: string;
  open = false;

  get value() {
    return this.val;
  }

  set value(val: string) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  onChange: any = () => {};

  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) this.value = value;
  }

  ngOnInit() {
    if (!this.val) this.val = this.options[0];
  }

  menuToggle = () => (this.open = !this.open);
}
