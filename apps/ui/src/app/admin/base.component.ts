import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AfsService } from '../core/afs.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';
import { FieldsService } from './fields.map';
import { MaterialType } from './material-types.enum';

@Component({
  template: `
    <app-dynamic-form [fields]="fields$ | async" (save)="save($event)"></app-dynamic-form>

    <table mat-table [dataSource]="items$ | async" class="items">
      <ng-container matColumnDef="{{ column.field }}" *ngFor="let column of tableColumns$ | async">
        <th mat-header-cell *matHeaderCellDef>{{ column.name }}</th>
        <td mat-cell *matCellDef="let element">
          <!-- <ng-container *ngIf="column.async; else notAsync">
            {{ column.data(element) | async }}
          </ng-container>

          <ng-template #notAsync> -->
          {{ column.data(element) }}
          <!-- </ng-template> -->
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Действия</th>

        <td mat-cell *matCellDef="let element">
          <button mat-icon-button (click)="edit(element)">
            <mat-icon>edit</mat-icon>
          </button>

          <button mat-icon-button (click)="delete(element.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <ng-container *ngIf="columnsNames$ | async as columns">
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </ng-container>
    </table>
  `,
  styles: ['table {width: 100%; margin-top: 20px}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBase {
  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;

  collectionName: string;
  type$: Observable<string | MaterialType> = this.route.params.pipe(map((params) => params.type));

  fields$ = this.type$.pipe(
    map((type) => this.fieldsService.MaterialFields.get(MaterialType[type]))
  );
  tableConfig: any[];
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
    private fieldsService: FieldsService
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
