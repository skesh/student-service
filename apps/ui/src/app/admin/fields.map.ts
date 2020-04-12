import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AfsService } from '../core/afs.service';
import { FieldBase } from '../dynamic-form/models/field-base.class';
import { FileField } from '../dynamic-form/models/field-file.class';
import { HiddenTextField } from '../dynamic-form/models/field-hidden-text.class';
import { SelectField } from '../dynamic-form/models/field-select.class';
import { TextField } from '../dynamic-form/models/field-text.class';
import { VisaTypeEnum } from '../shared/enums/visa-type.enum';
import { Visa } from '../shared/interfaces/visa.interface';
import { MaterialType } from './material-types.enum';

const types = [
  { label: 'Обучение', value: 'learning' },
  { label: 'Виза', value: 'visa' },
];

const visaTypes = Object.entries(VisaTypeEnum).map((type) => ({
  label: type[1],
  value: type[0],
}));

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  countries$ = this.afs.getItems('country');
  countries = [];

  MaterialFields = new Map<MaterialType, FieldBase<any>[]>([
    [
      MaterialType.offers,
      [
        new HiddenTextField({
          key: 'id',
        }),

        new TextField({
          key: 'title',
          label: 'Заголовок',
          required: true,
        }),

        new TextField({
          key: 'description',
          label: 'Описание',
          required: true,
        }),

        new SelectField({
          key: 'type',
          label: 'В раздел',
          required: true,
          options: of(types),
          optionLabel: 'label',
          optionValue: 'value',
        }),
      ],
    ],
    [
      MaterialType.visa,
      [
        new HiddenTextField({
          key: 'id',
        }),

        new SelectField({
          key: 'countryId',
          label: 'Страна',
          options: this.countries$,
          optionLabel: 'name',
          optionValue: 'id',
          required: true,
        }),

        new SelectField({
          key: 'type',
          label: 'Тип',
          options: of(visaTypes),
          optionLabel: 'label',
          optionValue: 'value',
          required: true,
        }),

        new TextField({
          key: 'period',
          label: 'Срок пребывания',
          required: true,
        }),

        new TextField({
          key: 'registration',
          label: 'Срок оформления',
          required: true,
        }),

        new TextField({
          key: 'price',
          label: 'Стоимость',
          required: true,
        }),

        new TextField({
          key: 'addons',
          label: 'Комментарии к стоимости',
          required: false,
        }),

        new FileField({
          key: 'pdf',
          label: 'PDF',
          required: false,
          directory: 'visa-pdf',
        }),
      ],
    ],
  ]);

  MaterialColumns = new Map<
    MaterialType,
    { name: string; field: string; data: any; async?: boolean }[]
  >([
    [
      MaterialType.offers,
      [
        { name: 'Заголовок', field: 'title', data: (item: any) => item.title },
        { name: 'Раздел', field: 'type', data: (item: any) => item.type },
      ],
    ],
    [
      MaterialType.visa,
      [
        { name: 'Страна', field: 'countryId', data: (item: any) => this.getCountryName(item) },
        { name: 'Тип', field: 'type', data: (item: any) => item.type },
        { name: 'Срок пребывания', field: 'period', data: (item: any) => item.period },
        { name: 'Срок оформления', field: 'registration', data: (item: any) => item.registration },
        { name: 'Стоимость', field: 'price', data: (item: any) => item.price },
        { name: 'Комментарии к стоимости', field: 'addons', data: (item: any) => item.addons },
      ],
    ],
  ]);

  getCountryName(item: Visa) {
    const country = this.countries.find((c) => c.id === item.countryId);
    return country.name;
  }

  constructor(private afs: AfsService) {
    this.countries$.pipe(tap((countries) => (this.countries = countries))).subscribe();
  }
}
