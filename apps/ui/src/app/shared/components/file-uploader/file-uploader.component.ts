import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

export class BaseFile {
  name: string;
  directory: string;
  path: string;

  constructor(name: string, directory: string, path: string) {
    this.name = name;
    this.directory = directory;
    this.path = path;
  }
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }
  ]
})
export class FileUploaderComponent implements OnDestroy {
  @Input() value: string;
  @Input() directory: string;
  @Input() placeholder = 'Выберите файл';
  @Input() hint: string;

  selectedFile;

  isLoading = false;
  destroy$ = new Subject();

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
    this.onChange(path);
    this.onTouched();
  }

  uploadFile(el, directory?: string) {
    const file = el.target.files[0];
    const f = new BaseFile(file.name, directory, this.getPath(file.name, directory));
    const task = this.storage.upload(f.path, file);

    this.isLoading = true;

    task
      .snapshotChanges()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.writeValue(f.path);
          this.clearSelectedFile();
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  getPath = (name: string, directory?: string) =>
    directory ? `${this.directory}/${name}` : `${name}`

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clear = () => {
    this.writeValue(null);
    this.clearSelectedFile();
  }

  clearSelectedFile = () => (this.selectedFile = new FileInput([]));
}
