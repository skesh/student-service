import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { reducers } from './store';
import { ProgramsEffects } from './store/programs.effects';
import { programsReducer } from './store/programs.reducer';
import { ReviewsEffects } from './store/reviews.effects';
import { reviewsReducer } from './store/reviews.reducer';
import { ToursEffects } from './store/tours.effects';
import { toursReducer } from './store/tours.reducer';
import { AppComponent } from './_app-component/app.component';
import { FooterComponent } from './_app-component/footer/footer.component';
import { HeaderComponent } from './_app-component/header/header.component';
import { MenuMobileComponent } from './_app-component/menu-mobile/menu-mobile.component';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: {
      direction: Hammer.DIRECTION_HORIZONTAL,
      valocity: 0.1,
      threshold: 1,
    },
    pinch: { enable: false },
    rotate: { enable: false },
    pan: { enable: false },
  };
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, MenuMobileComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    StoreModule.forFeature('programs', programsReducer),
    StoreModule.forFeature('reviews', reviewsReducer),
    StoreModule.forFeature('tours', toursReducer),
    EffectsModule.forRoot([ProgramsEffects, ReviewsEffects, ToursEffects]),
    SharedModule,
    CoreModule.forRoot(),
    HttpClientModule,
    AdminModule,
  ],
  entryComponents: [MenuMobileComponent],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
