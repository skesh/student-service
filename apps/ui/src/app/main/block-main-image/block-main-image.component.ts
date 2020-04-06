import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-main-image',
  templateUrl: './block-main-image.component.html',
  styleUrls: ['./block-main-image.component.scss']
})
export class BlockMainImageComponent implements OnInit {
  menu = [
    {
      name: 'Обучение',
      second: '',
      url: ['/programs', { filter: 'learning' }],
      class: 'orange',
      image: '/assets/images/main-menu/BG_English_Mobile.jpg'
    },
    {
      name: 'Каникулы',
      second: '',
      url: ['/programs', { filter: 'vacations' }],
      class: 'green',
      image: '/assets/images/main-menu/BG_Working_Mobile.jpg'
    },
    {
      name: 'Стажировки',
      second: '',
      url: ['/programs', { filter: 'internship' }],
      class: 'blue',
      image: '/assets/images/main-menu/BG_Internship_Mobile.jpg'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
