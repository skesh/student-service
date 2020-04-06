import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinct, filter, map, mergeAll, pluck, scan } from 'rxjs/operators';
import { AdvantageTypes } from '../../shared/enums/advantage-types.enum';
import { MonthsEnum } from '../../shared/enums/months.enum';
import { Program } from '../../shared/interfaces/program.interface';
import { Tour } from '../../shared/interfaces/tour.interface';
import { programsLoading, selectPrograms, selectTours } from '../../store';
import { ProgramsState } from '../../store/programs.reducer';

@Component({
  selector: 'app-page-programs',
  templateUrl: './page-programs.component.html',
  styleUrls: ['./page-programs.component.scss'],
})
export class PageProgramsComponent implements OnInit {
  programs$ = this.store.pipe(select(selectPrograms));
  tours$ = this.store.pipe(select(selectTours));
  loading$ = this.store.pipe(select(programsLoading));

  state = {
    type: null,
    country: null,
    age: null,
    month: null,
  };

  countries$ = this.programs$.pipe(
    mergeAll(),
    filter((program) => !!program.country),
    pluck('country'),
    distinct(),
    scan((acc, cur) => acc.concat(cur), ['Любая страна'])
  );

  ages$ = this.programs$.pipe(
    mergeAll(),
    filter((program) => !!program.ageFrom),
    pluck('ageFrom'),
    distinct(),
    scan((acc, cur) => acc.concat(cur.toString()).sort((a, b) => +a - +b), ['Любой возраст'])
  );

  months$ = this.tours$.pipe(
    mergeAll(),
    filter((tour) => !!tour.dateStart),
    pluck('dateStart'),
    map((date: Date) => date.getMonth()),
    distinct(),
    scan((acc, cur) => acc.concat(MonthsEnum[cur]), ['Любой месяц'])
  );

  typesEnum = AdvantageTypes;

  get types() {
    return Object.keys(this.typesEnum);
  }

  constructor(private store: Store<ProgramsState>, private route: ActivatedRoute) {}

  filter(
    programs: Program[],
    tours: Tour[],
    type = this.state.type,
    country = this.state.country,
    age = this.state.age,
    month = this.state.month
  ) {
    let items = programs;
    if (type) items = items.filter((i) => i.type === type);
    if (country && country !== 'Все страны') items = items.filter((i) => i.country === country);
    if (age && age !== 'Любой возраст') items = items.filter((i) => i.ageFrom >= +age);
    if (month && month !== 'Любой месяц') {
      const filteredTours = tours.filter(
        (tour) => MonthsEnum[(tour.dateStart as Date).getMonth()] === month
      );
      items = items.filter((i) => filteredTours.some((t) => t.programId === i.id));
    }
    return items;
  }

  ngOnInit() {
    if (this.route.snapshot.params['filter']) {
      this.setFilter(this.route.snapshot.params['filter']);
    }
  }

  setFilter(type) {
    this.state.type = this.state.type === type ? null : type;
  }
}
