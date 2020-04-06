import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AfsService } from '../../core/afs.service';
import { FieldBase } from '../../dynamic-form/models/field-base.class';
import { FileField } from '../../dynamic-form/models/field-file.class';
import { SelectField } from '../../dynamic-form/models/field-select.class';
import { TextField } from '../../dynamic-form/models/field-text.class';
import { Program } from '../../shared/interfaces/program.interface';
import { Review } from '../../shared/interfaces/review.interface';
import { AppState, selectPrograms, selectReviews } from '../../store';
import { ReviewDelete } from '../../store/reviews.actions';

@Component({
  selector: 'app-reviews-manager',
  templateUrl: './reviews-manager.component.html',
  styleUrls: ['./reviews-manager.component.scss'],
})
export class ReviewsManagerComponent implements OnInit, OnDestroy {
  @Input() selectedProgramId: string = null;
  reviews$ = this.store.pipe(select(selectReviews));
  programs$ = this.store.pipe(select(selectPrograms));
  newReviewFields: FieldBase<any>[] = [];
  destroy$ = new Subject();

  constructor(private store: Store<AppState>, public afs: AfsService) {}

  getById = (id: string, collection: any[]) => collection.find(item => item.id === id);

  ngOnInit() {
    this.programs$
      .pipe(
        tap((programs: Program[]) => {
          this.newReviewFields = [
            new SelectField({
              key: 'programId',
              label: 'Программа',
              required: true,
              options: programs,
              optionLabel: 'title',
              optionValue: 'id',
            }),

            new TextField({
              key: 'firstname',
              label: 'Имя участника',
              required: true,
            }),

            new TextField({
              key: 'lastname',
              label: 'Фамилия участника',
              required: false,
            }),

            new TextField({
              key: 'text',
              label: 'Текст отзыва',
              required: true,
            }),

            new FileField({
              key: 'photo',
              label: 'Фото участника',
              directory: 'user-photos',
              hint: '80x80px',
            }),
          ];
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  delete(review: Review) {
    this.store.dispatch(new ReviewDelete(review));
  }
}
