import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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

  constructor(
    private seoService: SeoService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(event => {
          this.currentRoute = event.urlAfterRedirects || '/';
          this.seoService.updateMeta(
            this.currentRoute.replace(/^\//, ''),
            this.translate.currentLang || 'de'
          );
        })
    );

    this.subscriptions.push(
      this.translate.onLangChange.subscribe(event => {
        this.seoService.updateMeta(
          this.currentRoute.replace(/^\//, ''),
          event.lang
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
