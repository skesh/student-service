import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  routes = [
    { name: 'Программы', url: '/admin/programs' },
    { name: 'Смены', url: '/admin/tours' },
    { name: 'Статьи', url: '/admin/articles' },
    { name: 'Страны', url: '/admin/countries' },
    { name: 'Отзывы', url: '/admin/reviews' },
    { name: 'Визы', url: '/admin/visa' },
    // { name: 'Преимущества', url: '/admin/advantages' },
    { name: 'Предложения', url: '/admin/offers' },
    { name: 'Вопросы', url: '/admin/questions' },
    { name: 'Заявки', url: '/admin/feedbacks' },
    { name: 'Профессии', url: '/admin/profession' },
    // { name: 'Баннеры', url: '/admin/banners' }
  ];

  constructor(public auth: AuthService) {}
}
