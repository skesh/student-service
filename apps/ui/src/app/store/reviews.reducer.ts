import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Review } from '../shared/interfaces/review.interface';
import { ReviewsActionTypes } from './reviews.actions';

export const adapter: EntityAdapter<Review> = createEntityAdapter<Review>();

export interface ReviewsState extends EntityState<Review> {}

export const initialState: ReviewsState = adapter.getInitialState([]);

export function reviewsReducer(state = initialState, action): ReviewsState {
  switch (action.type) {
    case ReviewsActionTypes.ADDED:
      return adapter.addOne(action.payload, state);
    case ReviewsActionTypes.DELETED:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectReviewsIds = selectIds;
export const selectReviewsEntity = selectEntities;
export const selectAllReviews = selectAll;
