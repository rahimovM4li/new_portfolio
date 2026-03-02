/**
 * Post-build script to create language-specific index.html files
 * with proper OG tags for crawlers
 */

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist/my_portfolio_3d/browser');
const indexPath = path.join(distPath, 'index.html');

// Read the base index.html
const baseHtml = fs.readFileSync(indexPath, 'utf-8');

const routes = [
  { lang: 'de', path: 'de', name: 'home' },
  { lang: 'de', path: 'de/about', name: 'about' },
  { lang: 'de', path: 'de/projects', name: 'projects' },
  { lang: 'de', path: 'de/contact', name: 'contact' },
  { lang: 'en', path: 'en', name: 'home' },
  { lang: 'en', path: 'en/about', name: 'about' },
  { lang: 'en', path: 'en/projects', name: 'projects' },
  { lang: 'en', path: 'en/contact', name: 'contact' },
  { lang: 'ru', path: 'ru', name: 'home' },
  { lang: 'ru', path: 'ru/about', name: 'about' },
  { lang: 'ru', path: 'ru/projects', name: 'projects' },
  { lang: 'ru', path: 'ru/contact', name: 'contact' },
];

const seoMeta = {
  de: {
    home: {
      title: 'M4LI | Muhammadali Rahimov – Full-Stack Entwickler Deutschland',
      description: 'Muhammadali Rahimov – Full-Stack Entwickler aus Deutschland. Spezialisiert auf Angular, React, Java Spring Boot, Web3 & skalierbare Webanwendungen. Jetzt Projekt starten!',
      ogTitle: 'M4LI | Muhammadali Rahimov – Full-Stack Entwickler Deutschland',
      ogDescription: 'Full-Stack Entwickler aus Deutschland – Angular, React, Java Spring Boot, Web3. Moderne Webanwendungen & skalierbare Lösungen.'
    },
    about: {
      title: 'Über Muhammadali Rahimov | Full-Stack Entwickler & Web3 Experte – M4LI',
      description: 'Erfahren Sie mehr über Muhammadali Rahimov – Full-Stack Entwickler in Deutschland mit Expertise in Angular, Spring Boot, REST APIs und modernem JavaScript.',
      ogTitle: 'Über Muhammadali Rahimov | Full-Stack Entwickler – M4LI',
      ogDescription: 'Full-Stack Entwickler in Deutschland – Angular, Spring Boot, REST APIs. Erfahren Sie mehr über meine Expertise und Projekte.'
    },
    projects: {
      title: 'Projekte von Muhammadali Rahimov | Web-Entwicklung Portfolio – M4LI',
      description: 'Entdecken Sie die Projekte von Muhammadali Rahimov: Angular, React, Three.js, E-Commerce & Web3 Anwendungen. Full-Stack Entwicklung aus Deutschland.',
      ogTitle: 'Projekte | Muhammadali Rahimov – M4LI',
      ogDescription: 'Angular, React, Three.js, E-Commerce & Web3 Projekte. Full-Stack Entwicklung aus Deutschland.'
    },
    contact: {
      title: 'Kontakt – Muhammadali Rahimov | Full-Stack Entwickler beauftragen – M4LI',
      description: 'Kontaktieren Sie Muhammadali Rahimov für Ihr nächstes Webprojekt. Full-Stack Entwicklung, Web3, Angular & Spring Boot. Kostenlose Erstberatung aus Deutschland.',
      ogTitle: 'Kontakt | Muhammadali Rahimov – M4LI',
      ogDescription: 'Full-Stack Entwicklung, Web3, Angular & Spring Boot. Kostenlose Erstberatung aus Deutschland.'
    }
  },
  en: {
    home: {
      title: 'M4LI | Muhammadali Rahimov – Full-Stack Developer Germany',
      description: 'Muhammadali Rahimov – Full-Stack Developer based in Germany. Specialized in Angular, React, Java Spring Boot, Web3 & scalable web applications. Start your project today!',
      ogTitle: 'M4LI | Muhammadali Rahimov – Full-Stack Developer Germany',
      ogDescription: 'Full-Stack Developer based in Germany – Angular, React, Java Spring Boot, Web3. Modern web applications & scalable solutions.'
    },
    about: {
      title: 'About Muhammadali Rahimov | Full-Stack Developer & Web3 Expert – M4LI',
      description: 'Learn more about Muhammadali Rahimov – Full-Stack Developer in Germany with expertise in Angular, Spring Boot, REST APIs and modern JavaScript frameworks.',
      ogTitle: 'About Muhammadali Rahimov | Full-Stack Developer – M4LI',
      ogDescription: 'Full-Stack Developer in Germany – Angular, Spring Boot, REST APIs. Learn more about my expertise and projects.'
    },
    projects: {
      title: 'Projects by Muhammadali Rahimov | Web Development Portfolio – M4LI',
      description: 'Explore projects by Muhammadali Rahimov: Angular, React, Three.js, E-Commerce & Web3 applications. Full-Stack development from Germany.',
      ogTitle: 'Projects | Muhammadali Rahimov – M4LI',
      ogDescription: 'Angular, React, Three.js, E-Commerce & Web3 projects. Full-Stack development from Germany.'
    },
    contact: {
      title: 'Contact – Muhammadali Rahimov | Hire a Full-Stack Developer – M4LI',
      description: 'Contact Muhammadali Rahimov for your next web project. Full-Stack development, Web3, Angular & Spring Boot. Free initial consultation from Germany.',
      ogTitle: 'Contact | Muhammadali Rahimov – M4LI',
      ogDescription: 'Full-Stack development, Web3, Angular & Spring Boot. Free initial consultation from Germany.'
    }
  },
  ru: {
    home: {
      title: 'M4LI | Мухаммадали Рахимов – Full-Stack Разработчик Германия',
      description: 'Мухаммадали Рахимов – Full-Stack разработчик в Германии. Angular, React, Java Spring Boot, Web3 и масштабируемые веб-приложения. Начните проект сейчас!',
      ogTitle: 'M4LI | Мухаммадали Рахимов – Full-Stack Разработчик Германия',
      ogDescription: 'Full-Stack разработчик в Германии – Angular, React, Java Spring Boot, Web3. Современные веб-приложения и масштабируемые решения.'
    },
    about: {
      title: 'О Мухаммадали Рахимове | Full-Stack Разработчик и Web3 Эксперт – M4LI',
      description: 'Узнайте больше о Мухаммадали Рахимове – Full-Stack разработчике в Германии. Angular, Spring Boot, REST API и современные JavaScript фреймворки.',
      ogTitle: 'О Мухаммадали Рахимове | Full-Stack Разработчик – M4LI',
      ogDescription: 'Full-Stack разработчик в Германии – Angular, Spring Boot, REST API. Узнайте больше о моей экспертизе.'
    },
    projects: {
      title: 'Проекты Мухаммадали Рахимова | Портфолио веб-разработки – M4LI',
      description: 'Откройте проекты Мухаммадали Рахимова: Angular, React, Three.js, E-Commerce и Web3 приложения. Full-Stack разработка из Германии.',
      ogTitle: 'Проекты | Мухаммадали Рахимов – M4LI',
      ogDescription: 'Angular, React, Three.js, E-Commerce и Web3 проекты. Full-Stack разработка из Германии.'
    },
    contact: {
      title: 'Контакты – Мухаммадали Рахимов | Нанять Full-Stack Разработчика – M4LI',
      description: 'Свяжитесь с Мухаммадали Рахимовым для вашего веб-проекта. Full-Stack разработка, Web3, Angular и Spring Boot. Бесплатная консультация из Германии.',
      ogTitle: 'Контакты | Мухаммадали Рахимов – M4LI',
      ogDescription: 'Full-Stack разработка, Web3, Angular и Spring Boot. Бесплатная консультация из Германии.'
    }
  }
};

