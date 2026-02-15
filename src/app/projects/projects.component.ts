import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import VanillaTilt from 'vanilla-tilt';
import { Subscription } from 'rxjs';
import { ProjectCaseDialogComponent } from './project-case-dialog.component';

export interface Project {
  title: string;
  image: string;
  category: string[];
  link: string;
  readme: string;
  features: string[];
  techStack: string[];
  github?: string;
}

@Component({
  selector: 'app-projects',
  imports: [NgForOf, NgIf, TranslatePipe, MatDialogModule],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrls: ['./projects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          animate('180ms ease-out', style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef<HTMLElement>>;

  filters = [
    { key: 'All', label: 'PROJECTS.filter-all' },
    { key: 'PROJECTS.filter-WedDesign', label: 'PROJECTS.filter-WedDesign' },
    { key: 'PROJECTS.filter-Ecomm', label: 'PROJECTS.filter-Ecomm' },
    { key: 'PROJECTS.filter-Branding', label: 'PROJECTS.filter-Branding' }
  ];
  activeFilter = 'All';

  projects: Project[] = [
    {
      title: 'M4li-Coach Exam Preparation Platform',
      image: 'assets/mockup-coach-m4li.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev', 'PROJECTS.filter-Branding'],
      link: 'https://roadmap.m4li.de/',
      readme: 'exam platform for aprentices in Germany. This platform offers comprehensive resources, interactive features to help apprentices prepare effectively for their exams "Abschl\u00fc\u00dfpr\u00fcfung Teil 1" and succeed in their careers.',
      features: [
        'Responsive design across all devices',
        'chacklist for exam preparation',
        'priority-based study planner',
        '1700+ flashcards for key concepts',
        'smart Spaced Repetition System (SRS) for efficient learning',
        'examsimulation with real-time feedback',
        'Smooth animations and transitions'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'PWA', 'IndexedDB', 'i18next']
    },
    {
      title: 'M4li-Roadmap',
      image: 'assets/mockup-roadmap-m4li.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev', 'PROJECTS.filter-Branding'],
      link: 'https://roadmap.m4li.de/',
      readme: 'For Tajik People who want to study and work in Germany. This roadmap provides comprehensive guidance on the necessary steps, requirements, and resources for Tajik individuals aspiring to pursue education and employment opportunities in Germany.',
      features: [
        'Responsive design across all devices',
        'Multi-language support',
        'Interactive roadmap with step-by-step guidance',
        'Resource links and downloadable guides',
        'planning and checklist features',
        'faq section for common questions',
        'comment feature for user interaction',
        'Smooth animations and transitions'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Supabase', 'i18next']
    },
    {
      title: 'M4li-Fit Smart Gym Tracker',
      image: 'assets/mockup-fit-m4li.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev', 'PROJECTS.filter-Branding'],
      link: 'https://fit.m4li.de/',
      readme: 'Gym tracker web app with interactive workout catalog, progress tracking, and motivational features for fitness enthusiasts.',
      features: [
        'Responsive design across all devices',
        'Multi-language support',
        'Interactive workout catalog',
        'repetition counter',
        'charting and progress tracking',
        'motivational quotes and tips',
        'Smooth animations and transitions'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'PWA', 'i18next']
    },
    {
      title: 'M4li-Finance Smart Money Tracker',
      image: 'assets/mockup-finance-m4li.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev', 'PROJECTS.filter-Branding'],
      link: 'https://finance.m4li.de/',
      readme: 'Modern Smart Money Tracker with interactive elements and multilingual support.',
      features: [
        'Responsive design across all devices',
        'Multi-language support',
        'Interactive charts catalog',
        'Smooth animations and transitions'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'PWA', 'i18next']
    },
    {
      title: 'Landing Page for Language School',
      image: 'assets/mockup-lang-school.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev', 'PROJECTS.filter-Branding'],
      link: 'https://polyglot-tj.web.app/',
      readme: 'Landing page for a language school with interactive elements andResponsive design.',
      features: [
        'Responsive design across all devices',
        'Multi-language support',
        'Interactive course catalog',
        'Contact form integration',
        'Smooth animations and transitions'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'i18next']
    },
    {
      title: 'Pharmacy Landing Page',
      image: 'assets/mockup-pharmacy.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev', 'PROJECTS.filter-Branding'],
      link: 'https://dar-dar-tj.web.app/',
      readme: 'Professional pharmacy website with Contact Informations and online consultation features.',
      features: [
        'Online consultation booking',
        'Medicine information',
        'Location-based pharmacy finder',
        'Whatsapp integration for quick contact'
      ],
      techStack: ['React', 'i18next', 'TypeScript', 'Tailwind CSS']
    },
    {
      title: 'ThreeJS 3D Portfolio',
      image: 'assets/portfolio.jpeg',
      category: ['PROJECTS.filter-WedDesign'],
      link: 'https://rahimovm4li.github.io/about_me/',
      readme: 'Interactive 3D portfolio showcasing creative web development skills with immersive user experience.',
      features: [
        '3D interactive elements',
        'Particle effects',
        'Smooth camera animations',
        'Custom shaders',
        '3D tilting effects'
      ],
      techStack: ['Three.js', 'JavaScript', 'WebGL', 'HTML5', 'CSS3', 'tilt.js']
    },
    {
      title: 'InnoTech Web App',
      image: 'assets/innotech.png',
      category: ['PROJECTS.filter-Ecomm'],
      link: 'https://innotechweb-m4li.web.app/',
      readme: 'Full-featured e-commerce platform for technology products with advanced filtering and checkout.',
      features: [
        'Product catalog with advanced filters',
        'Shopping cart functionality',
        'Secure checkout process',
        'User authentication',
        'Order tracking system'
      ],
      techStack: ['Angular', 'REST API', 'JSON Fake Backend', 'Tailwind CSS']
    },
    {
      title: 'Toj Style real Store in TJk',
      image: 'assets/tojstyle.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-Branding'],
      link: 'https://toj-style.web.app/',
      readme: 'Modern e-commerce website for fashion retail store featuring local Tajik designs and styles.',
      features: [
        'Product showcase with image galleries',
        'Size and color selection',
        'Wishlist functionality',
        'Brand storytelling section',
        'Social media integration'
      ],
      techStack: ['Angular', 'REST API', 'JSON Fake Backend', 'Tailwind CSS']
    },
    {
      title: 'Portfolio 2.0',
      image: 'assets/protfoliov2.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev'],
      link: 'https://m4li-portfolio.web.app/',
      readme: 'Personal portfolio website showcasing web development projects and skills with modern design.',
      features: [
        'Project showcase with filtering',
        'Skills visualization',
        'Contact form',
        'Blog integration',
        'Smooth animations and transitions'
      ],
      techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'Hosting/Deployment']
    }
  ];
  filteredProjects: Project[] = [...this.projects];

  private tiltInstances: Array<{ destroy: () => void }> = [];
  private cardsSubscription?: Subscription;

  constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.applyCardEffects();

    this.cardsSubscription = this.projectCards.changes.subscribe(() => {
      this.applyCardEffects();
    });
  }

  ngOnDestroy(): void {
    this.cardsSubscription?.unsubscribe();
    this.destroyTilt();
  }

  trackByTitle(_: number, project: Project): string {
    return project.title;
  }

  filterProjects(category: string): void {
    this.activeFilter = category;

    if (category === 'All') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => project.category.includes(category));
    }

    this.cdr.detectChanges();
  }

  openLink(url: string | undefined, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!url) {
      return;
    }

    window.open(url, '_blank', 'noopener');
  }

  openCaseStudy(project: Project, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.dialog.open(ProjectCaseDialogComponent, {
      data: project,
      panelClass: 'case-dialog',
      backdropClass: 'case-backdrop',
      maxWidth: '720px'
    });
  }

  private applyCardEffects(): void {
    this.destroyTilt();

    const cards = this.projectCards.toArray().map(card => card.nativeElement);
    if (!cards.length) {
      return;
    }

    this.initTilt(cards);
    this.resetCardStyles(cards);
  }

  private initTilt(cards: HTMLElement[]): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 1024) {
      return;
    }

    VanillaTilt.init(cards, {
      max: 8,
      speed: 600,
      scale: 1.02,
      glare: true,
      'max-glare': 0.18
    });

    this.tiltInstances = cards
      .map(card => (card as unknown as { vanillaTilt?: { destroy: () => void } }).vanillaTilt)
      .filter((tilt): tilt is { destroy: () => void } => Boolean(tilt));
  }

  private destroyTilt(): void {
    this.tiltInstances.forEach(tilt => tilt.destroy());
    this.tiltInstances = [];
  }

  private resetCardStyles(cards: HTMLElement[]): void {
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  }
}
