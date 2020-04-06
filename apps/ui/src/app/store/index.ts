import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Review } from '../shared/interfaces/review.interface';
import { Tour } from '../shared/interfaces/tour.interface';
import * as fromPrograms from './programs.reducer';
import * as fromReviews from './reviews.reducer';
import * as fromTours from './tours.reducer';

export interface AppState {
  programs: fromPrograms.ProgramsState;
  reviews: fromReviews.ReviewsState;
  tours: fromTours.ToursState;
}

export const reducers: ActionReducerMap<AppState> = {
  programs: fromPrograms.programsReducer,
  reviews: fromReviews.reviewsReducer,
  tours: fromTours.toursReducer
};

//#region Programs Selectors
export const selectProgramsState = createFeatureSelector<fromPrograms.ProgramsState>('programs');

export const selectPrograms = createSelector(
  selectProgramsState,
  fromPrograms.selectAllPrograms
);

export const selectHotPrograms = createSelector(
  selectPrograms,
  programs => programs.filter(p => p.isHot)
);

export const selectLearningPrograms = createSelector(
  selectPrograms,
  programs => programs.filter(p => p.type === 'learning')
);

export const selectInternshipPrograms = createSelector(
  selectPrograms,
  programs => programs.filter(p => p.type === 'internship')
);

export const selectVacationsPrograms = createSelector(
  selectPrograms,
  programs => programs.filter(p => p.type === 'vacations')
);

export const selectSelectedProgramId = createSelector(
  selectProgramsState,
  (state: fromPrograms.ProgramsState) => state.selectedProgramId
);

export const selectSelectedProgram = createSelector(
  selectPrograms,
  selectSelectedProgramId,
  (programs, id) => programs.find(program => program.id === id)
);

export const selectViewedProgramsId = createSelector(
  selectProgramsState,
  (state: fromPrograms.ProgramsState) => state.viewedProgramsId
);

export const selectViewedPrograms = createSelector(
  selectPrograms,
  selectViewedProgramsId,
  (programs, ids) => programs.filter(program => ids.some(id => program.id === id))
);

export const programsLoading = createSelector(
  selectProgramsState,
  (state: fromPrograms.ProgramsState) => state.loading
);
//#endregion

//#region Reviews Selectors
export const selectReviewsState = createFeatureSelector<fromReviews.ReviewsState>('reviews');

export const selectReviews = createSelector(
  selectReviewsState,
  fromReviews.selectAllReviews
);

export const selectLearningReviews = createSelector(
  selectReviews,
  selectPrograms,
  (reviews, programs) =>
    // TODO: как-то упростить?
    reviews.filter((review: Review) => {
      const program = programs.find(p => p.id === review.programId);
      return program ? program.type === 'learning' : false;
    })
);

export const selectVacationsReviews = createSelector(
  selectReviews,
  selectPrograms,
  (reviews, programs) =>
    reviews.filter((review: Review) => {
      const program = programs.find(p => p.id === review.programId);
      return program ? program.type === 'vacations' : false;
    })
);

export const selectInternshipReviews = createSelector(
  selectReviews,
  selectPrograms,
  (reviews, programs) =>
    reviews.filter((review: Review) => {
      const program = programs.find(p => p.id === review.programId);
      return program ? program.type === 'internship' : false;
    })
);

/**
 * Возвращает отзывы для выбранной программы
 */
export const selectReviewsOfSelectedProgram = createSelector(
  selectReviews,
  selectSelectedProgramId,
  (reviews, programId) => reviews.filter(review => review.programId === programId)
);
//#endregion

//#region Tours
export const selectToursState = createFeatureSelector<fromTours.ToursState>('tours');

export const selectAnyTours = createSelector(
  selectToursState,
  fromTours.selectAllTours
);

export const selectTours = createSelector(
  selectAnyTours,
  (tours: Tour[]) => tours.filter(t => t.dateStart > new Date())
);

export const selectToursOfSelectedProgram = createSelector(
  selectTours,
  selectSelectedProgramId,
  (tours, id) => tours.filter(tour => tour.programId === id)
);
//#endregion

export const selectUpcomingLearningPrograms = createSelector(
  selectLearningPrograms,
  selectTours,
  (programs, tours) => {
    const items = [];
    tours.forEach((tour: Tour) => {
      if (programs.some(program => program.id === tour.programId)) {
        items.push(programs.find(program => program.id === tour.programId));
      }
    });
    return items;
  }
);

export const selectUpcomingVacationsPrograms = createSelector(
  selectVacationsPrograms,
  selectTours,
  (programs, tours) => {
    const items = [];
    tours.forEach((tour: Tour) => {
      if (programs.some(program => program.id === tour.programId)) {
        items.push(programs.find(program => program.id === tour.programId));
      }
    });
    return items;
  }
);

export const selectUpcomingInternshipPrograms = createSelector(
  selectInternshipPrograms,
  selectTours,
  (programs, tours) => {
    const items = [];
    tours.forEach((tour: Tour) => {
      if (programs.some(program => program.id === tour.programId)) {
        items.push(programs.find(program => program.id === tour.programId));
      }
    });
    return items;
  }
);
