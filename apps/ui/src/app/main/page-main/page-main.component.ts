import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AfsService } from '../../core/afs.service';
import { Article } from '../../shared/interfaces/article.interface';
import { AppState, selectHotPrograms, selectReviews } from '../../store';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss']
})
export class PageMainComponent {
  reviews$ = this.store.pipe(select(selectReviews));
  articles$: Observable<Article[]> = this.afs.getItems('articles');
  hotPrograms$ = this.store.pipe(select(selectHotPrograms));

  constructor(private store: Store<AppState>, private afs: AfsService) {}
}
