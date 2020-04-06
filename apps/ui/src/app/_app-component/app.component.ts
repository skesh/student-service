import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { ProgramsQuery } from '../store/programs.actions';
import { ReviewsQuery } from '../store/reviews.actions';
import { ToursQuery } from '../store/tours.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private store: Store<AppState>
  ) {
    this.matIconRegistry.addSvgIcon(
      'advantage',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/svg/advantage_icon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'quote',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/svg/quotes.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'check',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/svg/check.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'arrow1',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/Control_Arrow_1.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'arrow2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/Control_Arrow_2.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'small-arrow2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Control_Small_Arrow_2.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'big-arrow2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/svg/Control_Big_Arrow_2.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'plus',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/svg/plus.svg')
    );
  }

  get isAdminMode() {
    return this.router.url.includes('admin');
  }

  ngOnInit() {
    this.store.dispatch(new ProgramsQuery());
    this.store.dispatch(new ToursQuery());
    this.store.dispatch(new ReviewsQuery());
  }
}
