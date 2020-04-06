import { Component } from '@angular/core';

@Component({
  selector: 'app-block-advantages',
  templateUrl: './block-advantages.component.html',
  styleUrls: ['./block-advantages.component.scss'],
})
export class BlockAdvantagesComponent {
  advantages = [
    {
      icon: 'assets/svg/advantages/Ic_1_Advantage_Vacation.svg',
      first: 'Уникальный',
      second: 'сервис',
    },
    {
      icon: 'assets/svg/advantages/Ic_2_Advantage_Vacation.svg',
      first: 'Прозрачные',
      second: 'цены',
    },
    {
      icon: 'assets/svg/advantages/Ic_3_Advantage_Vacation.svg',
      first: 'Профессиональный',
      second: 'штат сотрудников',
    },
    {
      icon: 'assets/svg/advantages/Ic_4_Advantage_Vacation.svg',
      first: 'Поддержка',
      second: '24/7',
    },
    {
      icon: 'assets/svg/advantages/Ic_5_Advantage_Vacation.svg',
      first: 'Безопастность',
      second: 'детей',
    },
    {
      icon: 'assets/svg/advantages/Ic_6_Advantage_Vacation.svg',
      first: 'Работаем дистанционно',
      second: 'по Дальнему Востоку',
    },
  ];
  banners = [
    { image: 'assets/banners/lager.png', url: 'http://englishfun.info/' },
    { image: 'assets/banners/school.png', url: '' },
  ];

  constructor() {}
}
