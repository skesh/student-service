import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  setScrollTop() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event: NavigationEnd) => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      });
    }
  }
}
