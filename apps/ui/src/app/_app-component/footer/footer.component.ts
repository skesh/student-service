import { Component } from '@angular/core';
import { COMPANY } from '../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  isFeedbackFormVisible = true;
  contacts = COMPANY;

  vk = COMPANY.VK;
  insta = COMPANY.INSTA;
  youtube = COMPANY.YOUTUBE;
  whatsapp = COMPANY.WHATSAPP;
  telegram = COMPANY.TELEGRAM;

  toggleFeedbackForm() {
    this.isFeedbackFormVisible = !this.isFeedbackFormVisible;
  }
}
