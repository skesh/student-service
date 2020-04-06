import { Component, Input, OnInit } from '@angular/core';
import { Advantage } from '../../interfaces/advantage.interface';

@Component({
  selector: 'app-card-advantage',
  templateUrl: './card-advantage.component.html',
  styleUrls: ['./card-advantage.component.scss']
})
export class CardAdvantageComponent implements OnInit {
  @Input() advantage: Advantage;

  ngOnInit() {}
}
