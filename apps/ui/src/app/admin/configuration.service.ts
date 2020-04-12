import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AfsService } from '../core/afs.service';
import { FieldBase } from '../dynamic-form/models/field-base.class';
import { BooleanField } from '../dynamic-form/models/field-boolean.class';
import { DateField } from '../dynamic-form/models/field-date.class';
import { FileField } from '../dynamic-form/models/field-file.class';
import { HiddenTextField } from '../dynamic-form/models/field-hidden-text.class';
import { HtmlEditorField } from '../dynamic-form/models/field-html-editor.class';
import { NumberField } from '../dynamic-form/models/field-number.class';
import { SelectField } from '../dynamic-form/models/field-select.class';
import { TextField } from '../dynamic-form/models/field-text.class';
import { ArticleTypes } from '../shared/enums/article-types.enum';
import { VisaTypeEnum } from '../shared/enums/visa-type.enum';
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
export class ConfigurationService {
  countries$ = this.afs.getItems('country').pipe(tap((countries) => (this.countries = countries)));
  countries = [];

  programs$ = this.afs.getItems('programs').pipe(tap((programs) => (this.programs = programs)));
  programs = [];

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
    [
      MaterialType.tours,
      [
        new HiddenTextField({
          key: 'id',
        }),

        new SelectField({
          key: 'programId',
          label: 'Программа',
          required: true,
          options: this.programs$,
          optionLabel: 'title',
          optionValue: 'id',
        }),

        new DateField({
          key: 'dateStart',
          label: 'Дата начала смены',
          required: true,
        }),

        new DateField({
          key: 'dateEnd',
          label: 'Дата завершения смены',
          required: true,
        }),

        new NumberField({
          key: 'seats',
          label: 'Мест',
          required: true,
        }),

        new NumberField({
          key: 'seatsOccupied',
          label: 'Мест занято',
          required: true,
        }),

        new NumberField({
          key: 'price',
          label: 'Стоимость',
          required: true,
        }),
      ],
    ],
    [
      MaterialType.articles,
      [
        new HiddenTextField({
          key: 'id',
        }),

        new TextField({
          key: 'name',
          label: 'Название статьи',
          required: true,
        }),

        new SelectField({
          key: 'type',
          label: 'Тип',
          required: false,
          options: of(
            Object.entries(ArticleTypes).map((type) => ({
              label: type[1],
              value: type[0],
            }))
          ),
          optionLabel: 'label',
          optionValue: 'value',
        }),

        new FileField({
          key: 'image',
          label: 'Изображение',
          required: true,
          directory: 'articles-images',
          hint: '850x600px',
        }),

        new HtmlEditorField({
          key: 'text',
          label: 'Текст статьи',
          required: true,
        }),
      ],
    ],
    [
      MaterialType.country,
      [
        new HiddenTextField({
          key: 'id',
        }),

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
      ],
    ],
    [
      MaterialType.reviews,
      [
        new SelectField({
          key: 'programId',
          label: 'Программа',
          required: true,
          options: this.programs$,
          optionLabel: 'title',
          optionValue: 'id',
        }),

        new TextField({
          key: 'firstname',
          label: 'Имя участника',
          required: true,
        }),

        new TextField({
          key: 'lastname',
          label: 'Фамилия участника',
          required: false,
        }),

        new TextField({
          key: 'text',
          label: 'Текст отзыва',
          required: true,
        }),

        new FileField({
          key: 'photo',
          label: 'Фото участника',
          directory: 'user-photos',
          hint: '80x80px',
        }),
      ],
    ],
    [
      MaterialType.questions,
      [
        new TextField({
          key: 'question',
          label: 'Вопрос',
          required: true,
        }),

        new TextField({
          key: 'answer',
          label: 'Ответ',
          required: true,
        }),
      ],
    ],
    [
      MaterialType.profession,
      [
        new TextField({
          key: 'name',
          label: 'Название профессии',
          required: true,
        }),

        new FileField({
          key: 'image',
          label: 'Изображение профессии',
          required: true,
          directory: 'profession',
          hint: '90x90px',
        }),

        new BooleanField({
          key: 'show',
          label: 'Показывать на странице стажировок',
          required: false,
        }),
      ],
    ],
    [MaterialType.feedbacks, []],
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
        {
          name: 'Страна',
          field: 'countryId',
          data: (item: any) => this.getCountryName(item.countryId),
        },
        { name: 'Тип', field: 'type', data: (item: any) => item.type },
        { name: 'Срок пребывания', field: 'period', data: (item: any) => item.period },
        { name: 'Срок оформления', field: 'registration', data: (item: any) => item.registration },
        { name: 'Стоимость', field: 'price', data: (item: any) => item.price },
        { name: 'Комментарии к стоимости', field: 'addons', data: (item: any) => item.addons },
      ],
    ],
    [
      MaterialType.tours,
      [
        {
          name: 'Программа',
          field: 'programId',
          data: (item: any) => this.getProgramName(item.programId),
        },
        {
          name: 'Начало смены',
          field: 'dateStart',
          data: (item: any) => this.toDate(item.dateStart),
        },
        { name: 'Конец смены', field: 'dateEnd', data: (item: any) => this.toDate(item.dateStart) },
        { name: 'Мест', field: 'seats', data: (item: any) => item.seats },
        {
          name: 'Забронировано',
          field: 'seatsOccupied',
          data: (item: any) => item.seatsOccupied,
        },
        { name: 'Стоимость', field: 'price', data: (item: any) => item.price },
      ],
    ],
    [
      MaterialType.articles,
      [
        { name: 'Название', field: 'name', data: (item: any) => item.name },
        { name: 'Тип', field: 'type', data: (item: any) => ArticleTypes[item?.type] },
      ],
    ],
    [MaterialType.country, [{ name: 'Название', field: 'name', data: (item: any) => item.name }]],
    [
      MaterialType.reviews,
      [
        {
          name: 'Программа',
          field: 'programId',
          data: (item: any) => this.getProgramName(item.programId),
        },
        {
          name: 'Имя',
          field: 'firstname',
          data: (item: any) => item.firstname,
        },
        {
          name: 'Фамилия',
          field: 'lastname',
          data: (item: any) => item.lastname,
        },
      ],
    ],
    [
      MaterialType.questions,
      [
        {
          name: 'Вопрос',
          field: 'question',
          data: (item: any) => item.question,
        },
      ],
    ],
    [
      MaterialType.profession,
      [
        {
          name: 'Название профессии',
          field: 'name',
          data: (item: any) => item.name,
        },
        {
          name: 'Показывать на странице стажировок',
          field: 'show',
          data: (item: any) => item.show,
        },
      ],
    ],
    [
      MaterialType.feedbacks,
      [
        {
          name: 'Создано',
          field: 'created',
          data: (item: any) => this.toDate(item?.created),
        },
        {
          name: 'Имя',
          field: 'name',
          data: (item: any) => item.name,
        },
        {
          name: 'Канал связи',
          field: 'type',
          data: (item: any) => item.type,
        },
        {
          name: 'Контакт',
          field: 'contact',
          data: (item: any) => item.contact,
        },
      ],
    ],
  ]);

  getCountryName(id: string) {
    const country = this.countries.find((c) => c.id === id);
    return country?.name ?? id;
  }

  getProgramName(id: string) {
    const program = this.programs.find((c) => c.id === id);
    return program?.title ?? id;
  }

  toDate(time: Timestamp) {
    return this.datePipe.transform(time?.toDate()) ?? time;
  }

  constructor(private afs: AfsService, private datePipe: DatePipe) {
    this.countries$.subscribe();
    this.programs$.subscribe();
  }
}
