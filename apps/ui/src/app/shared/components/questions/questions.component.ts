import { Component, Input } from '@angular/core';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  @Input() questions: Question[] = [];
}
