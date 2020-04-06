import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Tour } from '../shared/interfaces/tour.interface';
import { ToursActions, ToursActionTypes } from './tours.actions';

export interface ToursState extends EntityState<Tour> {}

export const toursAdapter: EntityAdapter<Tour> = createEntityAdapter<Tour>({
  sortComparer: (a: Tour, b: Tour) => (a.dateStart < b.dateStart ? -1 : 1)
});

export const initialState: ToursState = toursAdapter.getInitialState([]);

export function toursReducer(state = initialState, action: ToursActions): ToursState {
  switch (action.type) {
    case ToursActionTypes.FETCH_SUCCESS:
      return toursAdapter.addOne(action.payload, state);
    case ToursActionTypes.DELETED:
      return toursAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

const { selectIds, selectEntities, selectAll } = toursAdapter.getSelectors();

export const selectToursIds = selectIds;
export const selectToursEntity = selectEntities;
export const selectAllTours = selectAll;
