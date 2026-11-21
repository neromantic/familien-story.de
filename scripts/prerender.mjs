/**
 * Build-time prerender.
 *
 * 1. `vite build` has already produced the client bundle in `dist/`.
 * 2. This script builds the SSR bundle and renders every route to static
 *    HTML, so crawlers that do not execute JavaScript (ChatGPT, Perplexity,
 *    Claude) see the real content instead of an empty `<div id="root">`.
 * 3. Each language renders in its own Node process, because the localized
 *    strings are set once at module scope.
 *
 * Usage: `node scripts/prerender.mjs` (orchestrates) — the `--render <lang>`
 * branch is the internal worker.
 */
import { execFileSync } from "node:child_process";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const ssrEntry = path.join(ssrDir, "entry-server.js");
/**
 * The untouched client `index.html`. It lives outside `dist` so the
 * prerendered homepage does not become the template for every other page.
 */
const templateFile = path.join(ssrDir, "template.html");
const SITE = "https://familien-story.de";

const PAGES = [
  {
    de: "/",
    ru: "/ru",
    title: {
      de: "Familien Story — Fotografin für Familien & Geburt in Chemnitz",
      ru: "Familien Story — фотограф семьи и родов в Хемнице",
    },
    description: {
      de: "Familienfotografie, Babybauch und Geburtsfotografie in Chemnitz. Kateryna Hohol begleitet eure Story — ungestellt, natürlich und nah. Jetzt Termin anfragen.",
      ru: "Семейная, беременная и родовая фотография в Хемнице. Катерина Гоголь бережно сохраняет вашу историю — искренне, естественно и близко.",
    },
  },
  {
    de: "/leistungen",
    ru: "/ru/leistungen",
    title: {
      de: "Leistungen — FamilyStory, PregnancyStory, BirthStory | Chemnitz",
      ru: "Услуги — FamilyStory, PregnancyStory, BirthStory | Хемниц",
    },
    description: {
      de: "FamilyStory, PregnancyStory, BirthStory, LoveStory und YourStory in Chemnitz: Familienreportagen, Babybauchshootings, Geburtsfotografie und individuelle Portraits.",
      ru: "FamilyStory, PregnancyStory, BirthStory, LoveStory и YourStory в Хемнице: семейные истории, съёмка беременности, родов и индивидуальные портреты.",
    },
  },
  {
    de: "/ueber-mich",
    ru: "/ru/ueber-mich",
    title: {
      de: "Über mich — Kateryna Hohol, Fotografin in Chemnitz",
      ru: "Обо мне — Катерина Гоголь, фотограф в Хемнице",
    },
    description: {
      de: "Kateryna Hohol, Familien- und Geburtsfotografin in Chemnitz: wie sie arbeitet, was ihr wichtig ist und wo sie fotografiert.",
      ru: "Катерина Гоголь, семейный фотограф и фотограф родов в Хемнице: как она работает, что для неё важно и где она снимает.",
    },
  },
  {
    de: "/impressum",
    ru: "/ru/impressum",
    title: {
      de: "Impressum — Familien Story",
      ru: "Impressum — Familien Story",
    },
    description: {
      de: "Impressum und Anbieterkennzeichnung von Familien Story, Kateryna Hohol, Chemnitz.",
      ru: "Impressum и данные поставщика Familien Story, Kateryna Hohol, Хемниц.",
    },
  },
  {
    de: "/datenschutz",
    ru: "/ru/datenschutz",
    title: {
      de: "Datenschutz — Familien Story",
      ru: "Datenschutz — Familien Story",
    },
    description: {
      de: "Informationen zum Datenschutz bei Familien Story in Chemnitz.",
      ru: "Информация о защите данных в Familien Story в Хемнице.",
    },
  },
];

const esc = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const absolute = (url) => (url === "/" ? `${SITE}/` : `${SITE}${url}`);

const outFile = (url) => {
  if (url === "/") return path.join(dist, "index.html");
  return path.join(dist, `${url.replace(/^\//, "")}.html`);
};

function applyHead(template, page, lang, body) {
  const url = page[lang];
  const canonical = absolute(url);
  const deUrl = absolute(page.de);
  const ruUrl = absolute(page.ru);
  const title = esc(page.title[lang]);
  const description = esc(page.description[lang]);
  const locale = lang === "de" ? "de_DE" : "ru_RU";

  const webpageSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: page.title[lang],
    description: page.description[lang],
    inLanguage: lang,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#business` },
  });

  let html = template;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(
    /<meta name="title" content="[^"]*"/,
    `<meta name="title" content="${title}"`,
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${description}"`,
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonical}"`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="de" href="[^"]*" \/>\s*<link rel="alternate" hreflang="ru" href="[^"]*" \/>\s*<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
    [
      `<link rel="alternate" hreflang="de" href="${deUrl}" />`,
      `<link rel="alternate" hreflang="ru" href="${ruUrl}" />`,
      `<link rel="alternate" hreflang="x-default" href="${deUrl}" />`,
    ].join("\n    "),
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${title}"`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${description}"`,
  );
  html = html.replace(
    /<meta property="og:locale" content="[^"]*"/,
    `<meta property="og:locale" content="${locale}"`,
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"/,
    `<meta name="twitter:url" content="${canonical}"`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${title}"`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${description}"`,
  );
  html = html.replace(
    "</head>",
    `  <script type="application/ld+json">${webpageSchema}</script>\n  </head>`,
  );
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>`,
  );

  return html;
}

async function renderLanguage(lang) {
  globalThis.__PRERENDER_LANG__ = lang;
  if (!existsSync(templateFile)) {
    await mkdir(ssrDir, { recursive: true });
    await copyFile(path.join(dist, "index.html"), templateFile);
  }
  const template = await readFile(templateFile, "utf8");
  const { render } = await import(pathToFileURL(ssrEntry).href);

  for (const page of PAGES) {
    const url = page[lang];
    const body = render(url);
    const file = outFile(url);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, applyHead(template, page, lang, body), "utf8");
    console.log(`  prerendered ${url.padEnd(20)} -> ${path.relative(root, file)}`);
  }
}

if (process.argv.includes("--render")) {
  const lang = process.argv[process.argv.indexOf("--render") + 1];
  if (lang !== "de" && lang !== "ru") {
    throw new Error(`Unknown language: ${lang}`);
  }
  await renderLanguage(lang);
} else {
  console.log("Building SSR bundle …");
  execFileSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["vite", "build", "--ssr", "src/entry-server.tsx", "--outDir", "dist-ssr"],
    { cwd: root, stdio: "inherit" },
  );

  await mkdir(ssrDir, { recursive: true });
  await copyFile(path.join(dist, "index.html"), templateFile);

  for (const lang of ["de", "ru"]) {
    console.log(`Prerendering ${lang} …`);
    execFileSync(process.execPath, [path.join("scripts", "prerender.mjs"), "--render", lang], {
      cwd: root,
      stdio: "inherit",
    });
  }
}
