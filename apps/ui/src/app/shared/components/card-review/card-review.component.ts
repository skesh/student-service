import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../interfaces/review.interface';
import { FileDataService } from './../../../core/file-data.service';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.scss']
})
export class CardReviewComponent implements OnChanges {
  @Input() review: Review;

  photo$: Observable<string>;

  constructor(private files: FileDataService) {}

  ngOnChanges() {
    if (this.review.photo) {
      this.photo$ = this.files.getFileUrl(this.review.photo);
    }
  }
}
