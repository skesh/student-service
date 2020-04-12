import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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

  collectionName: string;
  type$: Observable<string | MaterialType> = this.route.params.pipe(
    map((params) => params.type),
    tap(console.log)
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
  items$: Observable<any> = this.type$.pipe(
    switchMap((type) => this.afs.getItems(type)),
    tap(console.log)
  );

  constructor(
    private afs: AfsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private fieldsService: ConfigurationService
  ) {
    this.collectionName = this.route.snapshot.params.type;
    // this.items$ = this.afs.getItems(this.collectionName);
    // this.fields = MaterialFields.get(this.type);
    // this.tableConfig = MaterialColumns.get(this.type);

    // this.route.params
    //   .pipe(
    //     tap((_) => {
    //       cdr.detach();
    //       setInterval(() => {
    //         this.cdr.detectChanges();
    //       }, 5000);
    //     })
    //   )
    //   .subscribe();
  }

  get type() {
    return MaterialType[this.collectionName];
  }

  // get columns() {
  //   const columns = this.tableConfig.reduce((acc, curr) => acc.concat(curr.field), []);
  //   columns.push('actions');
  //   return columns;
  // }

  save(item: any) {
    this.afs.updateOrAdd(this.collectionName, item);
  }

  edit(item: any) {
    this.form.form.patchValue(item);
  }

  delete(id: string) {
    this.afs.deleteItem(this.collectionName, id);
  }
}
