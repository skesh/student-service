import { Component } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AfsService } from '../../core/afs.service';
import { Feedback } from '../../shared/interfaces/feedback.interface';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent {
  displayedColumns = ['created', 'name', 'type', 'contact', 'actions'];
  feedbacks$: Observable<Feedback[]> = this.afs
    .getItems('feedbacks')
    .pipe(
      map(feedbacks =>
        feedbacks.sort(
          (a: Feedback, b: Feedback) =>
            (b.created as Timestamp).seconds - (a.created as Timestamp).seconds
        )
      )
    );

  getDate(date: Timestamp) {
    if (date) return date.toDate();
  }

  constructor(public afs: AfsService) {}
}
