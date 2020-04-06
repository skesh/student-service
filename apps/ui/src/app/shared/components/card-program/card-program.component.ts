import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FileDataService } from '../../../core/file-data.service';
import { TimeService } from '../../../core/time.service';
import { Program } from '../../interfaces/program.interface';
import { Review } from '../../interfaces/review.interface';

@Component({
  selector: 'app-card-program',
  templateUrl: './card-program.component.html',
  styleUrls: ['./card-program.component.scss']
})
export class CardProgramComponent implements OnInit {
  @Input() inline = false;
  @Input() program: Program;
  @Input() small = false;
  smallImage$: Observable<string>;
  reviews$: Observable<Review[]>;

  constructor(
    private timeService: TimeService,
    private file: FileDataService,
    private db: AngularFirestore
  ) {}

  declOfDays(days: number) {
    return this.timeService.declOfNum(days);
  }

  declOfReviews(reviews: number) {
    return this.timeService.declOfNum(reviews, ['отзыв', 'отзыва', 'отзывов']);
  }

  ngOnInit() {
    if (this.program.smallImage) {
      this.smallImage$ = this.file.getFileUrl(this.program.smallImage);
    }

    this.reviews$ = <Observable<Review[]>>(
      this.db
        .collection('reviews', ref => ref.where('programId', '==', this.program.id))
        .valueChanges()
    );
  }
}
