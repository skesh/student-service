import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from '../field-control.service';
import { FieldBase } from '../models/field-base.class';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldBase<any>[] = [];
  @Output() save = new EventEmitter();

  public form: FormGroup;

  constructor(private fcs: FieldControlService) {}

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.fields);
  }

  onSubmit() {
    this.save.emit(this.form.value);
    this.form.reset();
  }
}
