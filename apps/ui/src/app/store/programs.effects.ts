import { Injectable } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeAll, pluck, switchMap, tap } from 'rxjs/operators';
import { AppState } from '.';
import { AfsService } from '../core/afs.service';
import { Program } from '../shared/interfaces/program.interface';
import {
  ProgramAdded,
  ProgramAddSuccess,
  ProgramDeleted,
  ProgramsActionTypes,
  ProgramsFetchSuccess,
  ProgramUpdated
} from './programs.actions';

@Injectable()
export class ProgramsEffects {
  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(ProgramsActionTypes.FETCH),
    switchMap(() => this.afs.getItems('programs')),
    mergeAll(),
    map((program: Program) => {
      const item = program;
      if (item.events) {
        item.events.map(event => (event.time = (event.time as Timestamp).toDate()));
      }
      return item;
    }),
    tap(program => this.store.dispatch(new ProgramAdded(program))),
    // TODO: отправлять только один диспатч
    map((program: Program) => new ProgramsFetchSuccess())
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(ProgramsActionTypes.ADD),
    pluck('payload'),
    tap((program: Program) => this.afs.addItem('programs', program)),
    map(() => new ProgramAddSuccess())
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(ProgramsActionTypes.UPDATE),
    tap((data: { id: string; changes: Program }) =>
      this.afs.updateItem('programs', data.id, data.changes)
    ),
    map((data: { id: string; changes: Program }) => new ProgramUpdated(data.id, data.changes))
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(ProgramsActionTypes.DELETE),
    pluck('payload'),
    tap((program: Program) => this.afs.deleteItem('programs', program.id)),
    map(program => new ProgramDeleted(program))
  );

  constructor(private actions$: Actions, private afs: AfsService, private store: Store<AppState>) {}
}
