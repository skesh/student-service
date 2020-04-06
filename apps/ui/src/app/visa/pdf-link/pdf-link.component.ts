import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDataService } from '../../core/file-data.service';

@Component({
  selector: 'app-pdf-link',
  templateUrl: './pdf-link.component.html',
  styleUrls: ['./pdf-link.component.scss'],
})
export class PdfLinkComponent implements OnInit {
  @Input() url: string;
  fileUrl$: Observable<string>;

  constructor(private files: FileDataService) {}

  ngOnInit() {
    this.fileUrl$ = this.files.getFileUrl(this.url);
  }
}
