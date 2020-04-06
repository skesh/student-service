import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileDataService {
  constructor(private storage: AngularFireStorage) {}

  getFileUrl = (url: string) => this.storage.ref(url).getDownloadURL();

  getFileMetadata = (url: string) => this.storage.ref(url).getMetadata();
}
