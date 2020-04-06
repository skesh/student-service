import { Component } from '@angular/core';
import { AfsService } from '../../core/afs.service';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { FileField } from '../../dynamic-form/models/field-file.class';
import { TextField } from '../../dynamic-form/models/field-text.class';

@Component({
  selector: 'app-banners-manager',
  templateUrl: './banners-manager.component.html',
  styleUrls: ['./banners-manager.component.scss']
})
export class BannersManagerComponent {
  banners$ = this.afs.getItems('banners');

  newBannerFields: FieldBase<string>[] = [
    new TextField({
      key: 'name',
      label: 'Название',
      required: true
    }),

    new FileField({
      key: 'image',
      label: 'Изображение баннера',
      required: true,
      directory: 'banners',
      hint: '290x540px'
    }),

    new TextField({
      key: 'url',
      label: 'Ссылка',
      hint: 'Куда отправить пользователя при клике',
      required: false
    })
  ];

  constructor(public afs: AfsService) {}
}
