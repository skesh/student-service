import { Component, Input } from '@angular/core';
import { fadeAnimation } from '../../../shared/animations/fade.animation';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  animations: [fadeAnimation]
})
export class SwiperComponent {
  @Input() menu;
  index = 0;

  get slides() {
    return [...this.menu, ...this.menu].slice(this.index, this.index + 3);
  }

  next() {
    this.index = this.index + 1 >= this.menu.length ? 0 : this.index + 1;
  }

  prev() {
    this.index = this.index <= 0 ? this.menu.length - 1 : this.index - 1;
  }

  setIndex(position: number) {
    this.index = position;
  }
}
