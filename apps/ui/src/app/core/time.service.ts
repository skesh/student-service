import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() {}

  /**
   * Склонение дней
   * @param number дней
   */
  declOfNum(number, titles = ['день', 'дня', 'дней']) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[ number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
];
  }
}