function injectMeta(html, route) {
  const meta = seoMeta[route.lang][route.name];
  const url = `https://m4li.de/${route.path}`;
  const locale = route.lang === 'de' ? 'de_DE' : route.lang === 'ru' ? 'ru_RU' : 'en_US';

  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  
  // Replace or add meta description
  if (html.includes('name="description"')) {
    html = html.replace(/name="description" content="[^"]*"/, `name="description" content="${meta.description}"`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${meta.description}">\n</head>`);
  }
  
  // Replace html lang
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${route.lang}"`);

  // Add OG tags before </head>
  const ogTags = `
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${meta.ogTitle}">
  <meta property="og:description" content="${meta.ogDescription}">
  <meta property="og:image" content="https://m4li.de/assets/myPic.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Muhammadali Rahimov – Full-Stack Developer Portfolio">
  <meta property="og:locale" content="${locale}">
  <meta property="og:site_name" content="M4LI – Muhammadali Rahimov">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${url}">
  <meta name="twitter:title" content="${meta.ogTitle}">
  <meta name="twitter:description" content="${meta.ogDescription}">
  <meta name="twitter:image" content="https://m4li.de/assets/myPic.jpg">
  <meta name="twitter:image:alt" content="Muhammadali Rahimov – Full-Stack Developer Portfolio">
`;

  html = html.replace('</head>', ogTags + '\n</head>');
  
  return html;
}

// Create directory structure and files
routes.forEach(route => {
  const html = injectMeta(baseHtml, route);
  const dirPath = path.join(distPath, route.path);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Write index.html
  const filePath = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath, html, 'utf-8');
  
  console.log(`✓ Created ${route.path}/index.html with ${route.lang} OG tags`);
});

console.log('\n✅ All language-specific index.html files created successfully!');
console.log('OG tags are now ready for social media crawlers.');
