import { ModuleWithProviders, NgModule } from '@angular/core';
import { AfsService } from './afs.service';
import { CurrencyService } from './currency.service';
import { FileDataService } from './file-data.service';
import { ScrollToTopService } from './scroll-to-top.service';
import { TimeService } from './time.service';

const services = [FileDataService, CurrencyService, AfsService, TimeService, ScrollToTopService];

@NgModule({})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [...services]
    };
  }
}

export { services };
