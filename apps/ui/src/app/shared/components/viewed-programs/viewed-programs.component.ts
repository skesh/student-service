import { Component, Input } from '@angular/core';
import { Program } from '../../interfaces/program.interface';

@Component({
  selector: 'app-viewed-programs',
  templateUrl: './viewed-programs.component.html',
  styleUrls: ['./viewed-programs.component.scss']
})
export class ViewedProgramsComponent {
  @Input() programs: Program[] = [];
}
