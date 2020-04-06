import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-map',
  templateUrl: './block-map.component.html',
  styleUrls: ['./block-map.component.scss'],
})
export class BlockMapComponent implements OnInit {
  // TODO:  получать страны из стора
  countries = [
    { label: 'Америка', image: '/assets/images/maps/Map_USA@2x.png' },
    { label: 'Канада', image: '/assets/images/maps/Map_Canada@2x.png' },
    { label: 'Австралия', image: '/assets/images/maps/Map_Australia@2x.png' },
    { label: 'Новая Зеландия', image: '/assets/images/maps/Map_Australia@2x.png' },
    { label: 'Англия', image: '/assets/images/maps/Map_Australia@2x.png' },
    { label: 'Европа', image: '/assets/images/maps/Map_Australia@2x.png' },
    { label: 'Филлипины', image: '/assets/images/maps/Map_Philippines@2x.png' },
    { label: 'Китай', image: '/assets/images/maps/Map_Czech@2x.png' },
    { label: 'Япония', image: '/assets/images/maps/Map_Japan@2x.png' },
  ];
  selectedCountry = this.countries[0];

  constructor() {}

  set = (country) => (this.selectedCountry = country);

  isActive = (country) => this.selectedCountry === country;

  ngOnInit() {}
}
