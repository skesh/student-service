import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { distinct, filter, map, mergeAll, pluck, scan, startWith } from 'rxjs/operators';
import { AdvantageTypes } from '../../shared/enums/advantage-types.enum';
import { MonthsEnum } from '../../shared/enums/months.enum';
import { Program } from '../../shared/interfaces/program.interface';
import { programsLoading, selectPrograms, selectTours } from '../../store';
import { ProgramsState } from '../../store/programs.reducer';

@Component({
  selector: 'app-page-programs',
  templateUrl: './page-programs.component.html',
  styleUrls: ['./page-programs.component.scss'],
})
export class PageProgramsComponent implements OnInit {
  filter: FormGroup;

  programs$ = this.store.pipe(select(selectPrograms));
  tours$ = this.store.pipe(select(selectTours));
  loading$ = this.store.pipe(select(programsLoading));
  filteredPrograms$: Observable<Program[]>;

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

  constructor(
    private store: Store<ProgramsState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.filter = this.fb.group({
      type: [''],
      country: [''],
      age: [''],
      month: [''],
    });
  }

  get types() {
    return Object.keys(this.typesEnum);
  }

  get type(): AbstractControl {
    return this.filter.get('type');
  }

  ngOnInit() {
    const t = this.route.snapshot.params['filter'];
    this.type.setValue(t);

    this.filteredPrograms$ = combineLatest(
      this.filter.valueChanges.pipe(startWith(this.filter.value)),
      this.programs$,
      this.tours$
    ).pipe(
      map(([params, programs, tours]) => {
        let items = programs;
        if (params) {
          const { type, country, age, month } = params;

          if (type) {
            items = items.filter((i) => i.type === type);
          }

          if (country && country !== 'Любая страна') {
            items = items.filter((i) => i.country === country);
          }

          if (age && age !== 'Любой возраст') {
            items = items.filter((i) => i.ageFrom <= +age && age <= i.ageTo);
          }

          if (month && month !== 'Любой месяц') {
            const filteredTours = tours.filter(
              (tour) => MonthsEnum[(tour.dateStart as Date).getMonth()] === month
            );
            items = items.filter((i) => filteredTours.some((a) => a.programId === i.id));
          }
        }
        return items;
      })
    );
  }

  setFilterType(type: string) {
    this.type.setValue(this.type.value === type ? null : type);
  }
}
