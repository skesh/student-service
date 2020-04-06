import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDataService } from '../../../core/file-data.service';

@Component({
  selector: 'app-user-circle',
  templateUrl: './user-circle.component.html',
  styleUrls: ['./user-circle.component.scss']
})
export class UserCircleComponent implements OnInit {
  @Input() image: string;
  @Input() firstname: string;
  @Input() lastname: string;

  image$: Observable<string>;

  constructor(private file: FileDataService) {}

  ngOnInit() {
    if (this.image) {
      this.image$ = this.file.getFileUrl(this.image);
    }
  }
}
