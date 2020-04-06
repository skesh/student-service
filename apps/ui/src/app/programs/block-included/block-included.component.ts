import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-included',
  templateUrl: './block-included.component.html',
  styleUrls: ['./block-included.component.scss']
})
export class BlockIncludedComponent implements OnInit {
  @Input() includes: {name: string}[] = [];

  constructor() {}

  ngOnInit() {}
}
