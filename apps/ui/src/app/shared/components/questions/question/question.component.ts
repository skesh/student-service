import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { fadeAnimationIn } from '../../../animations/fadeIn.animation';
import { Question } from '../../../interfaces/question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [fadeAnimationIn]
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @HostBinding('class') class = 'shadow';
  open = false;

  constructor() {}

  toggleOpen = () => (this.open = !this.open);

  ngOnInit() {}
}
