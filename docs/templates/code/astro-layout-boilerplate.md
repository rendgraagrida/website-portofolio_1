---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

// Terima props jika diperlukan
interface Props {
  title: string;
}
const { title } = Astro.props;

// Konfigurasi bahasa
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<!-- 
  Boilerplate Standar Astro Layout 
  Mendukung SEO dasar, kompresi viewport, dan i18n
-->
<html lang={lang} class="scroll-smooth">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body class="min-h-screen flex flex-col bg-tuku-cream text-earth-900 font-sans antialiased">
    <!-- Navbar diletakkan di sini -->
    
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer diletakkan di sini -->
  </body>
</html>
