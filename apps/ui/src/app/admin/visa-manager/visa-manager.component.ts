import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AfsService } from '../../core/afs.service';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { FileField } from '../../dynamic-form/models/field-file.class';
import { SelectField } from '../../dynamic-form/models/field-select.class';
import { TextField } from '../../dynamic-form/models/field-text.class';
import { VisaTypeEnum } from '../../shared/enums/visa-type.enum';
import { Country } from '../../shared/interfaces/country.interface';
import { AppState } from '../../store';

@Component({
  selector: 'app-visa-manager',
  templateUrl: './visa-manager.component.html',
  styleUrls: ['./visa-manager.component.scss'],
})
export class VisaManagerComponent implements OnInit, OnDestroy {
  displayedColumns = ['country', 'type', 'period', 'registration', 'price', 'addons', 'actions'];
  priceFields: FieldBase<string>[] = [];
  visas$ = this.afs.getItems('visa');
  destroy$ = new Subject();
  visaTypeEnum = VisaTypeEnum;
  countries$ = this.afs.getItems('country');

  visaTypes = Object.entries(VisaTypeEnum).map((type) => ({
    label: type[1],
    value: type[0],
  }));

  constructor(private afs: AfsService, private store: Store<AppState>) {
    this.afs
      .getItems('country')
      .pipe(
        takeUntil(this.destroy$),
        tap((countries: Country[]) => {
          this.priceFields = [
            new SelectField({
              key: 'countryId',
              label: 'Страна',
              options: countries,
              optionLabel: 'name',
              optionValue: 'id',
              required: true,
            }),

            new SelectField({
              key: 'type',
              label: 'Тип',
              options: this.visaTypes,
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
          ];
        })
      )
      .subscribe();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getCountryName(countryId: string, countries: Country[]) {
    return countries.find((country) => country.id === countryId);
  }

  add = (visa) => this.afs.addItem('visa', visa);

  delete = (id) => this.afs.deleteItem('visa', id);
}
