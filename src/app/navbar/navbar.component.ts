import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {
  brandLetters = 'Rahimov'.split('');
  isScrolled = false;
  isMenuOpen = false;

  currentLang = 'de';
  showLangDropdown = false;

  @ViewChild('mobileNav') mobileNavRef!: ElementRef<HTMLElement>;

  private rafId: number | null = null;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'de', 'ru']);
    this.translate.setDefaultLang('de');

    const browserLang = this.translate.getBrowserLang();
    this.currentLang = this.translate.currentLang || (browserLang?.match(/en|de|ru/) ? browserLang : 'en');
    this.translate.use(browserLang?.match(/en|de|ru/) ? browserLang : 'en');
  }

  ngOnDestroy(): void {
    this.unlockScroll();
  }

  toggleNav(): void {
    this.isMenuOpen ? this.closeNav() : this.openNav();
  }

  openNav(): void {
    this.isMenuOpen = true;
    this.lockScroll();
  }

  closeNav(): void {
    this.isMenuOpen = false;
    this.unlockScroll();
  }

  switchLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    this.showLangDropdown = false;
  }

  toggleLanguageDropdown(): void {
    this.showLangDropdown = !this.showLangDropdown;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.rafId !== null) return;
    this.rafId = window.requestAnimationFrame(() => {
      this.isScrolled = window.scrollY > 12;
      this.rafId = null;
    });
  }

  @HostListener('window:keydown.escape')
  onEsc(): void {
    if (this.isMenuOpen) this.closeNav();
    if (this.showLangDropdown) this.showLangDropdown = false;
  }

  onOverlayClick(): void {
    this.closeNav();
  }

  private lockScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    document.body.style.overflow = '';
  }
}
