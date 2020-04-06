import { Component, Input, OnInit } from '@angular/core';
import { Program } from '../../interfaces/program.interface';

@Component({
  selector: 'app-block-programs',
  templateUrl: './block-programs.component.html',
  styleUrls: ['./block-programs.component.scss']
})
export class BlockProgramsComponent implements OnInit {
  @Input() programs: Program[] = [];
  isCompact = true;
  page = 0;

  get pages(): number {
    return Math.ceil(this.programs.length / 4);
  }

  get pagesArray(): number[] {
    const array = Array.from(Array(this.pages).keys());
    return array;
  }

  get programsGrid() {
    const array = [];
    for (const page of this.pagesArray) {
      const shape = this.programs.slice(page * 4, (page + 1) * 4);
      array.push(shape);
    }
    return array;
  }

  get programsOnCurrentPage(): Program[] {
    return this.programsGrid[this.page];
  }

  constructor() {}

  toggleShowAllHotPrograms = () => (this.isCompact = !this.isCompact);

  ngOnInit() {}
}
