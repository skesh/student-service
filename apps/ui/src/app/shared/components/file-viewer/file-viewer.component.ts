import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileDataService } from '../../../core/file-data.service';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent implements OnInit, OnChanges {
  @Input() url: string;
  @Input() text: string;
  @Output() remove = new EventEmitter<string>();

  url$: Observable<string> = of(this.url).pipe(switchMap((url) => this.file.getFileUrl(url)));
  matadata$: Observable<string> = of(this.url).pipe(
    switchMap((url) => this.file.getFileMetadata(url))
  );

  constructor(private storage: AngularFireStorage, private file: FileDataService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.url.currentValue !== changes.url.previousValue) {
      this.url$ = of(changes.url.currentValue).pipe(switchMap((url) => this.file.getFileUrl(url)));
      this.matadata$ = of(changes.url.currentValue).pipe(
        switchMap((url) => this.file.getFileMetadata(url))
      );
    }
  }

  delete = (url: string) => this.remove.emit(url);
}
