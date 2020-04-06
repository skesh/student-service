import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AfsService } from '../../core/afs.service';
import { CurrencyService } from '../../core/currency.service';
import { VisaTypeEnum } from '../../shared/enums/visa-type.enum';
import { Country } from '../../shared/interfaces/country.interface';

@Component({
  selector: 'app-block-price',
  templateUrl: './block-price.component.html',
  styleUrls: ['./block-price.component.scss']
})
export class BlockPriceComponent implements OnInit, OnDestroy {
  @Input() directions = [];
  countries$ = this.afs.getItems('country');
  visaTypeEnum = VisaTypeEnum;
  destroy$ = new Subject();
  valutes;

  constructor(private currencyService: CurrencyService, private afs: AfsService) {}

  get items() {
    return Object.entries(this.groupBy(this.directions, 'countryId')) || [];
  }

  groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item]
      }),
      {}
    );

  toRub(value: number) {
    return this.valutes && this.valutes.USD ? value * this.valutes.USD.Value : 0;
  }

  ngOnInit() {
    this.currencyService.currencyExchange$
      .pipe(
        takeUntil(this.destroy$),
        tap(valutes => (this.valutes = valutes))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getCountryName(countryId: string, countries: Country[]): Country {
    return countries.find(country => country.id === countryId) || null;
  }

  trackByFn(index, item) {
    return index;
  }
}
