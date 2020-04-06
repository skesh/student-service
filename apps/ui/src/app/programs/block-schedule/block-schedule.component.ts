import { Component, Input, OnInit } from '@angular/core';
import { ProgramEvent } from './../../shared/interfaces/program-event.interface';

@Component({
  selector: 'app-block-schedule',
  templateUrl: './block-schedule.component.html',
  styleUrls: ['./block-schedule.component.scss']
})
export class BlockScheduleComponent implements OnInit {
  @Input() events: ProgramEvent[];

  getDate(date) {
    return new Date(date);
  }

  constructor() {}

  ngOnInit() {}
}
