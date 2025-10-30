import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
  ChangeDetectorRef
} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

export interface Project {
  title: string;
  image: string;
  category: string[];
  link: string;
  readme: string;
  features: string[];
  techStack: string[];
}

@Component({
  selector: 'app-projects',
  imports: [NgForOf, NgClass, TranslatePipe, NgIf],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit {

  @ViewChildren('projects') projectList!: QueryList<ElementRef>;

  selectedProject: Project | null = null;

  projects: Project[] = [
      {
      title: 'M4li-Finance Smart Money Tracker',
      image: 'https://spacema-dev.com/elevate/assets/images/portfolio-3.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev', 'PROJECTS.filter-Branding'],
      link: 'https://m4li-finance.web.app/',
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
      image: 'https://spacema-dev.com/elevate/assets/images/portfolio-2.png',
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
      image: 'https://spacema-dev.com/elevate/assets/images/portfolio-5.png',
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

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.observeProjects();
  }

  selectProject(project: Project, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.selectedProject === project) {
      this.selectedProject = null;
    } else {
      this.selectedProject = project;
    }
  }

  isProjectSelected(project: Project): boolean {
    return this.selectedProject === project;
  }

  visitProject(link: string, event: Event): void {
    event.stopPropagation();
    window.open(link, '_blank');
  }

  closeDetails(): void {
    this.selectedProject = null;
  }

  filterProjects(category: string): void {
    this.selectedProject = null;
    
    if (category === 'All') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.category.includes(category)
      );
    }

    this.cdr.detectChanges();

    setTimeout(() => {
      this.observeProjects();
    });
  }

  observeProjects() {
    this.projectList.forEach((project, i) => {
      const el = project.nativeElement;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.removeClass(el, 'opacity-0');
              this.renderer.removeClass(el, i % 2 === 0 ? 'translate-x-[-50px]' : 'translate-x-[50px]');
              this.renderer.addClass(el, i % 2 === 0 ? 'animate-fadeLeft' : 'animate-fadeRight');
            } else {
              this.renderer.removeClass(el, 'animate-fadeLeft');
              this.renderer.removeClass(el, 'animate-fadeRight');
              this.renderer.addClass(el, 'opacity-0');
              this.renderer.addClass(el, i % 2 === 0 ? 'translate-x-[-50px]' : 'translate-x-[50px]');
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
    });
  }
}