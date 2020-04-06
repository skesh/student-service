import { Action } from '@ngrx/store';
import { Program } from '../shared/interfaces/program.interface';

export enum ProgramsActionTypes {
  FETCH = '[Programs] fetch',
  FETCH_SUCCESS = '[Programs] fetch success',
  ADD = '[Programs] add',
  ADD_SUCCESS = '[Programs] add success',
  ADDED = '[Programs] added',
  UPDATE = '[Programs] update',
  UPDATED = '[Programs] updated',
  DELETE = '[Programs] delete',
  DELETED = '[Programs] deleted',
  SELECT = '[Programs] select',
  VIEWED = '[Programs] viewed'
}

export class ProgramsQuery implements Action {
  readonly type = ProgramsActionTypes.FETCH;
}

export class ProgramsFetchSuccess implements Action {
  readonly type = ProgramsActionTypes.FETCH_SUCCESS;
}

export class ProgramAdd implements Action {
  readonly type = ProgramsActionTypes.ADD;
  constructor(public payload: Program) {}
}

export class ProgramAddSuccess implements Action {
  readonly type = ProgramsActionTypes.ADD_SUCCESS;
}

export class ProgramAdded implements Action {
  readonly type = ProgramsActionTypes.ADDED;
  constructor(public payload: Program) {}
}

export class ProgramUpdate implements Action {
  readonly type = ProgramsActionTypes.UPDATE;
  constructor(public id: string, public changes: Program) {}
}

export class ProgramUpdated implements Action {
  readonly type = ProgramsActionTypes.UPDATED;
  constructor(public id: string, public changes: Program) {}
}

export class ProgramDelete implements Action {
  readonly type = ProgramsActionTypes.DELETE;
  constructor(public payload: Program) {}
}

export class ProgramDeleted implements Action {
  readonly type = ProgramsActionTypes.DELETED;
  constructor(public payload: Program) {}
}

export class ProgramSelect implements Action {
  readonly type = ProgramsActionTypes.SELECT;
  constructor(public id: string) {}
}

export class ProgramViewed implements Action {
  readonly type = ProgramsActionTypes.VIEWED;
  constructor(public id: string) {}
}

export type ProgramsActions = ProgramsQuery | ProgramAdded | ProgramSelect | ProgramViewed;
