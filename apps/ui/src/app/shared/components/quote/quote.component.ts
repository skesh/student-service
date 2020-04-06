import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnChanges {
  @Input() text: string;
  @Input() maxLength = 180;
  compact = false;

  get isLong() {
    return this.text.length > this.maxLength;
  }

  toggle = () => (this.compact = !this.compact);

  ngOnChanges() {
    this.compact = this.isLong ? true : false;
  }
}
