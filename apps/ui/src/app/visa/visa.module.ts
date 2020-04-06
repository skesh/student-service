import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BlockPriceComponent } from './block-price/block-price.component';
import { PageVisaComponent } from './page-visa/page-visa.component';
import { PdfLinkComponent } from './pdf-link/pdf-link.component';
import { VisaRoutingModule } from './visa-routing.module';

@NgModule({
  declarations: [PageVisaComponent, BlockPriceComponent, PdfLinkComponent],
  imports: [SharedModule, VisaRoutingModule],
})
export class VisaModule {}
