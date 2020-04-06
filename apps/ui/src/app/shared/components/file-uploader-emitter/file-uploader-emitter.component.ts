import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-file-uploader-emitter',
  templateUrl: './file-uploader-emitter.component.html',
  styleUrls: ['./file-uploader-emitter.component.scss']
})
export class FileUploaderEmitterComponent implements OnDestroy {
  @Input() value: any;
  @Input() directory: string;
  @Output() save = new EventEmitter<string>();
  localFile: File;
  isLoading = false;
  destroy$ = new Subject();

  uploadPercent$: Observable<number>;
  downloadURL$: Observable<string>;

  get questions(): string {
    return this.value;
  }

  constructor(private storage: AngularFireStorage) {}

  onChange: any = () => {};

  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(path: string) {
    this.value = path;
    this.save.emit(path);
    this.onChange(path);
    this.onTouched();
  }

  uploadFile(event, directory = this.directory) {
    const file = event.target.files[0];
    const filePath = this.getPath(file.name);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent$ = task.percentageChanges();
    this.isLoading = true;

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL$ = fileRef.getDownloadURL();
          this.writeValue(filePath);
          this.localFile = null;
          this.isLoading = false;
          this.localFile = null;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getPath = (name: string) => (this.directory ? `${this.directory}/${name}` : `${name}`);

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
