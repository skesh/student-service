import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Program } from '../shared/interfaces/program.interface';
import * as actions from './programs.actions';

export const adapter: EntityAdapter<Program> = createEntityAdapter<Program>();

export interface ProgramsState extends EntityState<Program> {
  selectedProgramId: string;
  viewedProgramsId: string[];
  loading: boolean;
}

export const initialState: ProgramsState = adapter.getInitialState({
  selectedProgramId: null,
  viewedProgramsId: [],
  loading: false
});

export function programsReducer(state = initialState, action): ProgramsState {
  switch (action.type) {
    case actions.ProgramsActionTypes.FETCH:
      return { ...state, loading: true };
    case actions.ProgramsActionTypes.FETCH_SUCCESS:
      return { ...state, loading: false };
    case actions.ProgramsActionTypes.ADDED:
      return adapter.addOne(action.payload, state);
    case actions.ProgramsActionTypes.UPDATED:
      return adapter.updateOne({ id: action.id, changes: action.changes }, state);
    case actions.ProgramsActionTypes.DELETED:
      return adapter.removeOne(action.payload.id, state);
    case actions.ProgramsActionTypes.SELECT:
      return Object.assign({}, state, { selectedProgramId: action.id });
    case actions.ProgramsActionTypes.VIEWED:
      return Object.assign({}, state, {
        viewedProgramsId: state.viewedProgramsId.concat(action.id)
      });
    default:
      return state;
  }
}

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectProgramsIds = selectIds;
export const selectProgramsEntity = selectEntities;
export const selectAllPrograms = selectAll;
