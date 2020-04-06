import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { INTERSHIPTEXT } from '../../constants';
import { AfsService } from '../../core/afs.service';
import { Profession } from '../../shared/interfaces/profession.interface';
import {
  AppState,
  selectInternshipPrograms,
  selectInternshipReviews,
  selectUpcomingInternshipPrograms,
} from '../../store';

@Component({
  selector: 'app-page-internship',
  templateUrl: './page-internship.component.html',
  styleUrls: ['./page-internship.component.scss'],
})
export class PageInternshipComponent {
  tabs = {
    options: ['Стажировка', 'Программы'],
    active: 'Стажировка',
  };
  text = INTERSHIPTEXT;
  programs$ = this.store.pipe(select(selectInternshipPrograms));
  upcommingPrograms$ = this.store.pipe(select(selectUpcomingInternshipPrograms));
  questions$ = this.afs.getItems('questions');
  reviews$ = this.store.pipe(select(selectInternshipReviews));
  profession$: Observable<Profession[]> = this.afs
    .getItems('profession')
    .pipe(map((professions: Profession[]) => professions.filter(p => p.show)));

  constructor(private store: Store<AppState>, private afs: AfsService) {}
}
