import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDataService } from '../../../core/file-data.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() url: string;
  @Input() width: string;
  @Input() height: string;

  @HostBinding('style.width') componentWidth: string;
  @HostBinding('style.height') componentHeight: string;

  image$: Observable<string>;

  constructor(private file: FileDataService) {}

  ngOnInit() {
    if (this.width) this.componentWidth = this.width;
    if (this.height) this.componentHeight = this.height;

    this.image$ = this.file.getFileUrl(this.url);
  }
}
