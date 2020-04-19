import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AfsService } from '../../core/afs.service';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { ConfigurationService } from '../configuration.service';
import { MaterialType } from '../material-types.enum';

@Component({
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBase {
  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;
  selectedItem: any;

  collectionName: string;
  type$: Observable<string | MaterialType> = this.route.params.pipe(
    map((params) => params.type),
    tap((_) => (this.selectedItem = null))
  );

  fields$ = this.type$.pipe(
    map((type) => this.fieldsService.MaterialFields.get(MaterialType[type]))
  );
  tableColumns$ = this.type$.pipe(
    map((type) => this.fieldsService.MaterialColumns.get(MaterialType[type]))
  );
  columnsNames$ = this.tableColumns$.pipe(
    map((fields: any[]) => {
      const columns = fields.reduce((acc, curr) => acc.concat(curr.field), []);
      columns.push('actions');
      return columns;
    })
  );

  items$: Observable<any> = this.type$.pipe(switchMap((type) => this.afs.getItems(type)));

  constructor(
    private afs: AfsService,
    private route: ActivatedRoute,
    private fieldsService: ConfigurationService
  ) {
    this.collectionName = this.route.snapshot.params.type;
  }

  get type() {
    return MaterialType[this.collectionName];
  }

  save(item: any) {
    this.selectedItem?.id
      ? this.afs.updateItem(this.collectionName, this.selectedItem.id, item)
      : this.afs.addItem(this.collectionName, item);
    this.selectedItem = null;
  }

  edit(item: any) {
    this.selectedItem = item;
    this.form.form.patchValue(item);
  }

  delete(id: string) {
    this.afs.deleteItem(this.collectionName, id);
    this.selectedItem = null;
  }
}
