import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BlockAdvantagesComponent } from './block-advantages/block-advantages.component';
import { BlockBannersComponent } from './block-banners/block-banners.component';
import { BlockMainImageComponent } from './block-main-image/block-main-image.component';
import { SwiperComponent } from './block-main-image/swiper/swiper.component';
import { BlockMapComponent } from './block-map/block-map.component';
import { MainRoutingModule } from './main-routing.module';
import { PageMainComponent } from './page-main/page-main.component';

@NgModule({
  declarations: [
    PageMainComponent,
    BlockMainImageComponent,
    BlockMapComponent,
    BlockAdvantagesComponent,
    BlockBannersComponent,
    SwiperComponent,
  ],
  exports: [BlockAdvantagesComponent],
  imports: [SharedModule, MainRoutingModule],
})
export class MainModule {}
