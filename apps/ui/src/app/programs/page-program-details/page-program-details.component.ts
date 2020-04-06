import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { Observable, Subject } from 'rxjs';
import { map, mergeAll, mergeMap, pluck, scan, switchMap, tap } from 'rxjs/operators';
import { FileDataService } from '../../core/file-data.service';
import { ScrollToTopService } from '../../core/scroll-to-top.service';
import { fadeAnimation } from '../../shared/animations/fade.animation';
import { Program } from '../../shared/interfaces/program.interface';
import { Tour } from '../../shared/interfaces/tour.interface';
import {
  AppState,
  selectReviewsOfSelectedProgram,
  selectSelectedProgram,
  selectToursOfSelectedProgram,
  selectViewedPrograms,
} from '../../store';
import { ProgramSelect, ProgramViewed } from '../../store/programs.actions';
import { Review } from './../../shared/interfaces/review.interface';

@Component({
  selector: 'app-page-program-details',
  templateUrl: './page-program-details.component.html',
  styleUrls: ['./page-program-details.component.scss'],
  animations: [fadeAnimation],
})
export class PageProgramDetailsComponent implements OnInit, OnDestroy {
  // get reference to gallery component
  @ViewChild(NgxImageGalleryComponent, { static: false }) ngxImageGallery: NgxImageGalleryComponent;

  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };

  tabs = {
    options: ['О программе', 'Отзывы', 'Фотоотчеты', 'Экскурсии'],
    active: 'О программе',
  };

  program$: Observable<Program> = this.store.pipe(select(selectSelectedProgram));
  tours$: Observable<Tour[]> = this.store.pipe(
    select(selectToursOfSelectedProgram),
    map((tours) => tours.slice(0, 2))
  );
  reviews$: Observable<Review[]> = this.store.pipe(select(selectReviewsOfSelectedProgram));
  viewedPrograms$: Observable<Program[]> = this.store.pipe(
    select(selectViewedPrograms),
    map((programs) => programs.reverse().slice(0, 4))
  );
  bigImage$: Observable<string> = this.program$.pipe(
    pluck('bigImage'),
    switchMap((url: string) => (url ? this.file.getFileUrl(url) : null))
  );
  photos$: Observable<GALLERY_IMAGE[]> = this.program$.pipe(
    pluck('photos'),
    mergeAll(),
    mergeMap((url: string) => this.file.getFileUrl(url)),
    map((url) => ({ url, title: '', altText: '', thumbnailUrl: url })),
    scan((acc, curr) => acc.concat(curr), [])
  );

  destroy$ = new Subject();

  constructor(
    public el: ElementRef,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private file: FileDataService,
    private scrollToTop: ScrollToTopService
  ) {}

  get height() {
    return this.el.nativeElement.offsetHeight;
  }

  ngOnInit() {
    this.scrollToTop.setScrollTop();

    this.route.params
      .pipe(
        pluck('id'),
        tap((id) => this.store.dispatch(new ProgramSelect(id))),
        tap((id) => this.store.dispatch(new ProgramViewed(id)))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  // nextImage(index: number = 0) {
  //   this.ngxImageGallery.next(index);
  // }

  // prev image in gallery
  // prevImage(index: number = 0) {
  //   this.ngxImageGallery.prev(index);
  // }
}
