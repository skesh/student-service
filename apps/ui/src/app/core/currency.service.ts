import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currencyExchange$ = this.http
    .get('https://www.cbr-xml-daily.ru/daily_json.js')
    .pipe(pluck('Valute'));

  constructor(private http: HttpClient) {}
}
