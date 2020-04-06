import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-banners',
  templateUrl: './block-banners.component.html',
  styleUrls: ['./block-banners.component.scss']
})
export class BlockBannersComponent implements OnInit {
  @Input() banners: string[];
  bannerActive: string;

  ngOnInit() {
    this.bannerActive = this.banners[0];
  }

  set(url: string) {
    this.bannerActive = url;
  }
}
