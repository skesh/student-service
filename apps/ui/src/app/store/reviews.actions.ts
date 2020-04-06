import { Action } from '@ngrx/store';
import { Review } from '../shared/interfaces/review.interface';

export enum ReviewsActionTypes {
  QUERY = '[Reviews] query reviews',
  ADDED = '[Reviews] added',
  DELETE = '[Reviews] delete',
  DELETED = '[Reviews] deleted',
}

export class ReviewsQuery implements Action {
  readonly type = ReviewsActionTypes.QUERY;
}

export class ReviewAdded implements Action {
  readonly type = ReviewsActionTypes.ADDED;
  constructor(public payload: Review) {}
}

export class ReviewDelete implements Action {
  readonly type = ReviewsActionTypes.DELETE;
  constructor(public payload: Review) {}
}

export class ReviewDeleted implements Action {
  readonly type = ReviewsActionTypes.DELETED;
  constructor(public payload: Review) {}
}

export type ReviewsActions = ReviewsQuery | ReviewAdded | ReviewDelete | ReviewDeleted;
