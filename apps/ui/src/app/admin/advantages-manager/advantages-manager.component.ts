import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfsService } from '../../core/afs.service';
import { AdvantageTypes } from '../../shared/enums/advantage-types.enum';

@Component({
  selector: 'app-advantages-manager',
  templateUrl: './advantages-manager.component.html',
  styleUrls: ['./advantages-manager.component.scss']
})
export class AdvantagesManagerComponent implements OnInit {
  advantages$ = this.afs.getItems('advantages');

  displayedColumns = ['name', 'type', 'description'];
  advantageTypesEnum = AdvantageTypes;

  form: FormGroup;

  constructor(private fb: FormBuilder, private afs: AfsService) {
    this.form = fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  get advantageTypes() {
    return Object.keys(this.advantageTypesEnum);
  }

  ngOnInit() {}

  resetForm = () => this.form.reset();

  add() {
    this.afs.addItem('advantages', this.form.value);
    this.resetForm();
  }

  remove(id: string) {
    this.afs.deleteItem('advantages', id);
  }
}
