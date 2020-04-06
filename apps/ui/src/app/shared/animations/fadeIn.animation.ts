import { animate, style, transition, trigger } from '@angular/animations';

export const fadeAnimationIn = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 0}),
    animate('1s', style({opacity: 1}))
  ])
]);
