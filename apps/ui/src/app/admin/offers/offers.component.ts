import { Component } from '@angular/core';
import { AfsService } from '../../core/afs.service';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { SelectField } from '../../dynamic-form/models/field-select.class';
import { TextField } from '../../dynamic-form/models/field-text.class';
import { OfferTypesEnum } from '../../shared/enums/offer-types.enum';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  displayedColumns = ['name', 'type', 'actions'];
  typesEnum = OfferTypesEnum;
  types = [{ label: 'Обучение', value: 'learning' }, { label: 'Виза', value: 'visa' }];
  offers$ = this.afs.getItems('offers');

  newOfferFields: FieldBase<string>[] = [
    new TextField({
      key: 'title',
      label: 'Заголовок',
      required: true
    }),

    new TextField({
      key: 'description',
      label: 'Описание',
      required: true
    }),

    new SelectField({
      key: 'type',
      label: 'В раздел',
      required: true,
      options: this.types,
      optionLabel: 'label',
      optionValue: 'value'
    })
  ];

  constructor(public afs: AfsService) {}
}
