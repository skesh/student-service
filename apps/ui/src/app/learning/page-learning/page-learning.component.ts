import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AfsService } from '../../core/afs.service';
import { Offer } from '../../shared/interfaces/offer.interface';
import { Program } from '../../shared/interfaces/program.interface';
import { Review } from '../../shared/interfaces/review.interface';
import {
  AppState,
  selectLearningPrograms,
  selectLearningReviews,
  selectUpcomingLearningPrograms,
} from '../../store';

@Component({
  selector: 'app-page-learning',
  templateUrl: './page-learning.component.html',
  styleUrls: ['./page-learning.component.scss'],
})
export class PageLearningComponent {
  tabs = {
    options: ['Обучение', 'Программы'],
    active: 'Обучение',
  };

  offers$ = this.afs
    .getItems('offers')
    .pipe(map((offers: Offer[]) => offers.filter(o => o.type === 'learning')));

  questions$ = this.afs.getItems('questions');
  reviews$ = <Observable<Review[]>>this.store.pipe(select(selectLearningReviews));
  programs$ = <Observable<Program[]>>this.store.pipe(select(selectLearningPrograms));
  upcommingPrograms$ = <Observable<Program[]>>(
    this.store.pipe(select(selectUpcomingLearningPrograms))
  );

  constructor(private store: Store<AppState>, private afs: AfsService) {}
}
