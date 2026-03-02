import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

interface RouteSeoConfig {
  [lang: string]: PageMeta;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private renderer: Renderer2;
  private readonly baseUrl = 'https://m4li.de';
  private readonly ogImage = 'https://m4li.de/assets/myPic.jpg';
  private readonly supportedLangs = ['de', 'en', 'ru'];

  private readonly routeMeta: { [route: string]: RouteSeoConfig } = {
    '/': {
      de: {
        title: 'M4LI | Muhammadali Rahimov – Full-Stack Entwickler Deutschland',
        description: 'Muhammadali Rahimov – Full-Stack Entwickler aus Deutschland. Spezialisiert auf Angular, React, Java Spring Boot, Web3 & skalierbare Webanwendungen. Jetzt Projekt starten!',
        ogTitle: 'M4LI | Muhammadali Rahimov – Full-Stack Entwickler Deutschland',
        ogDescription: 'Full-Stack Entwickler aus Deutschland – Angular, React, Java Spring Boot, Web3. Moderne Webanwendungen & skalierbare Lösungen.'
      },
      en: {
        title: 'M4LI | Muhammadali Rahimov – Full-Stack Developer Germany',
        description: 'Muhammadali Rahimov – Full-Stack Developer based in Germany. Specialized in Angular, React, Java Spring Boot, Web3 & scalable web applications. Start your project today!',
        ogTitle: 'M4LI | Muhammadali Rahimov – Full-Stack Developer Germany',
        ogDescription: 'Full-Stack Developer based in Germany – Angular, React, Java Spring Boot, Web3. Modern web applications & scalable solutions.'
      },
      ru: {
        title: 'M4LI | Мухаммадали Рахимов – Full-Stack Разработчик Германия',
        description: 'Мухаммадали Рахимов – Full-Stack разработчик в Германии. Angular, React, Java Spring Boot, Web3 и масштабируемые веб-приложения. Начните проект сейчас!',
        ogTitle: 'M4LI | Мухаммадали Рахимов – Full-Stack Разработчик Германия',
        ogDescription: 'Full-Stack разработчик в Германии – Angular, React, Java Spring Boot, Web3. Современные веб-приложения и масштабируемые решения.'
      }
    },
    '/about': {
      de: {
        title: 'Über Muhammadali Rahimov | Full-Stack Entwickler & Web3 Experte – M4LI',
        description: 'Erfahren Sie mehr über Muhammadali Rahimov – Full-Stack Entwickler in Deutschland mit Expertise in Angular, Spring Boot, REST APIs und modernem JavaScript.',
        ogTitle: 'Über Muhammadali Rahimov | Full-Stack Entwickler – M4LI',
        ogDescription: 'Full-Stack Entwickler in Deutschland – Angular, Spring Boot, REST APIs. Erfahren Sie mehr über meine Expertise und Projekte.'
      },
      en: {
        title: 'About Muhammadali Rahimov | Full-Stack Developer & Web3 Expert – M4LI',
        description: 'Learn more about Muhammadali Rahimov – Full-Stack Developer in Germany with expertise in Angular, Spring Boot, REST APIs and modern JavaScript frameworks.',
        ogTitle: 'About Muhammadali Rahimov | Full-Stack Developer – M4LI',
        ogDescription: 'Full-Stack Developer in Germany – Angular, Spring Boot, REST APIs. Learn more about my expertise and projects.'
      },
      ru: {
        title: 'О Мухаммадали Рахимове | Full-Stack Разработчик и Web3 Эксперт – M4LI',
        description: 'Узнайте больше о Мухаммадали Рахимове – Full-Stack разработчике в Германии. Angular, Spring Boot, REST API и современные JavaScript фреймворки.',
        ogTitle: 'О Мухаммадали Рахимове | Full-Stack Разработчик – M4LI',
        ogDescription: 'Full-Stack разработчик в Германии – Angular, Spring Boot, REST API. Узнайте больше о моей экспертизе.'
      }
    },
    '/projects': {
      de: {
        title: 'Projekte von Muhammadali Rahimov | Web-Entwicklung Portfolio – M4LI',
        description: 'Entdecken Sie die Projekte von Muhammadali Rahimov: Angular, React, Three.js, E-Commerce & Web3 Anwendungen. Full-Stack Entwicklung aus Deutschland.',
        ogTitle: 'Projekte | Muhammadali Rahimov – M4LI',
        ogDescription: 'Angular, React, Three.js, E-Commerce & Web3 Projekte. Full-Stack Entwicklung aus Deutschland.'
      },
      en: {
        title: 'Projects by Muhammadali Rahimov | Web Development Portfolio – M4LI',
        description: 'Explore projects by Muhammadali Rahimov: Angular, React, Three.js, E-Commerce & Web3 applications. Full-Stack development from Germany.',
        ogTitle: 'Projects | Muhammadali Rahimov – M4LI',
        ogDescription: 'Angular, React, Three.js, E-Commerce & Web3 projects. Full-Stack development from Germany.'
      },
      ru: {
        title: 'Проекты Мухаммадали Рахимова | Портфолио веб-разработки – M4LI',
        description: 'Откройте проекты Мухаммадали Рахимова: Angular, React, Three.js, E-Commerce и Web3 приложения. Full-Stack разработка из Германии.',
        ogTitle: 'Проекты | Мухаммадали Рахимов – M4LI',
        ogDescription: 'Angular, React, Three.js, E-Commerce и Web3 проекты. Full-Stack разработка из Германии.'
      }
    },
    '/contact': {
      de: {
        title: 'Kontakt – Muhammadali Rahimov | Full-Stack Entwickler beauftragen – M4LI',
        description: 'Kontaktieren Sie Muhammadali Rahimov für Ihr nächstes Webprojekt. Full-Stack Entwicklung, Web3, Angular & Spring Boot. Kostenlose Erstberatung aus Deutschland.',
        ogTitle: 'Kontakt | Muhammadali Rahimov – M4LI',
        ogDescription: 'Full-Stack Entwicklung, Web3, Angular & Spring Boot. Kostenlose Erstberatung aus Deutschland.'
      },
      en: {
        title: 'Contact – Muhammadali Rahimov | Hire a Full-Stack Developer – M4LI',
        description: 'Contact Muhammadali Rahimov for your next web project. Full-Stack development, Web3, Angular & Spring Boot. Free initial consultation from Germany.',
        ogTitle: 'Contact | Muhammadali Rahimov – M4LI',
        ogDescription: 'Full-Stack development, Web3, Angular & Spring Boot. Free initial consultation from Germany.'
      },
      ru: {
        title: 'Контакты – Мухаммадали Рахимов | Нанять Full-Stack Разработчика – M4LI',
        description: 'Свяжитесь с Мухаммадали Рахимовым для вашего веб-проекта. Full-Stack разработка, Web3, Angular и Spring Boot. Бесплатная консультация из Германии.',
        ogTitle: 'Контакты | Мухаммадали Рахимов – M4LI',
        ogDescription: 'Full-Stack разработка, Web3, Angular и Spring Boot. Бесплатная консультация из Германии.'
      }
    }
  };

