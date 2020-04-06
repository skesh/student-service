import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { VISATEXT } from '../../constants';
import { AfsService } from '../../core/afs.service';
import { Offer } from '../../shared/interfaces/offer.interface';

@Component({
  selector: 'app-page-visa',
  templateUrl: './page-visa.component.html',
  styleUrls: ['./page-visa.component.scss']
})
export class PageVisaComponent {
  visas$ = this.afs.getItems('visa');
  questions$ = this.afs.getItems('questions');
  offers$ = this.afs
    .getItems('offers')
    .pipe(map((offers: Offer[]) => offers.filter(o => o.type === 'visa')));
  text = VISATEXT;

  constructor(private afs: AfsService) {}
}
