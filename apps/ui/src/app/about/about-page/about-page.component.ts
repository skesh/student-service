import { Component, OnInit } from '@angular/core';
import { ABOUTCOMPANYTEXT } from '../../constants';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  quote = ABOUTCOMPANYTEXT;

  partners = [
    { url: '/assets/partners/Partners1-8.png' },
    { url: '/assets/partners/Partners2-8.png' },
    { url: '/assets/partners/Partners3-8.png' },
    { url: '/assets/partners/Partners4-8.png' },
    { url: '/assets/partners/Partners5-8.png' },
    { url: '/assets/partners/Partners6-8.png' },
    { url: '/assets/partners/Partners7-8.png' },
    { url: '/assets/partners/Partners8-8.png' },
    { url: '/assets/partners/Partners9-8.png' },
    { url: '/assets/partners/Partners10-8.png' },
    { url: '/assets/partners/Partners11-8.png' },
    { url: '/assets/partners/Partners12-8.png' },
    { url: '/assets/partners/Partners13-8.png' },
    { url: '/assets/partners/Partners14-8.png' },
    { url: '/assets/partners/Partners15-8.png' },
    { url: '/assets/partners/Partners16-8.png' },
    { url: '/assets/partners/Partners17-8.png' },
    { url: '/assets/partners/Partners18-8.png' },
    { url: '/assets/partners/Partners19-8.png' },
    { url: '/assets/partners/Partners20-8.png' },
    { url: '/assets/partners/Partners21-8.png' },
    { url: '/assets/partners/Partners22-8.png' },
    { url: '/assets/partners/Partners23-8.png' },
    { url: '/assets/partners/Partners24-8.png' },
    { url: '/assets/partners/Partners25-8.png' },
    { url: '/assets/partners/Partners26-8.png' },
    { url: '/assets/partners/Partners27-8.png' },
    { url: '/assets/partners/Partners28-8.png' },
    { url: '/assets/partners/Partners29-8.png' },
    { url: '/assets/partners/Partners30-8.png' },
  ];

  constructor() {}

  ngOnInit() {}
}
