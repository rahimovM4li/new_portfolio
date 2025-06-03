import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  openNav(): void {
    const nav = document.getElementById('mobile-nav');
    const openBtn = document.getElementById('nav__toggle-open');
    const closeBtn = document.getElementById('nav__toggle-close');

    nav?.classList.remove('hidden');
    openBtn?.classList.add('hidden');
    closeBtn?.classList.remove('hidden');
  }

  closeNav(): void {
    const nav = document.getElementById('mobile-nav');
    const openBtn = document.getElementById('nav__toggle-open');
    const closeBtn = document.getElementById('nav__toggle-close');

    nav?.classList.add('hidden');
    openBtn?.classList.remove('hidden');
    closeBtn?.classList.add('hidden');
  }

  currentLang = 'de';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'de', 'ru']);
    this.translate.setDefaultLang('de');

    const browserLang = this.translate.getBrowserLang();
    this.currentLang = this.translate.currentLang || (browserLang?.match(/en|de|ru/) ? browserLang : 'en');

    this.translate.use(browserLang?.match(/en|de|ru/) ? browserLang : 'en');
  }

  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    this.showLangDropdown = !this.showLangDropdown;
  }

  showLangDropdown = false;

  toggleLanguageDropdown() {
    this.showLangDropdown = !this.showLangDropdown;
  }
}
