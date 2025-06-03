import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './about.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit, OnInit {


  skills = [
    { name: 'KI & Prompt Engineering', percent: 75, color: '#d20000' },
    { name: 'HTML | CSS | JS', percent: 66, color: '#22C55E' },
    { name: 'REST API', percent: 60, color: '#3822c5' },
    { name: 'Angular', percent: 55, color: '#3B82F6' },
    { name: 'Jira', percent: 50, color: '#e76f0d' },
    { name: 'Git, Github, Fork', percent: 45, color: '#e7d10d' },
    { name: 'ThreeJS', percent: 35, color: '#8B5CF6' },
    { name: 'Java | Spring Boot', percent: 35, color: '#E879F9' },
  ];

  typewriterTexts: string[] = [];
  funFacts: any[] = [];
  whatIDoItems:any[] = [];
  currentTypedText: string = "";
  private twIndex: number = 0;
  private twCharIndex: number = 0;
  private isDeleting: boolean = false;

  // Referenzen auf DOM-Elemente
  @ViewChildren('progressBar') progressBars!: QueryList<ElementRef>;
  @ViewChildren('funCard') cards!: QueryList<ElementRef>;
  @ViewChildren('doCard') doCards!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2, private translate: TranslateService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    const reloadTexts = () => {
      this.translate.stream('ABOUT.typewriterTexts').subscribe((texts: string[]) => {
        if (Array.isArray(texts)) {
          this.typewriterTexts = texts;
          this.currentTypedText = '';
          this.twCharIndex = 0;
          this.isDeleting = false;

          if (this.typewriterTexts.length > 0) {
            this.startTypewriter();
          }
        }
      });

      this.translate.stream('ABOUT.funFacts').subscribe((facts: any[]) => {
        if (Array.isArray(facts)) {
          this.funFacts = facts;
          this.cdRef.detectChanges();
        }
      });

      this.translate.stream('ABOUT.whatIDoItems').subscribe((items: any[]) => {
        if (Array.isArray(items)) {
          this.whatIDoItems = items;
          this.cdRef.detectChanges();
        }
      });
    };

    reloadTexts();

    this.translate.onLangChange.subscribe(() => {
      reloadTexts();
    });
  }


  ngAfterViewInit(): void {
    // Skills Fortschrittsbalken Animation bei Sichtbarkeit
    this.progressBars.forEach((elRef, index) => {
      const progressBar = elRef.nativeElement;
      const skill = this.skills[index];

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Balken füllen mit Prozent und Farbe
              this.renderer.setStyle(progressBar, 'width', skill.percent + '%');
              this.renderer.setStyle(progressBar, 'background-color', skill.color);
            } else {
              // Balken zurücksetzen
              this.renderer.setStyle(progressBar, 'width', '0%');
            }
          });
        },
        { threshold: 0.4 }
      );

      observer.observe(progressBar);
    });

    // Fun Facts Animation beim Scrollen
    this.cards.forEach((card) => {
      const el = card.nativeElement;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(el, 'animate-fadeUp');
              this.renderer.removeClass(el, 'opacity-0');
              this.renderer.removeClass(el, 'translate-y-5');
            } else {
              this.renderer.removeClass(el, 'animate-fadeUp');
              this.renderer.addClass(el, 'opacity-0');
              this.renderer.addClass(el, 'translate-y-5');
            }
          });
        },
        { threshold: 0.8 }
      );

      observer.observe(el);
    });

    // "Was ich mache" Karten Animation
    this.doCards.forEach((card, i) => {
      const el = card.nativeElement;

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

  startTypewriter(): void {
    const currentWord = this.typewriterTexts[this.twIndex];

    if (!this.isDeleting) {
      this.twCharIndex++;
      this.currentTypedText = currentWord.substring(0, this.twCharIndex);
      if (this.twCharIndex === currentWord.length) {
        this.isDeleting = true;
      }
    } else {
      this.twCharIndex--;
      this.currentTypedText = currentWord.substring(0, this.twCharIndex);
      if (this.twCharIndex === 0) {
        this.isDeleting = false;
        this.twIndex = (this.twIndex + 1) % this.typewriterTexts.length;
      }
    }


    const delay = this.isDeleting ? 50 : 33;
    setTimeout(() => this.startTypewriter(), delay);
  }

}
