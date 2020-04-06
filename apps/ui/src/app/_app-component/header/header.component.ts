import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { COMPANY } from '../../constants';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  contacts = COMPANY;
  menu = [
    {
      name: 'Программы',
      url: 'programs',
      class: '--orange',
      options: '{exact:false}'
    },
    { name: 'Обучение', url: 'learning', class: '--orange', options: '' },
    { name: 'Каникулы', url: 'vacations', class: '--green', options: '' },
    { name: 'Стажировка', url: 'internship', class: '--blue', options: '' },
    { name: 'Виза', url: 'visa', class: '--orange', options: '' },
    { name: 'Статьи', url: 'blog', class: '--orange', options: '' },
    { name: 'О компании', url: 'about', class: '--orange', options: '' }
  ];

  constructor(private dialog: MatDialog) {}

  openMenu() {
    this.dialog.open(MenuMobileComponent, {
      data: { menu: this.menu },
      position: { top: '40px', right: '40px' }
    });
  }

  ngOnInit() {}
}
