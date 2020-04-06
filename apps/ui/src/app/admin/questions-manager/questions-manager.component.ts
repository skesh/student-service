import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AfsService } from '../../core/afs.service';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { TextField } from '../../dynamic-form/models/field-text.class';
import { Question } from '../../shared/interfaces/question.interface';

@Component({
  selector: 'app-questions-manager',
  templateUrl: './questions-manager.component.html',
  styleUrls: ['./questions-manager.component.scss']
})
export class QuestionsManagerComponent {
  questions$: Observable<Question[]> = this.afs.getItems('questions');
  displayedColumns = ['question', 'actions'];

  newQuestionFields: FieldBase<any>[] = [
    new TextField({
      key: 'question',
      label: 'Вопрос',
      required: true
    }),

    new TextField({
      key: 'answer',
      label: 'Ответ',
      required: true
    })
  ];

  constructor(public afs: AfsService) {}
}
