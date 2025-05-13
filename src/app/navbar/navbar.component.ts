import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
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
}
