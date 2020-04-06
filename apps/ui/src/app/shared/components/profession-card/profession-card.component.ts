import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Profession } from '../../interfaces/profession.interface';

@Component({
  selector: 'app-profession-card',
  templateUrl: './profession-card.component.html',
  styleUrls: ['./profession-card.component.scss']
})
export class ProfessionCardComponent implements OnInit {
  @Input() profession: Profession;
  @HostBinding('class') class: string;

  constructor() {}

  ngOnInit() {
    this.class = 'shadow';
  }
}
