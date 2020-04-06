import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-plan',
  templateUrl: './block-plan.component.html',
  styleUrls: ['./block-plan.component.scss']
})
export class BlockPlanComponent implements OnInit {
  @Input() excursions: {week: number; title: string; description: string}[];

  constructor() {}

  ngOnInit() {}
}
