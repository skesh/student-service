import { Component, Input, OnInit } from '@angular/core';
import { Program } from '../../interfaces/program.interface';

@Component({
  selector: 'app-programs-grid',
  templateUrl: './programs-grid.component.html',
  styleUrls: ['./programs-grid.component.scss']
})
export class ProgramsGridComponent implements OnInit {
  @Input() programs: Program[] = [];

  constructor() {}

  ngOnInit() {}
}
