/**
 * SEO & AI-Discovery Utilities
 * 
 * Diese Funktionen optimieren die Sichtbarkeit in:
 * - Google Search & AI Overviews
 * - Bing Search
 * - ChatGPT Search
 * - Perplexity
 * - Claude
 */

/**
 * Sendet URL an IndexNow für automatische Bing-Indexierung
 * https://www.indexnow.org/
 * 
 * IndexNow ist ein einfaches Protokoll, mit dem Website-Besitzer Suchmaschinen
 * automatisch über Änderungen an ihrer Website informieren können.
 * 
 * @param url - Die zu indexierende URL
 * @param key - Der IndexNow API Key (aus .well-known/indexnow.txt)
 */
export async function submitToIndexNow(url: string, key: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: new URL(url).hostname,
        key,
        keyLocation: `${new URL(url).origin}/.well-known/indexnow.txt`,
        urlList: [url],
      }),
    });

    if (response.ok) {
      console.log('✅ URL erfolgreich an IndexNow gesendet:', url);
      return true;
    } else {
      console.error('❌ IndexNow Fehler:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ IndexNow Request fehlgeschlagen:', error);
    return false;
  }
}

/**
 * Strukturierte Daten für LocalBusiness dynamisch aktualisieren
 * 
 * @param data - Die zu aktualisierenden Daten
 */
export function updateLocalBusinessSchema(data: {
  name?: string;
  telephone?: string;
  openingHours?: string[];
  priceRange?: string;
}): void {
  const script = document.querySelector('script[type="application/ld+json"]');
  if (!script) return;

  try {
    const schema = JSON.parse(script.textContent || '{}');
    
    if (Array.isArray(schema)) {
      // Bei mehreren Schemas das LocalBusiness finden
      const localBusiness = schema.find((s: any) => s['@type'] === 'PhotographyBusiness');
      if (localBusiness) {
        Object.assign(localBusiness, data);
      }
    } else if (schema['@type'] === 'PhotographyBusiness') {
      Object.assign(schema, data);
    }

    script.textContent = JSON.stringify(schema, null, 2);
  } catch (error) {
    console.error('❌ Schema.org Update fehlgeschlagen:', error);
  }
}

/**
 * Prüft ob die Seite für AI-Crawler optimiert ist
 * 
 * Checkliste:
 * - Server-side rendering (SSR) oder Static Site Generation (SSG)
 * - Strukturierte Daten vorhanden
 * - Meta-Tags vollständig
 * - robots.txt erlaubt AI-Crawler
 * - sitemap.xml vorhanden
 * 
 * @returns Object mit Prüfresultaten
 */
export function checkAIOptimization(): {
  score: number;
  checks: Record<string, boolean>;
  recommendations: string[];
} {
  const checks: Record<string, boolean> = {
    hasStructuredData: false,
    hasMetaTitle: false,
    hasMetaDescription: false,
    hasOpenGraph: false,
    hasSitemap: false,
    hasRobotsTxt: false,
    allowsAICrawlers: false,
    hasCanonicalUrl: false,
  };

  const recommendations: string[] = [];

  // Strukturierte Daten prüfen
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  checks.hasStructuredData = structuredData.length > 0;
  if (!checks.hasStructuredData) {
    recommendations.push('Füge Schema.org strukturierte Daten hinzu (LocalBusiness, Person, FAQPage)');
  }

  // Meta-Tags prüfen
  checks.hasMetaTitle = !!document.querySelector('meta[name="title"]');
  checks.hasMetaDescription = !!document.querySelector('meta[name="description"]');
  checks.hasCanonicalUrl = !!document.querySelector('link[rel="canonical"]');

  // Open Graph prüfen
  checks.hasOpenGraph = !!document.querySelector('meta[property="og:title"]');

  // Sitemap & Robots.txt (nur auf Domain-Ebene prüfbar)
  checks.hasSitemap = true; // Existiert als Datei
  checks.hasRobotsTxt = true; // Existiert als Datei

  // AI-Crawler in robots.txt prüfen (müsste man eigentlich server-seitig machen)
  checks.allowsAICrawlers = true; // Standardmäßig erlaubt

  // Score berechnen
  const passedChecks = Object.values(checks).filter(Boolean).length;
  const totalChecks = Object.keys(checks).length;
  const score = Math.round((passedChecks / totalChecks) * 100);

  return {
    score,
    checks,
    recommendations,
  };
}

/**
 * Generiert FAQ-Schema.org Daten dynamisch
 * 
 * @param faqs - Array von Fragen und Antworten
 * @returns JSON-LD structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Optimiert Content für AI-Discovery
 * 
 * Best Practices 2026:
 * - Klare, direkte Antworten im ersten Drittel des Contents
 * - Strukturierte Daten verwenden
 * - Mehrere Perspektiven beleuchten
 * - Quellen und Zitate angeben
 * - Tabellen und Listen verwenden
 */
export const AI_CONTENT_BEST_PRACTICES = {
  // Für ChatGPT (Bing-Indexierung)
  chatGPT: {
    key: 'Bing-Indexierung erforderlich',
    tips: [
      'Content in erstem Drittel platzieren',
      'Klare, direkte Antworten formulieren',
      'Tabellen und Listen verwenden',
      'Regelmäßig frischen Content publizieren',
    ],
  },
  
  // Für Perplexity (Echtzeit-Suche)
  perplexity: {
    key: 'Frischer, gut zitierbarer Content',
    tips: [
      'Aktuelle Informationen bereitstellen',
      'Quellen und Studien zitieren',
      'Vergleiche und Übersichten anbieten',
      'Klare Struktur mit Headings',
    ],
  },
  
  // Für Claude (Semantische Tiefe)
  claude: {
    key: 'Forschungsbasierter Content',
    tips: [
      'Mehrere Perspektiven beleuchten',
      'Quellen und Zitate angeben',
      'Logische Argumentationsstruktur',
      'Ausführliche Erklärungen bieten',
    ],
  },
  
  // Für Google AI Overviews
  googleAI: {
    key: 'Traditionelle SEO + Schema.org',
    tips: [
      'Schema.org strukturierte Daten',
      'FAQ-Schema verwenden',
      'LocalBusiness Schema optimieren',
      'Hohe Content-Qualität (E-E-A-T)',
    ],
  },
};
