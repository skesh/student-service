import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  @Input() color: 'grey' | 'white' | 'dark' | 'black' = 'white';
  @Input() title: string;
  @Input() thinTitle = true;
  @Input() titlePosition: 'center' | 'left' | 'right' = 'center';
  @HostBinding('style.background-color') bgColor: SafeStyle;

  colors = {
    white: 'var(--color-white)',
    grey: 'var(--color-white-dark)',
    dark: 'var(--color-blue-deep)',
    black: 'var(--color-blue-dark)',
  };

  get currentColor() {
    return this.colors[this.color];
  }

  get isDark() {
    return this.color === 'dark' || this.color === 'black';
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.bgColor = this.sanitizer.bypassSecurityTrustStyle(this.currentColor);
  }
}
