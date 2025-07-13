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

  projects: Project[] = [
    {
      title: 'ThreeJS 3D Portfolio',
      image: 'assets/portfolio.jpeg',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev'],
      link: 'https://rahimovm4li.github.io/about_me/',
    },
    {
      title: 'InnoTech Web App',
      image: 'assets/innotech.png',
      category: ['PROJECTS.filter-Ecomm'],
      link: 'https://innotechweb-m4li.web.app/',
    },
    {
      title: 'Toj Style real Store in TJk',
      image: 'assets/tojstyle.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-Branding'],
      link: 'https://toj-style.web.app/',
    },
    {
      title: 'Portfolio 2.0',
      image: 'assets/protfoliov2.png',
      category: ['PROJECTS.filter-WedDesign', 'PROJECTS.filter-WedDev'],
      link: 'https://m4li-portfolio.web.app/',
    },
    {
      title: 'Awesome Project 5',
      image: 'https://spacema-dev.com/elevate/assets/images/portfolio-2.png',
      category: ['PROJECTS.releasePlanned'],
      link: '/',
    },
    {
      title: 'Awesome Project 6',
      image: 'https://spacema-dev.com/elevate/assets/images/portfolio-5.png',
      category: ['PROJECTS.releasePlanned'],
      link: '/',
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

  filterProjects(category: string): void {
    if (category === 'All') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.category.includes(category)
      );
    }


    this.cdr.detectChanges(); // Erzwingt DOM-Update

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
