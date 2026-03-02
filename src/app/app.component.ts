import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SeoService } from './services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my_portfolio_3d';
  private subscriptions: Subscription[] = [];
  private currentRoute = '/';
  private currentLang = 'de';
  private readonly supportedLangs = ['de', 'en', 'ru'];

  constructor(
    private seoService: SeoService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Subscribe to route changes
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => {
          this.updateFromRoute();
        })
    );

    // Initial update
    this.updateFromRoute();
  }

  private updateFromRoute(): void {
    // Get the lang param from the first route segment
    let currentRoute = this.router.routerState.root;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const lang = currentRoute.snapshot.params['lang'];
    
    // Validate and use language
    if (lang && this.supportedLangs.includes(lang)) {
      this.currentLang = lang;
      this.translate.use(lang);
    } else {
      // Fallback to German if invalid
      this.currentLang = 'de';
      this.translate.use('de');
    }

    // Get route path without lang prefix
    const url = this.router.url;
    const pathWithoutLang = url.replace(/^\/(de|en|ru)(\/|$)/, '/').replace(/^\//, '');
    this.currentRoute = pathWithoutLang || '/';

    // Update SEO
    this.seoService.updateMeta(this.currentRoute, this.currentLang);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
