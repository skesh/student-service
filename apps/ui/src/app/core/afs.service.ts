import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AfsService {
  getItems(collectionName: string) {
    return this.afs
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((doc) =>
          doc.map((item: DocumentChangeAction<any>) => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  addItem(collectionName: string, item: any) {
    this.afs.collection(collectionName).add(item);
  }

  deleteItem(collectionName: string, id: string) {
    this.afs
      .collection(collectionName)
      .doc(id)
      .delete();
  }

  updateItem(collectionName: string, id: string, changes: any) {
    this.afs
      .collection(collectionName)
      .doc(id)
      .update(changes);
  }

  updateOrAdd(collectionName: string, item: any) {
    item?.id ? this.updateItem(collectionName, item.id, item) : this.addItem(collectionName, item);
  }

  getItemById(collectionName: string, id: string) {
    return this.afs
      .collection(collectionName)
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((doc: any) => {
          const data = doc.payload.data();
          const id = doc.payload.id;
          return { id, ...data };
        })
      );
  }

  constructor(private afs: AngularFirestore) {}
}
