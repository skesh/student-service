import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AfsService } from '../../core/afs.service';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { FileField } from '../../dynamic-form/models/field-file.class';
import { NumberField } from '../../dynamic-form/models/field-number.class';
import { TextField } from '../../dynamic-form/models/field-text.class';
import { TimeField } from '../../dynamic-form/models/field-time.class';
import { BaseFile } from '../../shared/components/file-uploader/file-uploader.component';
import { AdvantageTypes } from '../../shared/enums/advantage-types.enum';
import { Program } from '../../shared/interfaces/program.interface';
import { AppState } from '../../store';
import { ProgramAdd, ProgramDelete, ProgramUpdate } from '../../store/programs.actions';

@Component({
  selector: 'app-programs-manager',
  templateUrl: './programs-manager.component.html',
  styleUrls: ['./programs-manager.component.scss'],
})
export class ProgramsManagerComponent {
  displayedColumns = ['name', 'type', 'actions'];
  typesEnum = AdvantageTypes;
  form: FormGroup;

  programs$ = this.afs.getItems('programs');
  countries$ = this.afs.getItems('country');

  constructor(private fb: FormBuilder, private store: Store<AppState>, private afs: AfsService) {
    this.form = fb.group({
      id: null,
      title: null,
      description: null,
      days: null,
      ageFrom: [null, Validators.required],
      ageTo: [null, Validators.required],
      smallImage: [null, Validators.required],
      bigImage: [null],
      country: null,
      type: [null, Validators.required],
      isHot: false,
      includes: [[]], // Включено в проживание
      events: [[]], // Расписание
      questions: [[]], // Вопросы
      photos: [[]], // Фотоотчеты
      residence: [[]], // Условия проживания
      forPerson: [[]], // Подходит для
      excursions: [[]], // Экскурсии
    });
  }

  get types() {
    return Object.keys(AdvantageTypes);
  }

  newEventFields: FieldBase<any>[] = [
    new TimeField({
      key: 'time',
      label: 'Время проведения',
      required: true,
    }),

    new TextField({
      key: 'description',
      label: 'Описание мероприятия',
      required: true,
    }),
  ];

  newIncludeFields: FieldBase<any>[] = [
    new TextField({
      key: 'name',
      label: 'Описание включения',
      required: true,
    }),
  ];

  newResidenceFields: FieldBase<any>[] = [
    new TextField({
      key: 'description',
      label: 'Описание',
      required: true,
    }),

    new FileField({
      key: 'image',
      label: 'Изображение условий',
      required: true,
      directory: 'residence-photos',
      hint: '800x400px',
    }),
  ];

  newQuestionFields: FieldBase<any>[] = [
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
  ];

  newPhotosFields: FieldBase<any>[] = [
    new FileField({
      key: 'url',
      required: true,
      directory: 'program-photos',
    }),
  ];

  newExcursionFields: FieldBase<any>[] = [
    new NumberField({
      key: 'week',
      label: 'Номер недели',
      required: true,
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
  ];

  get events(): { time: Date; description: string }[] {
    const events = this.form.get('events').value;
    return events ? events.sort((a, b) => a.time - b.time) : events;
  }

  get includes(): { name: string }[] {
    return this.form.get('includes').value;
  }

  get questions(): { question: string; answer: string }[] {
    return this.form.get('questions').value;
  }

  get photos(): string[] {
    return this.form.get('photos').value;
  }

  get residence(): { image: BaseFile; description: string }[] {
    return this.form.get('residence').value;
  }

  get excursions(): any[] {
    return this.form.get('excursions').value;
  }

  addInArray(arrayName: string, item: any) {
    const items = this.form.get(arrayName).value || [];
    this.form.get(arrayName).setValue(items.concat(item));
  }

  removeFromArray(arrayName: string, item: any) {
    const field = this.form.get(arrayName);
    field.setValue(field.value.filter((el) => el !== item));
  }

  edit(program) {
    this.form.patchValue(program);
  }

  delete(program: Program) {
    this.store.dispatch(new ProgramDelete(program));
  }

  save() {
    const program = this.form.value;
    const id = program.id;
    delete program.id;

    // TODO: оптимизировать?
    if (id) {
      program.updated = new Date();
      this.store.dispatch(new ProgramUpdate(id, program));
    } else {
      program.created = new Date();
      this.store.dispatch(new ProgramAdd(program));
    }

    this.form.reset();
  }
}
