import { Component, Input } from '@angular/core';
import { fadeAnimationIn } from '../../animations/fadeIn.animation';
import { Offer } from '../../interfaces/offer.interface';

@Component({
  selector: 'app-block-offers',
  templateUrl: './block-offers.component.html',
  styleUrls: ['./block-offers.component.scss'],
  animations: [fadeAnimationIn]
})
export class BlockOffersComponent {
  @Input() offers: Offer[] = [];
  position = 0;

  get active() {
    return this.offers[this.position];
  }

  setIndex(index: number) {
    this.position = index;
  }
}
