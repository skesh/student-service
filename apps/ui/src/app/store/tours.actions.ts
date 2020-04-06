import { Action } from '@ngrx/store';
import { Tour } from '../shared/interfaces/tour.interface';

export enum ToursActionTypes {
  FETCH = '[Tours] fetch',
  FETCH_SUCCESS = '[Tours] fetch success',
  ADD = '[Tours] add',
  ADDED = '[Tours] added',
  DELETE = '[Tours] delete',
  DELETED = '[Tours] deleted'
}

export class ToursQuery implements Action {
  readonly type = ToursActionTypes.FETCH;
}

export class ToursFetchSuccess implements Action {
  readonly type = ToursActionTypes.FETCH_SUCCESS;
  constructor(public payload: Tour) {}
}

export class TourAdd implements Action {
  readonly type = ToursActionTypes.ADD;
  constructor(public payload: Tour) {}
}

export class TourAdded implements Action {
  readonly type = ToursActionTypes.ADDED;
  constructor() {}
}

export class TourDelete implements Action {
  readonly type = ToursActionTypes.DELETE;
  constructor(public payload: Tour) {}
}

export class TourDeleted implements Action {
  readonly type = ToursActionTypes.DELETED;
  constructor(public payload: Tour) {}
}

export type ToursActions =
  | ToursQuery
  | TourAdd
  | TourAdded
  | TourDelete
  | TourDeleted
  | ToursFetchSuccess;
