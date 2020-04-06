import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VACATIONSTEXT } from '../../constants';
import { AfsService } from '../../core/afs.service';
import { Program } from '../../shared/interfaces/program.interface';
import { Review } from '../../shared/interfaces/review.interface';
import {
  AppState,
  selectUpcomingVacationsPrograms,
  selectVacationsPrograms,
  selectVacationsReviews,
} from '../../store';

@Component({
  selector: 'app-page-vacations',
  templateUrl: './page-vacations.component.html',
  styleUrls: ['./page-vacations.component.scss'],
})
export class PageVacationsComponent {
  tabs = {
    options: ['Каникулы', 'Программы'],
    active: 'Каникулы',
  };
  programs$ = <Observable<Program[]>>this.store.pipe(select(selectVacationsPrograms));
  upcommingPrograms$ = <Observable<Program[]>>(
    this.store.pipe(select(selectUpcomingVacationsPrograms))
  );
  reviews$ = <Observable<Review[]>>this.store.pipe(select(selectVacationsReviews));
  questions$ = this.afs.getItems('questions');
  quote = VACATIONSTEXT;

  constructor(private store: Store<AppState>, private afs: AfsService) {}
}
