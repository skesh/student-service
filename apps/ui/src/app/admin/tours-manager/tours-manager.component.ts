import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { DateField } from '../../dynamic-form/models/field-date.class';
import { NumberField } from '../../dynamic-form/models/field-number.class';
import { SelectField } from '../../dynamic-form/models/field-select.class';
import { Program } from '../../shared/interfaces/program.interface';
import { Tour } from '../../shared/interfaces/tour.interface';
import { AppState, selectAnyTours, selectPrograms } from '../../store';
import { TourAdd, TourDelete } from '../../store/tours.actions';

@Component({
  selector: 'app-tours-manager',
  templateUrl: './tours-manager.component.html',
  styleUrls: ['./tours-manager.component.scss']
})
export class ToursManagerComponent implements OnInit, OnDestroy {
  tours$: Observable<Tour[]> = this.store.pipe(select(selectAnyTours));
  programs$: Observable<Program[]> = this.store.pipe(select(selectPrograms));
  displayedColumns = [
    'programId',
    'dateStart',
    'dateEnd',
    'seats',
    'seatsOccupied',
    'price',
    'actions'
  ];

  newTourFields: FieldBase<any>[] = [];

  destroy$ = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.programs$
      .pipe(
        takeUntil(this.destroy$),
        tap(
          programs =>
            (this.newTourFields = [
              new SelectField({
                key: 'programId',
                label: 'Программа',
                required: true,
                options: programs,
                optionLabel: 'title',
                optionValue: 'id'
              }),

              new DateField({
                key: 'dateStart',
                label: 'Дата начала смены',
                required: true
              }),

              new DateField({
                key: 'dateEnd',
                label: 'Дата завершения смены',
                required: true
              }),

              new NumberField({
                key: 'seats',
                label: 'Мест',
                required: true
              }),

              new NumberField({
                key: 'seatsOccupied',
                label: 'Мест занято',
                required: true
              }),

              new NumberField({
                key: 'price',
                label: 'Стоимость',
                required: true
              })
            ])
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  add = (tour: Tour) => this.store.dispatch(new TourAdd(tour));

  delete = (tour: Tour) => this.store.dispatch(new TourDelete(tour));

  getProgramById = (programs: Program[], id: string) => programs.find(program => program.id === id);
}
