import { CommonModule, registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  FileInputConfig,
  MaterialFileInputModule,
  NGX_MAT_FILE_INPUT_CONFIG,
} from 'ngx-material-file-input';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { BlockOffersComponent } from './components/block-offers/block-offers.component';
import { BlockProgramsComponent } from './components/block-programs/block-programs.component';
import { BlockReviewsComponent } from './components/block-reviews/block-reviews.component';
import { BlockComponent } from './components/block/block.component';
import { CardAdvantageComponent } from './components/card-advantage/card-advantage.component';
import { CardProgramComponent } from './components/card-program/card-program.component';
import { CardReviewComponent } from './components/card-review/card-review.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FileUploaderEmitterComponent } from './components/file-uploader-emitter/file-uploader-emitter.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';
import { ImageComponent } from './components/image/image.component';
import { ProfessionCardComponent } from './components/profession-card/profession-card.component';
import { ProgramsGridComponent } from './components/programs-grid/programs-grid.component';
import { QuestionComponent } from './components/questions/question/question.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuoteComponent } from './components/quote/quote.component';
import { SelectComponent } from './components/select/select.component';
import { UserCircleComponent } from './components/user-circle/user-circle.component';
import { ViewedProgramsComponent } from './components/viewed-programs/viewed-programs.component';
import { PhoneMaskPipe } from './pipes/phone-mask.pipe';
import { SafePipe } from './pipes/safe.pipe';

registerLocaleData(ru, 'ru');

const components = [
  CardAdvantageComponent,
  SafePipe,
  CardReviewComponent,
  CardProgramComponent,
  QuestionsComponent,
  FeedbackComponent,
  SelectComponent,
  QuestionComponent,
  ViewedProgramsComponent,
  BlockReviewsComponent,
  BlockProgramsComponent,
  QuoteComponent,
  BlockComponent,
  BlockOffersComponent,
  FileUploaderComponent,
  FileUploaderEmitterComponent,
  FileViewerComponent,
  UserCircleComponent,
  ProgramsGridComponent,
  ArticleCardComponent,
  ImageComponent,
  ProfessionCardComponent,
  PhoneMaskPipe,
];

const modules = [
  CommonModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialFileInputModule,
  MatIconModule,
  MatSliderModule,
  MatMenuModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  MatTableModule,
  MatCardModule,
  MatSelectModule,
  MatSidenavModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

export const config: FileInputConfig = {
  sizeUnit: 'Octet',
};

@NgModule({
  declarations: [...components],
  imports: [...modules, RouterModule],
  exports: [...components, ...modules],
  providers: [
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
})
export class SharedModule {}
