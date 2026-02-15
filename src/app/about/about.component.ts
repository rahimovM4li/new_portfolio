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
        { name: 'HTML | CSS | JS', percent: 89, color: '#22C55E' },
    { name: 'AI & Prompt Engineering | Spec-Driven Development', percent: 80, color: '#d20000' },
    { name: 'Angular', percent: 66, color: '#3822c5' },
    { name: 'REST API', percent: 60, color: '#3B82F6' },
    { name: 'React', percent: 45, color: '#0a2081' },
    { name: 'AWS', percent: 35, color: '#9413a5' },
    { name: 'ThreeJS', percent: 35, color: '#8B5CF6' },
    { name: 'Java | Spring Boot', percent: 55, color: '#E879F9' },
    { name: 'PostgreSQL', percent: 45, color: '#073d12' },
    { name: 'Jira', percent: 80, color: '#e76f0d' },
    { name: 'Git, Github, Fork', percent: 45, color: '#e7d10d' },
  ];

  typewriterTexts: string[] = [];
  funFacts: any[] = [];
  whatIDoItems:any[] = [];
  inView: boolean[] = [];
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
          console.log(items)
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
    this.observeFunCards(); // Initial
    this.cards.changes.subscribe(() => {
      this.observeFunCards(); // Auch bei Änderungen z. B. durch Sprachwechsel
    });

    // "Was ich mache" Karten Animation
    setTimeout(() => {
      this.doCards.forEach((card, i) => {
        const el = card.nativeElement;
        const isEven = i % 2 === 0;
        const translateClass = isEven ? '-translate-x-12' : 'translate-x-12';
        const animationClass = isEven ? 'animate-fadeLeft' : 'animate-fadeRight';

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.inView[i] = true;
                this.renderer.removeClass(el, 'opacity-0');
                this.renderer.removeClass(el, translateClass);
                this.renderer.addClass(el, animationClass);
              } else {
                this.renderer.removeClass(el, animationClass);
                this.renderer.addClass(el, 'opacity-0');
                this.renderer.addClass(el, translateClass);
              }
            });
          },
          { threshold: 0.2 }
        );

        observer.observe(el);
      });
    });
  }

  observeFunCards() {
    setTimeout(() => {
      this.cards.forEach((card) => {
        const el = card.nativeElement;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(el, 'animate-fadeUp');
                this.renderer.removeClass(el, 'opacity-0');
                this.renderer.removeClass(el, 'translate-y-5');
                observer.unobserve(el); // Optional: nur einmal animieren
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
    });
  }

  startTypewriter(): void {
    const currentWord = this.typewriterTexts[this.twIndex];

    this.twCharIndex++;
    this.currentTypedText = currentWord.substring(0, this.twCharIndex);

    // Wenn das aktuelle Wort fertig getippt ist
    if (this.twCharIndex === currentWord.length) {
      // Prüfen, ob es das letzte Wort war
      if (this.twIndex >= this.typewriterTexts.length - 1) {
        return;
      } else {
        this.twIndex++;
        this.twCharIndex = 0;
        setTimeout(() => this.startTypewriter(), 1000); // kurze Pause zwischen Wörtern
        return;
      }
    }

    const delay = 50;
    setTimeout(() => this.startTypewriter(), delay);
  }

}
