import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileDataService } from '../../../core/file-data.service';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  @Input() url: string;
  @Input() text: string;
  @Output() remove = new EventEmitter<string>();

  url$: Observable<string>;
  matadata$: Observable<string>;

  constructor(private storage: AngularFireStorage, private file: FileDataService) {}

  ngOnInit() {
    if (this.url) {
      this.url$ = of(this.url).pipe(switchMap(url => this.file.getFileUrl(url)));
      this.matadata$ = of(this.url).pipe(switchMap(url => this.file.getFileMetadata(url)));
    }
  }

  delete = (url: string) => this.remove.emit(url);
}