  private readonly routeNames: { [route: string]: { [lang: string]: string } } = {
    '/': { de: 'Startseite', en: 'Home', ru: 'Главная' },
    '/about': { de: 'Über mich', en: 'About', ru: 'Обо мне' },
    '/projects': { de: 'Projekte', en: 'Projects', ru: 'Проекты' },
    '/contact': { de: 'Kontakt', en: 'Contact', ru: 'Контакты' }
  };

  constructor(
    private titleService: Title,
    private meta: Meta,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateMeta(route: string, lang: string): void {
    const normalizedRoute = route === '' ? '/' : `/${route}`;
    const config = this.routeMeta[normalizedRoute]?.[lang]
      || this.routeMeta[normalizedRoute]?.['de']
      || this.routeMeta['/']?.[lang]
      || this.routeMeta['/']['de'];

    this.titleService.setTitle(config.title);
    this.updateMetaTag('description', config.description);
    this.updateHtmlLang(lang);
    this.updateCanonical(normalizedRoute);
    this.updateHreflang(normalizedRoute);
    this.updateOpenGraph(config, normalizedRoute);
    this.updateTwitterCard(config);
    this.updateJsonLd(normalizedRoute, lang);
  }

  private updateMetaTag(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private updateHtmlLang(lang: string): void {
    this.doc.documentElement.lang = lang;
  }

  private updateCanonical(route: string): void {
    const url = route === '/' ? this.baseUrl + '/' : `${this.baseUrl}${route}`;
    let link = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (link) {
      link.href = url;
    } else {
      link = this.renderer.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.doc.head.appendChild(link);
    }
  }

  private updateHreflang(route: string): void {
    const existingLinks = this.doc.querySelectorAll('link[hreflang]');
    existingLinks.forEach(el => el.remove());

    const url = route === '/' ? this.baseUrl + '/' : `${this.baseUrl}${route}`;

    [...this.supportedLangs, 'x-default'].forEach(hreflang => {
      const link = this.renderer.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', url);
      this.doc.head.appendChild(link);
    });
  }

  private updateOpenGraph(config: PageMeta, route: string): void {
    const url = route === '/' ? this.baseUrl + '/' : `${this.baseUrl}${route}`;
    this.meta.updateTag({ property: 'og:title', content: config.ogTitle });
    this.meta.updateTag({ property: 'og:description', content: config.ogDescription });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: this.ogImage });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'M4LI – Muhammadali Rahimov' });
  }

  private updateTwitterCard(config: PageMeta): void {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.ogDescription });
    this.meta.updateTag({ name: 'twitter:image', content: this.ogImage });
  }

  private updateJsonLd(route: string, lang: string): void {
    const existing = this.doc.querySelectorAll('script[type="application/ld+json"]');
    existing.forEach(el => el.remove());

    const schemas: object[] = [];

    schemas.push(this.getPersonSchema());
    schemas.push(this.getBreadcrumbSchema(route, lang));

    if (route === '/') {
      schemas.push(this.getWebSiteSchema());
      schemas.push(this.getOrganizationSchema());
      schemas.push(...this.getServiceSchemas());
      schemas.push(this.getFaqSchema(lang));
    }

    if (route === '/about') {
      schemas.push(...this.getServiceSchemas());
    }

    schemas.forEach(schema => {
      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.doc.head.appendChild(script);
    });
  }

  private getPersonSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Muhammadali Rahimov',
      'alternateName': 'M4LI',
      'url': this.baseUrl,
      'image': this.ogImage,
      'jobTitle': 'Full-Stack Developer',
      'worksFor': {
        '@type': 'Organization',
        'name': 'M4LI'
      },
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'DE',
        'addressRegion': 'Germany'
      },
      'email': 'rahimov.muhammadali1704@gmail.com',
      'sameAs': [
        'https://github.com/rahimovM4li',
        'https://www.linkedin.com/in/muhammadali-rahimov-3ab2b436b/',
        'https://www.instagram.com/m4li.de/',
        'https://www.youtube.com/@m4li_de'
      ],
      'knowsAbout': [
        'Full-Stack Development',
        'Angular',
        'React',
        'Java Spring Boot',
        'Web3',
        'REST API',
        'Three.js',
        'TypeScript',
        'PostgreSQL',
        'Tailwind CSS'
      ],
      'knowsLanguage': ['de', 'en', 'ru']
    };
  }

  private getWebSiteSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'M4LI – Muhammadali Rahimov Portfolio',
      'url': this.baseUrl,
      'description': 'Portfolio of Muhammadali Rahimov – Full-Stack Developer in Germany',
      'inLanguage': ['de', 'en', 'ru'],
      'author': {
        '@type': 'Person',
        'name': 'Muhammadali Rahimov'
      }
    };
  }

  private getOrganizationSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'M4LI',
      'url': this.baseUrl,
      'logo': `${this.baseUrl}/assets/AliIcon.png`,
      'founder': {
        '@type': 'Person',
        'name': 'Muhammadali Rahimov'
      },
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'DE'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'email': 'rahimov.muhammadali1704@gmail.com',
        'contactType': 'customer service',
        'availableLanguage': ['German', 'English', 'Russian']
      },
      'sameAs': [
        'https://github.com/rahimovM4li',
        'https://www.linkedin.com/in/muhammadali-rahimov-3ab2b436b/',
        'https://www.instagram.com/m4li.de/',
        'https://www.youtube.com/@m4li_de'
      ]
    };
  }

  private getBreadcrumbSchema(route: string, lang: string): object {
    const items: object[] = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': this.routeNames['/']?.[lang] || 'Home',
        'item': this.baseUrl + '/'
      }
    ];

    if (route !== '/') {
      const name = this.routeNames[route]?.[lang] || route.replace('/', '');
      items.push({
        '@type': 'ListItem',
        'position': 2,
        'name': name,
        'item': `${this.baseUrl}${route}`
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items
    };
  }

  private getServiceSchemas(): object[] {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Full-Stack Web Development',
        'provider': {
          '@type': 'Person',
          'name': 'Muhammadali Rahimov',
          'url': this.baseUrl
        },
        'areaServed': {
          '@type': 'Country',
          'name': 'Germany'
        },
        'description': 'Custom web application development with Angular, React, Java Spring Boot, REST APIs and modern cloud technologies.',
        'serviceType': 'Web Development'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Web3 & Blockchain Development',
        'provider': {
          '@type': 'Person',
          'name': 'Muhammadali Rahimov',
          'url': this.baseUrl
        },
        'areaServed': {
          '@type': 'Country',
          'name': 'Germany'
        },
        'description': 'Decentralized application development, smart contracts and blockchain integration for future-proof digital solutions.',
        'serviceType': 'Blockchain Development'
      }
    ];
  }

  private getFaqSchema(lang: string): object {
    const faqData: { [key: string]: Array<{ q: string; a: string }> } = {
      de: [
        { q: 'Was macht ein Full-Stack Entwickler?', a: 'Ein Full-Stack Entwickler beherrscht sowohl Frontend als auch Backend – von der Benutzeroberfläche mit Angular oder React bis zur Serverlogik mit Java Spring Boot und Datenbanken. Als Full-Stack Entwickler in Deutschland biete ich die komplette Umsetzung Ihres Webprojekts aus einer Hand.' },
        { q: 'Warum einen Full-Stack Entwickler aus Deutschland beauftragen?', a: 'Ein Entwickler aus Deutschland bietet direkte Kommunikation in Ihrer Zeitzone, Verständnis für den deutschen Markt und DSGVO-konforme Lösungen. Ich arbeite von Deutschland aus und bin jederzeit persönlich erreichbar.' },
        { q: 'Welche Technologien verwendet M4LI?', a: 'Mein Tech-Stack umfasst Angular, React, TypeScript, Java Spring Boot, PostgreSQL, REST-APIs, Three.js, Tailwind CSS, Firebase und Web3-Technologien. Ich wähle die optimale Technologie für jedes Projekt.' },
        { q: 'Was kostet eine Webanwendung?', a: 'Die Kosten hängen vom Projektumfang ab. Eine einfache Website beginnt bei wenigen hundert Euro, komplexe Web-Anwendungen können mehrere tausend kosten. Kontaktieren Sie mich für ein kostenloses Erstgespräch und ein individuelles Angebot.' },
        { q: 'Wie läuft ein Webprojekt mit M4LI ab?', a: 'Jedes Projekt beginnt mit einem kostenlosen Beratungsgespräch. Danach folgen Konzeption, Design, Entwicklung, Testing und Deployment. Ich arbeite agil und halte Sie in jeder Phase auf dem Laufenden.' },
        { q: 'Was ist Web3 Entwicklung?', a: 'Web3 Entwicklung umfasst dezentrale Anwendungen (dApps), Smart Contracts und Blockchain-Integration. Als Web3 Entwickler in Deutschland helfe ich Unternehmen, die Möglichkeiten dezentraler Technologien zu nutzen.' },
        { q: 'Bietet M4LI auch Wartung und Support an?', a: 'Ja, ich biete langfristige Wartung, Updates und technischen Support für alle entwickelten Projekte an. Damit bleibt Ihre Anwendung sicher, performant und auf dem neuesten Stand.' },
        { q: 'In welchen Sprachen ist die Kommunikation möglich?', a: 'Ich kommuniziere fließend auf Deutsch, Englisch und Russisch. Dadurch können wir problemlos zusammenarbeiten, unabhängig von Ihrer bevorzugten Sprache.' }
      ],
      en: [
        { q: 'What does a Full-Stack Developer do?', a: 'A Full-Stack Developer masters both frontend and backend – from user interfaces with Angular or React to server logic with Java Spring Boot and databases. As a Full-Stack Developer in Germany, I deliver your complete web project from a single source.' },
        { q: 'Why hire a Full-Stack Developer from Germany?', a: 'A developer based in Germany offers direct communication in your timezone, understanding of the European market and GDPR-compliant solutions. I work from Germany and am always personally available.' },
        { q: 'What technologies does M4LI use?', a: 'My tech stack includes Angular, React, TypeScript, Java Spring Boot, PostgreSQL, REST APIs, Three.js, Tailwind CSS, Firebase and Web3 technologies. I choose the optimal technology for each project.' },
        { q: 'How much does a web application cost?', a: 'Costs depend on the project scope. A simple website starts at a few hundred euros, complex web applications can cost several thousand. Contact me for a free initial consultation and a personalized quote.' },
        { q: 'How does a web project with M4LI work?', a: 'Every project starts with a free consultation. Then follows concept, design, development, testing and deployment. I work agile and keep you informed at every stage.' },
        { q: 'What is Web3 Development?', a: 'Web3 Development covers decentralized applications (dApps), smart contracts and blockchain integration. As a Web3 Developer in Germany, I help businesses leverage the possibilities of decentralized technologies.' },
        { q: 'Does M4LI offer maintenance and support?', a: 'Yes, I provide long-term maintenance, updates and technical support for all developed projects. This keeps your application secure, performant and up to date.' },
        { q: 'What languages is communication available in?', a: 'I communicate fluently in German, English and Russian. This ensures smooth collaboration regardless of your preferred language.' }
      ],
      ru: [
        { q: 'Чем занимается Full-Stack разработчик?', a: 'Full-Stack разработчик владеет как фронтендом, так и бэкендом – от пользовательских интерфейсов на Angular или React до серверной логики на Java Spring Boot и баз данных. Как Full-Stack разработчик в Германии, я выполняю ваш веб-проект комплексно из одних рук.' },
        { q: 'Почему стоит нанять Full-Stack разработчика из Германии?', a: 'Разработчик из Германии обеспечивает прямую коммуникацию в вашем часовом поясе, понимание европейского рынка и решения, соответствующие GDPR. Я работаю из Германии и всегда лично доступен.' },
        { q: 'Какие технологии использует M4LI?', a: 'Мой стек включает Angular, React, TypeScript, Java Spring Boot, PostgreSQL, REST API, Three.js, Tailwind CSS, Firebase и Web3-технологии. Я выбираю оптимальную технологию для каждого проекта.' },
        { q: 'Сколько стоит веб-приложение?', a: 'Стоимость зависит от объёма проекта. Простой сайт начинается от нескольких сотен евро, сложные веб-приложения могут стоить несколько тысяч. Свяжитесь со мной для бесплатной первичной консультации и индивидуального предложения.' },
        { q: 'Как проходит веб-проект с M4LI?', a: 'Каждый проект начинается с бесплатной консультации. Затем следуют концепция, дизайн, разработка, тестирование и деплой. Я работаю по agile-методологии и держу вас в курсе на каждом этапе.' },
        { q: 'Что такое Web3-разработка?', a: 'Web3-разработка охватывает децентрализованные приложения (dApps), смарт-контракты и интеграцию блокчейна. Как Web3-разработчик в Германии, я помогаю бизнесу использовать возможности децентрализованных технологий.' },
        { q: 'Предлагает ли M4LI поддержку и обслуживание?', a: 'Да, я обеспечиваю долгосрочное обслуживание, обновления и техническую поддержку всех разработанных проектов. Это гарантирует безопасность, производительность и актуальность вашего приложения.' },
        { q: 'На каких языках возможна коммуникация?', a: 'Я свободно общаюсь на немецком, английском и русском языках. Это обеспечивает комфортное сотрудничество независимо от вашего предпочтительного языка.' }
      ]
    };

    const items = faqData[lang] || faqData['de'];
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': items.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    };
  }
}
