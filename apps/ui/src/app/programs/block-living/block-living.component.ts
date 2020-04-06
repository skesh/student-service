import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Residence } from '../../shared/interfaces/residence.interface';
import { FileDataService } from './../../core/file-data.service';

@Component({
  selector: 'app-block-living',
  templateUrl: './block-living.component.html',
  styleUrls: ['./block-living.component.scss'],
})
export class BlockLivingComponent implements OnInit {
  image$: Observable<string>;
  current = 0;
  current$ = new BehaviorSubject(0);

  @Input() residences: Residence[] = [];

  constructor(private files: FileDataService, private afs: AngularFireStorage) {}

  get activeResidence() {
    return this.residences.length ? this.residences[this.current] : null;
  }

  ngOnInit() {
    this.image$ = this.current$.pipe(
      switchMap((position: number) => this.files.getFileUrl(this.residences[position].image)),
    );
  }

  next() {
    this.current = this.current < this.residences.length - 1 ? this.current + 1 : 0;
    this.current$.next(this.current);
  }

  prev() {
    this.current = this.current === 0 ? this.residences.length - 1 : this.current - 1;
    this.current$.next(this.current);
  }

  setIndex(i: number) {
    this.current = i;
    this.current$.next(this.current);
  }
}
