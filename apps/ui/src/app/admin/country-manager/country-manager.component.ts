import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AfsService } from '../../core/afs.service';
import { FileField } from '../../dynamic-form/models/field-file.class';
import { TextField } from '../../dynamic-form/models/field-text.class';
import { FieldBase } from './../../dynamic-form/models/field-base.class';
import { Country } from './../../shared/interfaces/country.interface';

@Component({
  selector: 'app-country-manager',
  templateUrl: './country-manager.component.html',
  styleUrls: ['./country-manager.component.scss'],
})
export class CountryManagerComponent {
  country$: Observable<Country[]> = this.afs.getItems('country');

  newCountryFields: FieldBase<string>[] = [
    new TextField({
      key: 'name',
      label: 'Название страны',
      required: true,
    }),

    new FileField({
      key: 'flag',
      label: 'Флаг страны',
      required: true,
      directory: 'flags',
      hint: '32x32px',
    }),
  ];

  constructor(public afs: AfsService) {}
}
