import { Component, OnInit } from '@angular/core';
import { AfsService } from '../../core/afs.service';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { BooleanField } from '../../dynamic-form/models/field-boolean.class';
import { FileField } from '../../dynamic-form/models/field-file.class';
import { TextField } from '../../dynamic-form/models/field-text.class';

@Component({
  selector: 'app-profession-manager',
  templateUrl: './profession-manager.component.html',
  styleUrls: ['./profession-manager.component.scss']
})
export class ProfessionManagerComponent implements OnInit {
  profession$ = this.afs.getItems('profession');

  newProfessionFields: FieldBase<any>[] = [
    new TextField({
      key: 'name',
      label: 'Название профессии',
      required: true
    }),

    new FileField({
      key: 'image',
      label: 'Изображение профессии',
      required: true,
      directory: 'profession',
      hint: '90x90px'
    }),

    new BooleanField({
      key: 'show',
      label: 'Показывать на странице стажировок',
      required: false
    })
  ];

  constructor(private afs: AfsService) {}

  ngOnInit() {}

  save(item: any) {
    this.afs.addItem('profession', item);
  }

  delete(id: string) {
    this.afs.deleteItem('profession', id);
  }
}
