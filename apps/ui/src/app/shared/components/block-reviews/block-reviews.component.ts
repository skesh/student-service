import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AfsService } from '../../../core/afs.service';
import { Program } from '../../interfaces/program.interface';
import { Review } from '../../interfaces/review.interface';

@Component({
  selector: 'app-block-reviews',
  templateUrl: './block-reviews.component.html',
  styleUrls: ['./block-reviews.component.scss']
})
export class BlockReviewsComponent implements OnChanges {
  @Input() reviews: Review[];
  program$: Observable<Program>;
  index = 0;

  constructor(private afs: AfsService) {}

  get count() {
    return this.reviews.length;
  }

  get selectedReview(): Review {
    return this.reviews[this.index];
  }

  get isFirst() {
    return this.index === 0;
  }

  get isLast() {
    return this.index === this.count - 1;
  }

  next() {
    if (this.index < this.count - 1) this.index += 1;
    this.setSelectedProgram();
  }

  prev() {
    if (this.index > 0) this.index -= 1;
    this.setSelectedProgram();
  }

  setSelectedProgram() {
    if (this.selectedReview && this.selectedReview.programId) {
      this.program$ = <Observable<Program>>(
        this.afs.getItemById('programs', this.selectedReview.programId)
      );
    }
  }

  ngOnChanges() {
    this.setSelectedProgram();
  }
}
