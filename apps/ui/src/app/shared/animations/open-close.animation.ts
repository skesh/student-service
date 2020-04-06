import {animate, style, transition, trigger} from '@angular/animations';

export const openCloseAnimation = trigger('openClose', [
    transition(':enter', [
        style({height: 0}),
        animate('0.5s', style({height: '*'}))
    ]),
    transition(':leave', [
        style({height: '*'}),
        animate('0.5s', style({height: 0}))
    ])
]);
