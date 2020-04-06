import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { CurrencyService } from '../../core/currency.service';
import { Tour } from '../../shared/interfaces/tour.interface';

@Component({
  selector: 'app-upcoming-tour',
  templateUrl: './upcoming-tour.component.html',
  styleUrls: ['./upcoming-tour.component.scss']
})
export class UpcomingTourComponent implements OnInit {
  @Input() tour: Tour;

  price$: Observable<number>;
  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.price$ = of(this.tour.price).pipe(
      switchMap(price =>
        this.currencyService.currencyExchange$.pipe(
          pluck('USD', 'Value'),
          map(course => +course * price)
        )
      )
    );
  }

  get haveSeats() {
    return this.tour.seats - this.tour.seatsOccupied;
  }
}
