import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Timestamp } from '@firebase/firestore-types';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeAll, pluck, switchMap, tap } from 'rxjs/operators';
import { AfsService } from '../core/afs.service';
import { Tour } from '../shared/interfaces/tour.interface';
import { TourAdded, TourDeleted, ToursActionTypes, ToursFetchSuccess } from './tours.actions';

@Injectable()
export class ToursEffects {
  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(ToursActionTypes.FETCH),
    switchMap(() => this.data.getItems('tours')),
    mergeAll(),
    map((tour: Tour) => {
      const item = tour;
      item.dateStart = (tour.dateStart as Timestamp).toDate();
      item.dateEnd = (tour.dateEnd as Timestamp).toDate();
      return item;
    }),
    map(tour => new ToursFetchSuccess(tour))
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(ToursActionTypes.ADD),
    pluck('payload'),
    switchMap((tour: Tour) => of(this.afs.collection('tours').add(tour))),
    // AngularFirestore трегерить добавление элемента в подписке FETCH
    map(() => new TourAdded())
  );

  @Effect()
  // TODO: почему при добавлении angularfirestore сам тригерит эвент на добавление а при удалении
  // этого не далает?
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(ToursActionTypes.DELETE),
    pluck('payload'),
    tap((data: Tour) => this.data.deleteItem('tours', data.id)),
    map(tour => new TourDeleted(tour))
  );

  constructor(private actions$: Actions, private afs: AngularFirestore, private data: AfsService) {}
}
