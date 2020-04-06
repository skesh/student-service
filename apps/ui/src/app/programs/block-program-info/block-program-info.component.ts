import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Program } from './../../shared/interfaces/program.interface';

@Component({
  selector: 'app-block-program-info',
  templateUrl: './block-program-info.component.html',
  styleUrls: ['./block-program-info.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BlockProgramInfoComponent implements OnInit {
  @Input() program: Program;
  isExpanded = false;

  constructor() {}

  ngOnInit() {}
}
