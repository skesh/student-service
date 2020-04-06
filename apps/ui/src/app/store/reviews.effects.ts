import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeAll, switchMap, tap } from 'rxjs/operators';
import { AfsService } from '../core/afs.service';
import { Review } from '../shared/interfaces/review.interface';
import { ReviewAdded, ReviewDelete, ReviewDeleted, ReviewsActionTypes } from './reviews.actions';

@Injectable()
export class ReviewsEffects {
  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(ReviewsActionTypes.QUERY),
    switchMap(() => this.afs.getItems('reviews')),
    mergeAll(),
    map((review: Review) => new ReviewAdded(review)),
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(ReviewsActionTypes.DELETE),
    tap((action: ReviewDelete) => this.afs.deleteItem('reviews', action.payload.id)),
    map(action => new ReviewDeleted(action.payload)),
  );

  constructor(private actions$: Actions, private afs: AfsService) {}
}
