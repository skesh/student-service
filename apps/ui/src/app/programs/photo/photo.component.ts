import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileDataService } from '../../core/file-data.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() url: string;
  url$: Observable<string>;

  constructor(private files: FileDataService) {}

  ngOnInit() {
    this.url$ = of(this.url).pipe(switchMap(url => this.files.getFileUrl(url)));
  }
}
