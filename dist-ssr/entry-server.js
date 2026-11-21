import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Navigate, Route, Routes } from "react-router-dom";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import LocalizedStrings from "react-localization";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Check, Heart, Mail, MapPin, Menu, Star, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
//#region src/portfolio/lang.ts
var STORAGE_KEY = "familienstory.lang";
/** The language implied by a path prefix, or null for German. */
function langFromPath(pathname) {
	return /^\/ru(?:\/|$)/.test(pathname) ? "ru" : null;
}
function detectLang() {
	if (typeof window === "undefined") return globalThis.__PRERENDER_LANG__ ?? "de";
	const fromPath = langFromPath(window.location.pathname);
	if (fromPath) return fromPath;
	const saved = window.localStorage.getItem(STORAGE_KEY);
	if (saved === "de" || saved === "ru") return saved;
	return window.navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "de";
}
function setLang(lang) {
	window.localStorage.setItem(STORAGE_KEY, lang);
}
/** Maps a German path to the same page in the given language. */
function langPath(path, lang) {
	const withoutRu = (path.startsWith("/") ? path : `/${path}`).replace(/^\/ru(?=\/|$)/, "") || "/";
	if (lang === "de") return withoutRu;
	return withoutRu === "/" ? "/ru" : `/ru${withoutRu}`;
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/portfolio/LanguageSwitch.tsx
var strings$14 = new LocalizedStrings({
	de: {
		label: "RU",
		ariaLabel: "Auf Russisch umstellen"
	},
	ru: {
		label: "DE",
		ariaLabel: "Переключить на немецкий"
	}
});
strings$14.setLanguage(detectLang());
function LanguageSwitch({ className }) {
	const nextLanguage = detectLang() === "de" ? "ru" : "de";
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		"aria-label": strings$14.ariaLabel,
		onClick: () => {
			setLang(nextLanguage);
			const target = `${langPath(window.location.pathname, nextLanguage)}${window.location.search}${window.location.hash}`;
			window.location.assign(target);
		},
		className: cn("inline-flex min-h-11 min-w-11 items-center justify-center border border-cream/70 px-3 text-[10px] font-medium tracking-[0.12em] uppercase transition-colors hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream", className),
		children: strings$14.label
	});
}
//#endregion
//#region src/assets/images/header-desktop.png
var header_desktop_default = "/assets/header-desktop-BlKRACH1.png";
//#endregion
//#region src/assets/images/header-mobile.png
var header_mobile_default = "/assets/header-mobile-mY1xE28Y.png";
//#endregion
//#region src/portfolio/config.ts
var PHOTOGRAPHER_NAME = "Kateryna Hohol";
var PHOTOGRAPHER_BRAND = "FAMILIENSTORY";
var PHOTOGRAPHER_STREET = "Rosenhof 7";
var PHOTOGRAPHER_PLZ = "09111";
var PHOTOGRAPHER_ORT = "Chemnitz";
var EMAIL_ADDRESS = "hoholkateryna@gmail.com";
var WHATSAPP_PHONE = "+49 176 64094869";
var INSTAGRAM_HANDLE = "@kateryna.familienstory";
var INSTAGRAM_URL = "https://instagram.com/kateryna.familienstory";
var WHATSAPP_MESSAGE = "Hallo Kateryna, ich interessiere mich für ein Fotoshooting und würde gern mehr erfahren.";
function getWhatsAppUrl(message = WHATSAPP_MESSAGE) {
	return `https://wa.me/${WHATSAPP_PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
//#endregion
//#region src/portfolio/Icons.tsx
/**
* Brand marks. Brand icons were removed from lucide-react, so the official
* glyphs are inlined to match the reference badges.
*/
function InstagramIcon({ className }) {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("rect", {
				x: "2",
				y: "2",
				width: "20",
				height: "20",
				rx: "5"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "4"
			}),
			/* @__PURE__ */ jsx("line", {
				x1: "17.5",
				y1: "6.5",
				x2: "17.5",
				y2: "6.5"
			})
		]
	});
}
function WhatsAppIcon({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		className,
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
	});
}
//#endregion
//#region src/portfolio/Hero.tsx
/**
* Localized hero strings, defined right where they are used. German is the
* first language, so any key missing from Russian falls back to it.
*/
var strings$13 = new LocalizedStrings({
	de: {
		title: "Familienstory",
		subtitle: "Story, die bleibt für immer.",
		eyebrow: "Familien- & Geburtsfotografie · Chemnitz",
		intro: "Ungestellte Familienreportagen für alle, die sich später nicht an ein Fotoshooting erinnern wollen – sondern an ihr Gefühl.",
		cta: "Geschichte festhalten",
		navCta: "Termin anfragen",
		work: "Arbeiten",
		stories: "Stories",
		discover: "Entdecken",
		about: "Über mich",
		process: "Ablauf",
		contact: "Kontakt",
		openMenu: "Navigation öffnen",
		closeMenu: "Navigation schließen",
		nav: "Hauptnavigation"
	},
	ru: {
		title: "Семейная история",
		subtitle: "История, которая останется навсегда.",
		eyebrow: "Семейная фотография и съёмка родов · Хемниц",
		intro: "Непостановочные семейные истории для тех, кто хочет вспоминать не фотосессию, а свои чувства.",
		cta: "Сохранить вашу историю",
		navCta: "Записаться",
		work: "Работы",
		stories: "Истории",
		discover: "Смотреть",
		about: "Обо мне",
		process: "Как всё проходит",
		contact: "Контакт",
		openMenu: "Открыть навигацию",
		closeMenu: "Закрыть навигацию",
		nav: "Главная навигация"
	}
});
strings$13.setLanguage(detectLang());
/**
* The full-bleed hero with a compact navigation and a direct contact link.
*/
function Hero() {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuButtonRef = useRef(null);
	const lang = detectLang();
	useEffect(() => {
		if (!menuOpen) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				setMenuOpen(false);
				menuButtonRef.current?.focus();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [menuOpen]);
	return /* @__PURE__ */ jsxs("header", {
		id: "top",
		className: "portfolio-hero",
		children: [
			/* @__PURE__ */ jsxs("picture", {
				className: "portfolio-hero-picture",
				children: [/* @__PURE__ */ jsx("source", {
					media: "(max-width: 640px)",
					srcSet: header_mobile_default
				}), /* @__PURE__ */ jsx("img", {
					src: header_desktop_default,
					alt: "Familie in der Herbstnatur",
					"aria-hidden": true,
					fetchPriority: "high",
					width: "2048",
					height: "1365",
					className: "portfolio-hero-image"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": true,
				className: "portfolio-hero-wash"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "portfolio-header",
				children: [
					/* @__PURE__ */ jsxs("a", {
						href: "#top",
						className: "portfolio-brand",
						"aria-label": "Familienstory – Startseite",
						children: [/* @__PURE__ */ jsx("span", { children: "FAMILIEN" }), /* @__PURE__ */ jsx("em", { children: "STORY" })]
					}),
					/* @__PURE__ */ jsxs("nav", {
						"aria-label": strings$13.nav,
						className: "portfolio-nav-desktop",
						children: [
							/* @__PURE__ */ jsx("a", {
								href: "#portfolio",
								children: strings$13.work
							}),
							/* @__PURE__ */ jsx("a", {
								href: langPath("/leistungen", lang),
								children: strings$13.stories
							}),
							/* @__PURE__ */ jsx("a", {
								href: langPath("/ueber-mich", lang),
								children: strings$13.about
							}),
							/* @__PURE__ */ jsx("a", {
								href: "#process",
								children: strings$13.process
							}),
							/* @__PURE__ */ jsx("a", {
								href: "#contact",
								children: strings$13.contact
							}),
							/* @__PURE__ */ jsxs("a", {
								className: "portfolio-nav-cta",
								href: getWhatsAppUrl(),
								target: "_blank",
								rel: "noopener noreferrer",
								children: [strings$13.navCta, /* @__PURE__ */ jsx(WhatsAppIcon, { className: "size-4" })]
							}),
							/* @__PURE__ */ jsx(LanguageSwitch, {})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "portfolio-mobile-actions",
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							ref: menuButtonRef,
							"aria-label": menuOpen ? strings$13.closeMenu : strings$13.openMenu,
							"aria-expanded": menuOpen,
							"aria-controls": "mobile-navigation",
							onClick: () => setMenuOpen((open) => !open),
							className: "portfolio-menu-button",
							children: menuOpen ? /* @__PURE__ */ jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsx(Menu, { className: "size-5" })
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("nav", {
				id: "mobile-navigation",
				"aria-label": strings$13.nav,
				"aria-hidden": !menuOpen,
				className: `portfolio-nav-mobile${menuOpen ? " is-open" : ""}`,
				inert: !menuOpen,
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "#portfolio",
						onClick: () => setMenuOpen(false),
						children: strings$13.work
					}),
					/* @__PURE__ */ jsx("a", {
						href: langPath("/leistungen", lang),
						onClick: () => setMenuOpen(false),
						children: strings$13.stories
					}),
					/* @__PURE__ */ jsx("a", {
						href: langPath("/ueber-mich", lang),
						onClick: () => setMenuOpen(false),
						children: strings$13.about
					}),
					/* @__PURE__ */ jsx("a", {
						href: "#process",
						onClick: () => setMenuOpen(false),
						children: strings$13.process
					}),
					/* @__PURE__ */ jsx("a", {
						href: "#contact",
						onClick: () => setMenuOpen(false),
						children: strings$13.contact
					}),
					/* @__PURE__ */ jsxs("a", {
						className: "portfolio-nav-cta",
						href: getWhatsAppUrl(),
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: () => setMenuOpen(false),
						children: [strings$13.navCta, /* @__PURE__ */ jsx(WhatsAppIcon, { className: "size-4" })]
					}),
					/* @__PURE__ */ jsx(LanguageSwitch, {})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "portfolio-hero-content",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "portfolio-eyebrow",
						children: strings$13.eyebrow
					}),
					/* @__PURE__ */ jsx("h1", { children: strings$13.title }),
					/* @__PURE__ */ jsx("p", {
						className: "portfolio-hero-subtitle",
						children: strings$13.subtitle
					}),
					/* @__PURE__ */ jsx("p", {
						className: "portfolio-hero-copy",
						children: strings$13.intro
					}),
					/* @__PURE__ */ jsxs("a", {
						className: "portfolio-button portfolio-button-light",
						href: getWhatsAppUrl(),
						target: "_blank",
						rel: "noopener noreferrer",
						children: [/* @__PURE__ */ jsx("span", { children: strings$13.cta }), /* @__PURE__ */ jsx("i", { children: /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 }) })]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "portfolio-hero-note",
				children: [/* @__PURE__ */ jsx(Heart, {
					size: 16,
					strokeWidth: 1.7,
					"aria-hidden": true
				}), strings$13.subtitle]
			}),
			/* @__PURE__ */ jsxs("a", {
				className: "portfolio-scroll-hint",
				href: "#portfolio",
				children: [/* @__PURE__ */ jsx("span", { children: strings$13.discover }), /* @__PURE__ */ jsx("i", { "aria-hidden": true })]
			})
		]
	});
}
//#endregion
//#region src/components/magic-ui/marquee.tsx
/**
* Magic UI Marquee — a seamless, CSS-driven infinite scroll strip.
* The animation is defined by the `marquee` keyframes in globals.css.
*/
function Marquee({ className, reverse = false, pauseOnHover = false, vertical = false, repeat = 4, children, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]", vertical ? "flex-col" : "flex-row", className),
		...props,
		children: Array.from({ length: repeat }).map((_, index) => /* @__PURE__ */ jsx("div", {
			className: cn("flex shrink-0 [gap:var(--gap)]", {
				"animate-marquee flex-row": !vertical,
				"animate-marquee-vertical flex-col": vertical,
				"group-hover:[animation-play-state:paused]": pauseOnHover,
				"[animation-direction:reverse]": reverse
			}),
			children
		}, index))
	});
}
//#endregion
//#region src/portfolio/MarqueeStrip.tsx
var strings$12 = new LocalizedStrings({
	de: {
		label: "Stories",
		items: [
			"FamilyStory",
			"PregnancyStory",
			"BirthStory",
			"LoveStory",
			"YourStory"
		]
	},
	ru: {
		label: "Истории",
		items: [
			"FamilyStory",
			"PregnancyStory",
			"BirthStory",
			"LoveStory",
			"YourStory"
		]
	}
});
strings$12.setLanguage(detectLang());
/** The service strip below the hero, built with the Magic UI marquee. */
function MarqueeStrip() {
	return /* @__PURE__ */ jsx("div", {
		className: "portfolio-marquee",
		role: "region",
		"aria-label": strings$12.label,
		children: /* @__PURE__ */ jsx(Marquee, {
			repeat: 4,
			pauseOnHover: true,
			"aria-hidden": true,
			children: strings$12.items.map((item) => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { children: item }), /* @__PURE__ */ jsx("i", {
				"aria-hidden": true,
				children: "✦"
			})] }, item))
		})
	});
}
//#endregion
//#region src/components/magic-ui/blur-fade.tsx
/**
* Magic UI Blur Fade — reveals its children with a short blur/offset
* transition. Respects `prefers-reduced-motion` by rendering immediately.
*/
function BlurFade({ children, className, variant, duration = .4, delay = 0, offset = 6, direction = "down", inView = true, blur = "6px" }) {
	const ref = useRef(null);
	const inViewResult = useInView(ref, {
		once: true,
		amount: .12
	});
	const isInView = !inView || inViewResult;
	const reduceMotion = useReducedMotion();
	const defaultVariants = {
		hidden: {
			[direction]: reduceMotion ? 0 : offset,
			opacity: reduceMotion ? 1 : 0,
			filter: reduceMotion ? "blur(0px)" : `blur(${blur})`
		},
		visible: {
			[direction]: 0,
			opacity: 1,
			filter: "blur(0px)"
		}
	};
	return /* @__PURE__ */ jsx(motion.div, {
		ref,
		initial: "hidden",
		animate: isInView ? "visible" : "hidden",
		variants: variant ?? defaultVariants,
		transition: {
			delay,
			duration,
			ease: "easeOut"
		},
		className: cn(className),
		children
	});
}
//#endregion
//#region src/assets/images/about-me.webp
var about_me_default = "/assets/about-me-1M669TiY.webp";
//#endregion
//#region src/portfolio/works.ts
/**
* Map the Lightroom share listing onto the bento-grid image shape. The grid
* shows every photo of the share, in album order; there is no static
* fallback set anymore.
*/
function createLightroomWorks(images) {
	return images.map((image) => {
		const aspect = image.width && image.height ? image.width / image.height : 2 / 3;
		return {
			src: image.thumbnailUrl,
			fullSrc: image.fullUrl,
			alt: image.name,
			wide: aspect > 1.15,
			aspect
		};
	});
}
//#endregion
//#region src/components/magic-ui/bento-grid.tsx
/**
* Magic UI Bento Grid — the responsive layout shell for the portfolio
* gallery. The default classes are intentionally generic; the portfolio
* overrides columns, gaps and row heights through `.portfolio-bento`.
*/
function BentoGrid({ className, children }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3", className),
		children
	});
}
//#endregion
//#region src/portfolio/Gallery.tsx
var strings$11 = new LocalizedStrings({
	de: {
		open: "vergrößern",
		close: "Schließen",
		prev: "Vorheriges Bild",
		next: "Nächstes Bild"
	},
	ru: {
		open: "увеличить",
		close: "Закрыть",
		prev: "Предыдущее фото",
		next: "Следующее фото"
	}
});
strings$11.setLanguage(detectLang());
/**
* The shared bento gallery with its keyboard-navigable lightbox. Used by the
* landing page and by the per-story galleries, so both behave identically.
*/
function Gallery({ works }) {
	const dialogRef = useRef(null);
	const [lightbox, setLightbox] = useState(null);
	const isLightboxOpen = lightbox !== null;
	useEffect(() => {
		if (lightbox === null) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previous;
		};
	}, [lightbox]);
	useEffect(() => {
		if (!isLightboxOpen) return;
		const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		const animationFrame = window.requestAnimationFrame(() => {
			dialogRef.current?.querySelector("button")?.focus();
		});
		return () => {
			window.cancelAnimationFrame(animationFrame);
			previousFocus?.focus();
		};
	}, [isLightboxOpen]);
	useEffect(() => {
		if (lightbox === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				setLightbox(null);
			} else if (e.key === "ArrowLeft") setLightbox((i) => i === null ? i : (i + works.length - 1) % works.length);
			else if (e.key === "ArrowRight") setLightbox((i) => i === null ? i : (i + 1) % works.length);
			else if (e.key === "Tab") {
				const buttons = dialogRef.current?.querySelectorAll("button:not([disabled])");
				const first = buttons?.[0];
				const last = buttons?.[buttons.length - 1];
				if (!first || !last) return;
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [lightbox, works.length]);
	const active = lightbox === null ? null : works[lightbox] ?? null;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(BentoGrid, {
		className: "portfolio-bento",
		children: works.map((item, index) => /* @__PURE__ */ jsx(BlurFade, {
			delay: Math.min(index * .05, .3),
			className: cn("portfolio-work-figure", item.wide && "is-wide"),
			children: /* @__PURE__ */ jsx("figure", {
				className: "portfolio-work-card",
				children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setLightbox(index),
					"aria-label": `${item.alt} — ${strings$11.open}`,
					className: "work-tile",
					children: [/* @__PURE__ */ jsx("img", {
						src: item.src,
						alt: item.alt,
						loading: "lazy",
						width: Math.round(item.aspect * 1e3),
						height: 1e3
					}), /* @__PURE__ */ jsx("span", {
						className: "work-tile-hint",
						children: strings$11.open
					})]
				})
			})
		}, item.src))
	}), active ? /* @__PURE__ */ jsxs("div", {
		ref: dialogRef,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": active.alt,
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4",
		onClick: () => setLightbox(null),
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setLightbox(null),
				"aria-label": strings$11.close,
				className: "absolute top-4 right-4 z-10 flex size-10 items-center justify-center text-cream/80 transition-colors hover:text-cream",
				children: /* @__PURE__ */ jsx(X, { className: "size-6" })
			}),
			lightbox > 0 ? /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation();
					setLightbox((lightbox + works.length - 1) % works.length);
				},
				"aria-label": strings$11.prev,
				className: "absolute left-3 z-10 flex size-11 items-center justify-center text-cream/80 transition-colors hover:text-cream sm:left-6",
				children: /* @__PURE__ */ jsx(ArrowLeft, { className: "size-7" })
			}) : null,
			/* @__PURE__ */ jsx("img", {
				src: active.fullSrc ?? active.src,
				alt: active.alt,
				width: Math.round(active.aspect * 1e3),
				height: 1e3,
				onClick: (e) => e.stopPropagation(),
				className: "max-h-full max-w-full object-contain"
			}),
			lightbox < works.length - 1 ? /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation();
					setLightbox((lightbox + 1) % works.length);
				},
				"aria-label": strings$11.next,
				className: "absolute right-3 z-10 flex size-11 items-center justify-center text-cream/80 transition-colors hover:text-cream sm:right-6",
				children: /* @__PURE__ */ jsx(ArrowRight, { className: "size-7" })
			}) : null
		]
	}) : null] });
}
//#endregion
//#region src/portfolio/WorkSection.tsx
/**
* Localized work-section strings, defined right where they are used.
* German is the first language, so any key missing from Russian falls back
* to it automatically.
*/
var strings$10 = new LocalizedStrings({
	de: {
		heading: "Echte Momente.",
		headingAccent: "Für immer.",
		intro: "Leise Geschichten vom Werden, Ankommen und Wachsen. Echt, ungestellt und voller Nähe — bewahrt in Bildern, die sich nach Zuhause anfühlen.",
		loading: "Lade Geschichten aus Lightroom …",
		lightroomError: "Die Fotos konnten nicht aus Lightroom geladen werden."
	},
	ru: {
		heading: "Настоящие моменты.",
		headingAccent: "Навсегда.",
		intro: "Тихие истории о зарождении, встрече и взрослении. Искренние, живые, близкие — в фотографиях, которые ощущаются как дом.",
		loading: "Загрузка историй из Lightroom …",
		lightroomError: "Не удалось загрузить фотографии из Lightroom."
	}
});
strings$10.setLanguage(detectLang());
/**
* The curated work: an editorial introduction and the shared bento gallery.
* The grid shows every photo of the Lightroom share (or the bundled fallback
* photos when the share is not configured).
*/
function WorkSection({ lightroomImages, lightroomError = false }) {
	const works = useMemo(() => lightroomImages ? createLightroomWorks(lightroomImages) : [], [lightroomImages]);
	return /* @__PURE__ */ jsx("section", {
		id: "portfolio",
		"aria-labelledby": "work-heading",
		className: "portfolio-work",
		children: /* @__PURE__ */ jsxs("div", {
			className: "portfolio-section-inner",
			children: [
				/* @__PURE__ */ jsxs(BlurFade, {
					className: "portfolio-section-intro",
					children: [/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h2", {
						id: "work-heading",
						children: [
							strings$10.heading,
							" ",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("em", { children: strings$10.headingAccent })
						]
					}) }), /* @__PURE__ */ jsx("p", {
						className: "portfolio-intro-copy",
						children: strings$10.intro
					})]
				}),
				lightroomError ? /* @__PURE__ */ jsx("p", {
					role: "alert",
					className: "portfolio-lightroom-error",
					children: strings$10.lightroomError
				}) : null,
				!lightroomError && works.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "portfolio-lightroom-loading",
					"aria-live": "polite",
					children: strings$10.loading
				}) : null,
				works.length > 0 ? /* @__PURE__ */ jsx(Gallery, { works }) : null
			]
		})
	});
}
//#endregion
//#region src/portfolio/AboutSection.tsx
/**
* Localized about-section strings, defined right where they are used.
* German is the first language, so any key missing from Russian falls back
* to it automatically.
*/
var strings$9 = new LocalizedStrings({
	de: {
		heading: "Hi, ich bin",
		headingAccent: "Kateryna.",
		greeting: "Schön, dass du hier bist!",
		paragraphs: [
			"Ich bin Kateryna, Fotografin mit viel Liebe für die kleinen und großen Wunder des Lebens.",
			"Meine Reise begann mit der Geburt meiner Tochter: winzige Hände, das erste Kennenlernen und eine Liebe, die mein Herz tief berührt hat. Seitdem halte ich besonders gern die Geschichten rund um Geburt, Babys und das Familienwerden fest.",
			"Mit Gottes Hilfe wurde meine Leidenschaft zum Beruf. Ich möchte Bilder schaffen, die euch auch Jahre später wieder ganz nah an diesen Augenblick bringen.",
			"Ich freue mich darauf, auch eure Geschichte festzuhalten!"
		],
		chat: "Lass uns chatten",
		or: "oder",
		instagram: "@kateryna.familienstory",
		more: "Mehr über mich"
	},
	ru: {
		heading: "Привет, я",
		headingAccent: "Катерина.",
		greeting: "Рада, что ты здесь!",
		paragraphs: [
			"Я Катерина, фотограф, с большой любовью к маленьким и большим чудесам жизни.",
			"Мой путь начался с рождения дочери: крохотные ручки, первое знакомство и любовь, которая глубоко тронула моё сердце. С тех пор я особенно люблю истории о рождении, малышах и становлении семьи.",
			"С Божьей помощью моя страсть стала профессией. Я хочу создавать фотографии, которые даже спустя годы вернут вас в тот самый момент.",
			"Мне не терпится запечатлеть и вашу историю!"
		],
		chat: "Давай общаться",
		or: "или",
		instagram: "@kateryna.familienstory",
		more: "Подробнее обо мне"
	}
});
strings$9.setLanguage(detectLang());
/**
* The about section pairs the photographer's portrait and story with direct
* contact options in a contrasting dark panel.
*/
function AboutSection() {
	return /* @__PURE__ */ jsx("section", {
		id: "about",
		"aria-labelledby": "about-heading",
		className: "portfolio-about",
		children: /* @__PURE__ */ jsx("div", {
			className: "portfolio-about-inner",
			children: /* @__PURE__ */ jsxs("div", {
				className: "portfolio-about-grid",
				children: [/* @__PURE__ */ jsxs(BlurFade, {
					className: "about-reveal portfolio-about-photo",
					children: [
						/* @__PURE__ */ jsx("div", {
							"aria-hidden": true,
							className: "portfolio-about-frame"
						}),
						/* @__PURE__ */ jsx("img", {
							src: about_me_default,
							alt: "Kateryna Hohol lächelt bei einem Familien-Fotoshooting",
							loading: "lazy",
							width: "1365",
							height: "1473"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "portfolio-portrait-label",
							children: "Kateryna Hohol"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "portfolio-about-copy",
					children: [
						/* @__PURE__ */ jsx(BlurFade, {
							className: "about-reveal",
							children: /* @__PURE__ */ jsxs("h2", {
								id: "about-heading",
								children: [
									strings$9.heading,
									" ",
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("em", { children: strings$9.headingAccent })
								]
							})
						}),
						/* @__PURE__ */ jsxs(BlurFade, {
							className: "about-reveal",
							delay: .08,
							children: [/* @__PURE__ */ jsxs("p", {
								className: "portfolio-about-greeting",
								children: [strings$9.greeting, /* @__PURE__ */ jsx(Heart, {
									className: "portfolio-greeting-heart",
									size: 18,
									strokeWidth: 1.6,
									"aria-hidden": true
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "portfolio-about-paragraphs",
								children: strings$9.paragraphs.map((p, i) => /* @__PURE__ */ jsx("p", { children: p }, i))
							})]
						}),
						/* @__PURE__ */ jsxs(BlurFade, {
							className: "about-reveal",
							delay: .16,
							children: [/* @__PURE__ */ jsxs("div", {
								className: "portfolio-about-actions",
								children: [
									/* @__PURE__ */ jsxs("a", {
										href: getWhatsAppUrl(),
										target: "_blank",
										rel: "noopener noreferrer",
										className: "portfolio-about-button",
										children: [
											strings$9.chat,
											" ",
											/* @__PURE__ */ jsx(WhatsAppIcon, { className: "size-4" })
										]
									}),
									/* @__PURE__ */ jsx("span", { children: strings$9.or }),
									/* @__PURE__ */ jsxs("a", {
										href: INSTAGRAM_URL,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "portfolio-about-social",
										children: [
											strings$9.instagram,
											" ",
											/* @__PURE__ */ jsx(InstagramIcon, { className: "size-4" })
										]
									})
								]
							}), /* @__PURE__ */ jsxs("a", {
								className: "portfolio-about-more",
								href: langPath("/ueber-mich", detectLang()),
								children: [strings$9.more, " →"]
							})]
						})
					]
				})]
			})
		})
	});
}
//#endregion
//#region src/portfolio/StoriesTeaser.tsx
var strings$8 = new LocalizedStrings({
	de: {
		heading: "Deine Story.",
		subtitle: "Fünf Wege, sie festzuhalten.",
		more: "Mehr erfahren",
		stories: [
			{
				name: "FamilyStory",
				tagline: "Familienreportage",
				text: "Draußen in Chemnitz oder bei euch zu Hause. Kein Posieren — nur ihr."
			},
			{
				name: "PregnancyStory",
				tagline: "Babybauch",
				text: "Zwischen der 28. und 34. Woche. Studio, draußen oder bei dir."
			},
			{
				name: "BirthStory",
				tagline: "Geburtsfotografie",
				text: "Die Geburt, diskret festgehalten. Rufbereitschaft ab der 37. Woche."
			},
			{
				name: "LoveStory",
				tagline: "Paare",
				text: "Für zwei, die sich haben — an eurem Ort in Chemnitz."
			},
			{
				name: "YourStory",
				tagline: "Individuelle Fotografie",
				text: "Portrait, Selbstliebe, Business: deine eigene Geschichte."
			}
		]
	},
	ru: {
		heading: "Твоя история.",
		subtitle: "Пять способов её сохранить.",
		more: "Подробнее",
		stories: [
			{
				name: "FamilyStory",
				tagline: "Семейная история",
				text: "На улице в Хемнице или у вас дома. Без поз — только вы."
			},
			{
				name: "PregnancyStory",
				tagline: "Беременность",
				text: "Между 28-й и 34-й неделей. Студия, улица или ваш дом."
			},
			{
				name: "BirthStory",
				tagline: "Съёмка родов",
				text: "Роды, бережно сохранённые. Готовность с 37-й недели."
			},
			{
				name: "LoveStory",
				tagline: "Пары",
				text: "Для двоих, у которых есть друг друг — в вашем месте в Хемнице."
			},
			{
				name: "YourStory",
				tagline: "Индивидуальная фотография",
				text: "Портрет, любовь к себе, бизнес: ваша собственная история."
			}
		]
	}
});
strings$8.setLanguage(detectLang());
/**
* A compact teaser of the five stories on the landing page. The full copy
* lives on /leistungen — the teaser only links there, so the two pages do not
* compete for the same text.
*/
function StoriesTeaser() {
	const href = langPath("/leistungen", detectLang());
	return /* @__PURE__ */ jsx("section", {
		id: "stories",
		"aria-labelledby": "stories-heading",
		className: "portfolio-stories",
		children: /* @__PURE__ */ jsxs("div", {
			className: "portfolio-stories-inner",
			children: [/* @__PURE__ */ jsx(BlurFade, { children: /* @__PURE__ */ jsxs("h2", {
				id: "stories-heading",
				children: [
					strings$8.heading,
					" ",
					/* @__PURE__ */ jsx("em", { children: strings$8.subtitle })
				]
			}) }), /* @__PURE__ */ jsx("div", {
				className: "portfolio-stories-grid",
				children: strings$8.stories.map((story, index) => /* @__PURE__ */ jsx(BlurFade, {
					delay: index * .06,
					children: /* @__PURE__ */ jsxs("a", {
						className: "portfolio-story-card",
						href: `${href}#${story.name.toLowerCase()}`,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "portfolio-story-tagline",
								children: story.tagline
							}),
							/* @__PURE__ */ jsx("span", {
								className: "portfolio-story-name",
								children: story.name
							}),
							/* @__PURE__ */ jsx("span", {
								className: "portfolio-story-text",
								children: story.text
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "portfolio-story-more",
								children: [
									strings$8.more,
									" ",
									/* @__PURE__ */ jsx(ArrowUpRight, {
										className: "size-3.5",
										"aria-hidden": true
									})
								]
							})
						]
					})
				}, story.name))
			})]
		})
	});
}
//#endregion
//#region src/components/magic-ui/number-ticker.tsx
/**
* Magic UI Number Ticker — animates a number when it scrolls into view.
* The optional `minimumIntegerDigits` keeps the process numbers padded.
*/
function NumberTicker({ value, direction = "up", delay = 0, className, decimalPlaces = 0, startValue = 0, minimumIntegerDigits = 1 }) {
	const ref = useRef(null);
	const reduceMotion = useReducedMotion();
	const motionValue = useMotionValue(reduceMotion ? value : startValue);
	const springValue = useSpring(motionValue, reduceMotion ? {
		stiffness: 1e3,
		damping: 100
	} : {
		damping: 20,
		stiffness: 100
	});
	const isInView = useInView(ref, {
		once: true,
		amount: .5
	});
	const format = (input) => new Intl.NumberFormat("en-US", {
		minimumIntegerDigits,
		minimumFractionDigits: decimalPlaces,
		maximumFractionDigits: decimalPlaces,
		useGrouping: false
	}).format(input);
	useEffect(() => {
		if (reduceMotion) {
			if (ref.current) ref.current.textContent = format(value);
			return;
		}
		if (!isInView) return;
		const timer = window.setTimeout(() => {
			motionValue.set(direction === "down" ? startValue : value);
		}, delay * 1e3);
		return () => window.clearTimeout(timer);
	}, [
		motionValue,
		isInView,
		delay,
		value,
		direction,
		startValue,
		reduceMotion
	]);
	useEffect(() => {
		if (reduceMotion) return;
		return springValue.on("change", (latest) => {
			if (ref.current) ref.current.textContent = format(Number(latest.toFixed(decimalPlaces)));
		});
	}, [
		springValue,
		decimalPlaces,
		minimumIntegerDigits,
		reduceMotion
	]);
	return /* @__PURE__ */ jsx("span", {
		ref,
		className: cn("inline-block tabular-nums tracking-wider", className),
		children: format(reduceMotion ? value : startValue)
	});
}
//#endregion
//#region src/portfolio/ProcessSection.tsx
var strings$7 = new LocalizedStrings({
	de: {
		heading: "Echte Momente.",
		headingAccent: "Für immer.",
		intro: "Von der ersten Nachricht bis zu euren fertigen Bildern bin ich an eurer Seite. Persönlich, transparent und unkompliziert.",
		steps: [
			{
				title: "Wir lernen uns kennen",
				text: "Bei einem kurzen Gespräch spüren wir, ob es passt – ganz ohne Druck und Verpflichtung."
			},
			{
				title: "Euer Tag, euer Tempo",
				text: "Kein steifes Posieren. Ich begleite euch behutsam und lasse Raum für das, was von selbst entsteht."
			},
			{
				title: "Erinnerungen bleiben",
				text: "Nach 1–2 Wochen erhaltet ihr eure liebevoll kuratierte Online-Galerie in voller Auflösung."
			}
		]
	},
	ru: {
		heading: "Настоящие моменты.",
		headingAccent: "Навсегда.",
		intro: "От первого сообщения до готовых фотографий я рядом с вами. Лично, прозрачно и без лишних сложностей.",
		steps: [
			{
				title: "Мы знакомимся",
				text: "В коротком разговоре мы поймём, подходим ли друг другу — без давления и обязательств."
			},
			{
				title: "Ваш день, ваш темп",
				text: "Никаких застывших поз. Я бережно сопровождаю вас и оставляю место для того, что происходит само собой."
			},
			{
				title: "Воспоминания остаются",
				text: "Через 1–2 недели вы получите бережно собранную онлайн-галерею в полном разрешении."
			}
		]
	}
});
strings$7.setLanguage(detectLang());
var icons = [
	Check,
	Camera,
	Heart
];
function ProcessSection() {
	return /* @__PURE__ */ jsx("section", {
		id: "process",
		"aria-labelledby": "process-heading",
		className: "portfolio-process",
		children: /* @__PURE__ */ jsxs("div", {
			className: "portfolio-section-inner",
			children: [/* @__PURE__ */ jsxs(BlurFade, {
				className: "portfolio-process-heading",
				children: [/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h2", {
					id: "process-heading",
					children: [
						strings$7.heading,
						" ",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("em", { children: strings$7.headingAccent })
					]
				}) }), /* @__PURE__ */ jsx("p", { children: strings$7.intro })]
			}), /* @__PURE__ */ jsx("div", {
				className: "portfolio-step-grid",
				children: strings$7.steps.map((step, index) => {
					const Icon = icons[index] ?? Check;
					return /* @__PURE__ */ jsxs(BlurFade, {
						className: "portfolio-step",
						delay: index * .08,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "portfolio-step-number",
								children: /* @__PURE__ */ jsx(NumberTicker, {
									value: index + 1,
									minimumIntegerDigits: 2,
									delay: .15
								})
							}),
							/* @__PURE__ */ jsx(Icon, {
								size: 26,
								strokeWidth: 1.7,
								"aria-hidden": true
							}),
							/* @__PURE__ */ jsx("h3", { children: step.title }),
							/* @__PURE__ */ jsx("p", { children: step.text })
						]
					}, step.title);
				})
			})]
		})
	});
}
//#endregion
//#region src/assets/images/portfolio-yourstory-1.webp
var portfolio_yourstory_1_default = "/assets/portfolio-yourstory-1-C0y8H4w_.webp";
//#endregion
//#region src/portfolio/TestimonialSection.tsx
var strings$6 = new LocalizedStrings({
	de: {
		label: "Kundenstimme",
		quote: "„Es fühlte sich nicht wie ein Fotoshooting an. Es war einfach ein schöner Nachmittag als Familie – und jetzt haben wir Bilder, die sich genauso anfühlen.“",
		author: "— Anna & Tobias, Familienreportage"
	},
	ru: {
		label: "Отзыв клиента",
		quote: "«Это совсем не было похоже на фотосессию. Просто прекрасный день всей семьёй — и теперь у нас есть фотографии, которые ощущаются так же.»",
		author: "— Анна и Тобиас, семейная фотосессия"
	}
});
strings$6.setLanguage(detectLang());
function TestimonialSection() {
	return /* @__PURE__ */ jsxs("section", {
		className: "portfolio-testimonial",
		"aria-label": strings$6.label,
		children: [/* @__PURE__ */ jsx("div", {
			className: "portfolio-testimonial-image",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx("img", {
				src: portfolio_yourstory_1_default,
				alt: "",
				loading: "lazy"
			})
		}), /* @__PURE__ */ jsxs(BlurFade, {
			className: "portfolio-quote-card",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "portfolio-stars",
					"aria-hidden": true,
					children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsx(Star, {
						size: 12,
						strokeWidth: 0
					}, index))
				}),
				/* @__PURE__ */ jsx("blockquote", { children: strings$6.quote }),
				/* @__PURE__ */ jsx("p", { children: strings$6.author })
			]
		})]
	});
}
//#endregion
//#region src/portfolio/ContactSection.tsx
var strings$5 = new LocalizedStrings({
	de: {
		heading: "Eure Geschichte",
		headingLine: "beginnt mit",
		headingAccent: "einem Hallo.",
		intro: "Erzählt mir, was ihr festhalten möchtet. Ganz in Ruhe finden wir heraus, was zu euch und eurer Geschichte passt.",
		whatsapp: "Fotoshooting besprechen",
		email: "Oder per E-Mail schreiben"
	},
	ru: {
		heading: "Ваша история",
		headingLine: "начинается с",
		headingAccent: "приветствия.",
		intro: "Расскажите, что вам хотелось бы сохранить. Мы спокойно обсудим, что подойдёт именно вам.",
		whatsapp: "Обсудить съёмку",
		email: "Или написать по почте"
	}
});
strings$5.setLanguage(detectLang());
function ContactSection() {
	return /* @__PURE__ */ jsx("section", {
		id: "contact",
		"aria-labelledby": "contact-heading",
		className: "portfolio-contact",
		children: /* @__PURE__ */ jsx("div", {
			className: "portfolio-contact-inner",
			children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs(BlurFade, {
				className: "contact-reveal",
				children: [/* @__PURE__ */ jsxs("h2", {
					id: "contact-heading",
					children: [
						strings$5.heading,
						" ",
						/* @__PURE__ */ jsx("br", {}),
						strings$5.headingLine,
						" ",
						/* @__PURE__ */ jsx("em", { children: strings$5.headingAccent })
					]
				}), /* @__PURE__ */ jsx("p", {
					className: "portfolio-contact-copy",
					children: strings$5.intro
				})]
			}), /* @__PURE__ */ jsx(BlurFade, {
				className: "contact-reveal",
				delay: .1,
				children: /* @__PURE__ */ jsxs("div", {
					className: "portfolio-contact-actions",
					children: [/* @__PURE__ */ jsxs("a", {
						href: getWhatsAppUrl(),
						target: "_blank",
						rel: "noopener noreferrer",
						className: "portfolio-contact-button",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-3",
							children: [/* @__PURE__ */ jsx(WhatsAppIcon, { className: "size-4" }), strings$5.whatsapp]
						}), /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4" })]
					}), /* @__PURE__ */ jsxs("a", {
						href: `mailto:${EMAIL_ADDRESS}`,
						className: "portfolio-contact-email",
						children: [/* @__PURE__ */ jsx(Mail, { className: "size-4" }), strings$5.email]
					})]
				})
			})] })
		})
	});
}
//#endregion
//#region src/portfolio/SiteFooter.tsx
/**
* Localized footer strings, defined right where they are used. German is
* the first language, so any key missing from Russian falls back to it.
*/
var strings$4 = new LocalizedStrings({
	de: {
		location: "Chemnitz",
		photographer: "Fotografie von Kateryna Hohol",
		portfolio: "Portfolio",
		stories: "Stories",
		about: "Über mich",
		process: "Ablauf",
		contact: "Kontakt",
		backTop: "Zurück nach oben",
		navLabel: "Seitennavigation",
		legalNav: "Rechtliche Informationen",
		legal: [{
			label: "Impressum",
			href: "/impressum"
		}, {
			label: "Datenschutz",
			href: "/datenschutz"
		}]
	},
	ru: {
		location: "Хемниц",
		photographer: "Фотография Катерины Гоголь",
		portfolio: "Портфолио",
		stories: "Истории",
		about: "Обо мне",
		process: "Как всё проходит",
		contact: "Контакт",
		backTop: "Наверх",
		navLabel: "Навигация по сайту",
		legalNav: "Юридическая информация",
		legal: [{
			label: "Реквизиты",
			href: "/impressum"
		}, {
			label: "Конфиденциальность",
			href: "/datenschutz"
		}]
	}
});
strings$4.setLanguage(detectLang());
/**
* The dark footer: the wordmark and location on the left, the legal links
* on the right — side by side on desktop, stacked and centered on mobile,
* as in the reference artwork.
*/
function SiteFooter() {
	const lang = detectLang();
	const home = langPath("/", lang);
	return /* @__PURE__ */ jsx("footer", {
		className: "portfolio-footer",
		children: /* @__PURE__ */ jsxs("div", {
			className: "portfolio-footer-inner",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "portfolio-footer-top",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("p", {
							className: "portfolio-footer-brand",
							children: ["FAMILIEN", /* @__PURE__ */ jsx("em", { children: "STORY" })]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "portfolio-footer-photographer",
							children: strings$4.photographer
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "portfolio-footer-location",
							children: [
								/* @__PURE__ */ jsx(MapPin, { className: "size-3.5" }),
								" ",
								strings$4.location
							]
						})
					] }),
					/* @__PURE__ */ jsxs("nav", {
						className: "portfolio-footer-nav",
						"aria-label": strings$4.navLabel,
						children: [
							/* @__PURE__ */ jsx("a", {
								href: `${home}#portfolio`,
								children: strings$4.portfolio
							}),
							/* @__PURE__ */ jsx("a", {
								href: langPath("/leistungen", lang),
								children: strings$4.stories
							}),
							/* @__PURE__ */ jsx("a", {
								href: langPath("/ueber-mich", lang),
								children: strings$4.about
							}),
							/* @__PURE__ */ jsx("a", {
								href: `${home}#process`,
								children: strings$4.process
							}),
							/* @__PURE__ */ jsx("a", {
								href: `${home}#contact`,
								children: strings$4.contact
							})
						]
					}),
					/* @__PURE__ */ jsxs("a", {
						href: home,
						className: "portfolio-back-top",
						children: [
							strings$4.backTop,
							" ",
							/* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4" })
						]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "portfolio-footer-bottom",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" FAMILIENSTORY · ",
					strings$4.location
				] }), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("a", {
						href: INSTAGRAM_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "portfolio-footer-social",
						children: [/* @__PURE__ */ jsx(InstagramIcon, { className: "size-4" }), " Instagram"]
					}),
					/* @__PURE__ */ jsxs("a", {
						href: getWhatsAppUrl(),
						target: "_blank",
						rel: "noopener noreferrer",
						className: "portfolio-footer-social",
						children: [/* @__PURE__ */ jsx(WhatsAppIcon, { className: "size-4" }), " WhatsApp"]
					}),
					/* @__PURE__ */ jsx("nav", {
						"aria-label": strings$4.legalNav,
						className: "portfolio-footer-legal",
						children: strings$4.legal.map((l) => /* @__PURE__ */ jsx("a", {
							href: langPath(l.href, lang),
							children: l.label
						}, l.label))
					})
				] })]
			})]
		})
	});
}
//#endregion
//#region src/portfolio/lightroom.ts
function isLightroomPortfolioImage(value) {
	if (typeof value !== "object" || value === null) return false;
	const image = value;
	return typeof image.thumbnailUrl === "string" && typeof image.fullUrl === "string" && typeof image.name === "string" && typeof image.albumName === "string" && (typeof image.width === "number" || image.width === null) && (typeof image.height === "number" || image.height === null);
}
//#endregion
//#region src/portfolio/PortfolioPage.tsx
/**
* The photographer's static portfolio at / (SPEC §15).
*
* The page ports the Figma Make redesign: the full-bleed hero with the
* FAMILIENSTORY wordmark, the service marquee, the filterable bento gallery,
* the about panel, the process steps, the testimonial, the dark contact
* section and the footer. All copy is localized (German + Russian) via
* react-localization, defined locally in each section.
*/
function PortfolioPage() {
	const [lightroomImages, setLightroomImages] = useState(null);
	const [lightroomError, setLightroomError] = useState(false);
	useEffect(() => {
		let active = true;
		fetch("/api/portfolio/images").then(async (response) => {
			if (!response.headers.get("content-type")?.includes("application/json")) return null;
			if (!response.ok) throw new Error("Portfolio photos could not be loaded.");
			const result = await response.json();
			if (typeof result !== "object" || result === null) throw new Error("The portfolio photo response is invalid.");
			const body = result;
			if (body.configured === false) throw new Error("The Worker has no Lightroom share configured.");
			if (!Array.isArray(body.images) || !body.images.every(isLightroomPortfolioImage)) throw new Error("The Lightroom photo list is invalid.");
			return body.images;
		}).then((images) => {
			if (active && images) setLightroomImages(images);
		}).catch(() => {
			if (active) setLightroomError(true);
		});
		return () => {
			active = false;
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "portfolio-page",
		children: [
			/* @__PURE__ */ jsx(Hero, {}),
			/* @__PURE__ */ jsx(MarqueeStrip, {}),
			/* @__PURE__ */ jsx(WorkSection, {
				lightroomImages,
				lightroomError
			}),
			/* @__PURE__ */ jsx(StoriesTeaser, {}),
			/* @__PURE__ */ jsx(AboutSection, {}),
			/* @__PURE__ */ jsx(ProcessSection, {}),
			/* @__PURE__ */ jsx(TestimonialSection, {}),
			/* @__PURE__ */ jsx(ContactSection, {}),
			/* @__PURE__ */ jsx(SiteFooter, {})
		]
	});
}
//#endregion
//#region src/portfolio/pages/StoryShell.tsx
var strings$3 = new LocalizedStrings({
	de: {
		work: "Arbeiten",
		stories: "Stories",
		about: "Über mich",
		cta: "Termin anfragen",
		nav: "Hauptnavigation",
		home: "Familienstory – Startseite"
	},
	ru: {
		work: "Работы",
		stories: "Истории",
		about: "Обо мне",
		cta: "Записаться",
		nav: "Главная навигация",
		home: "Familienstory – главная"
	}
});
/** The standalone header of the content pages (About / Stories). */
function StoryShell({ children }) {
	const lang = detectLang();
	strings$3.setLanguage(lang);
	const home = langPath("/", lang);
	return /* @__PURE__ */ jsxs("div", {
		className: "portfolio-page story-page",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "story-header",
				children: [/* @__PURE__ */ jsxs("a", {
					href: home,
					className: "story-brand",
					"aria-label": strings$3.home,
					children: [/* @__PURE__ */ jsx("span", { children: "FAMILIEN" }), /* @__PURE__ */ jsx("em", { children: "STORY" })]
				}), /* @__PURE__ */ jsxs("nav", {
					"aria-label": strings$3.nav,
					className: "story-nav",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: `${home}#portfolio`,
							children: strings$3.work
						}),
						/* @__PURE__ */ jsx("a", {
							href: langPath("/leistungen", lang),
							children: strings$3.stories
						}),
						/* @__PURE__ */ jsx("a", {
							href: langPath("/ueber-mich", lang),
							children: strings$3.about
						}),
						/* @__PURE__ */ jsxs("a", {
							className: "story-nav-cta",
							href: getWhatsAppUrl(),
							target: "_blank",
							rel: "noopener noreferrer",
							children: [strings$3.cta, /* @__PURE__ */ jsx(WhatsAppIcon, { className: "size-4" })]
						}),
						/* @__PURE__ */ jsx(LanguageSwitch, {})
					]
				})]
			}),
			/* @__PURE__ */ jsx("main", {
				className: "story-main",
				children
			}),
			/* @__PURE__ */ jsx(SiteFooter, {})
		]
	});
}
/** A reusable closing call to action for the content pages. */
function StoryCallToAction({ heading, text, whatsapp, instagram, instagramUrl }) {
	return /* @__PURE__ */ jsxs("aside", {
		className: "story-cta",
		"aria-label": heading,
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", { children: heading }), /* @__PURE__ */ jsx("p", { children: text })] }), /* @__PURE__ */ jsxs("div", {
			className: "story-cta-actions",
			children: [/* @__PURE__ */ jsxs("a", {
				className: "story-cta-button",
				href: getWhatsAppUrl(),
				target: "_blank",
				rel: "noopener noreferrer",
				children: [
					/* @__PURE__ */ jsx(WhatsAppIcon, { className: "size-4" }),
					whatsapp,
					/* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4" })
				]
			}), /* @__PURE__ */ jsx("a", {
				className: "story-cta-link",
				href: instagramUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				children: instagram
			})]
		})]
	});
}
//#endregion
//#region src/portfolio/pages/AboutPage.tsx
var strings$2 = new LocalizedStrings({
	de: {
		eyebrow: "Fotografin in Chemnitz",
		title: "Über mich",
		lead: "Ich bin Kateryna — Fotografin in Chemnitz. Ich erzähle Geschichten: FamilyStory, PregnancyStory, BirthStory, LoveStory und YourStory. Vom ersten Bauchfoto über die Geburt bis zum ganz normalen Familienmorgen.",
		portraitAlt: "Kateryna Hohol, Familien- und Geburtsfotografin in Chemnitz, mit ihrer Kamera",
		journeyTitle: "Mein Weg",
		journey: ["Angefangen hat alles mit meiner Tochter. Winzige Hände, der erste Blick, dieses Gefühl, dass von jetzt auf gleich alles anders ist. Ich wollte diese Stunden nicht nur erinnern, sondern wieder sehen können.", "Aus dem Wunsch, den eigenen Moment festzuhalten, wurde eine Leidenschaft — und mit der Zeit mein Beruf. Heute begleite ich Familien in Chemnitz und Umgebung durch genau diese Stunden: die leisen, die lauten, die man später nicht mehr hergeben will."],
		workTitle: "Wie ich arbeite",
		work: [
			"Ich stelle nicht. Ich begleite.",
			"Niemand muss wissen, wohin mit den Händen, und niemand muss für die Kamera lächeln. Ich gehe mit, warte ab, lasse Raum. Die besten Bilder entstehen oft in den Pausen — wenn ein Kind plötzlich losrennt oder sich an deine Schulter lehnt.",
			"Bei einer BirthStory bin ich so unauffällig wie möglich. Die Geburt gehört euch, nicht der Kamera."
		],
		valuesTitle: "Was mir wichtig ist",
		values: [
			"Echte Nähe statt gestellter Lächeln.",
			"Natürliches Licht, wo es geht.",
			"Zeit lassen — kein Shooting im Minutenraster.",
			"Diskretion, besonders bei Geburt und Homestory."
		],
		placesTitle: "Wo ich fotografiere",
		places: [
			"Zu Hause in Chemnitz und in der Umgebung: im Küchwald, am Schlossteich, im Botanischen Garten, bei euch in der Wohnung oder dort, wo eure Geschichte spielt.",
			"Für eine BirthStory komme ich in die Klinik, ins Geburtshaus oder zu euch nach Hause.",
			"Anfahrt: Chemnitz und Umgebung bis etwa 30 km."
		],
		factsTitle: "Kurz & knapp",
		facts: [
			{
				label: "Name",
				value: "Kateryna Hohol"
			},
			{
				label: "Ort",
				value: "Chemnitz, Sachsen"
			},
			{
				label: "Sprachen",
				value: "Deutsch, Russisch"
			},
			{
				label: "Schwerpunkt",
				value: "FamilyStory, PregnancyStory, BirthStory, LoveStory, YourStory"
			},
			{
				label: "Ergebnis",
				value: "Online-Galerie in 1–2 Wochen"
			}
		],
		ctaHeading: "Erzähl mir von deiner Story.",
		ctaText: "Schreib mir auf WhatsApp, ganz unverbindlich. Wir schauen gemeinsam, welche Story zu euch passt.",
		ctaWhatsapp: "Auf WhatsApp schreiben"
	},
	ru: {
		eyebrow: "Фотограф в Хемнице",
		title: "Обо мне",
		lead: "Я Катерина — фотограф в Хемнице. Я рассказываю истории: FamilyStory, PregnancyStory, BirthStory, LoveStory и YourStory. От первого фото живота через роды до самого обычного семейного утра.",
		portraitAlt: "Катерина Гоголь, семейный фотограф и фотограф родов в Хемнице, с камерой",
		journeyTitle: "Мой путь",
		journey: ["Всё началось с моей дочери. Крохотные ручки, первый взгляд, чувство, что с этой минуты всё иначе. Мне хотелось не просто помнить эти часы, а снова их видеть.", "Из желания сохранить собственный момент родилась страсть — а со временем и профессия. Сегодня я сопровождаю семьи в Хемнице и окрестностях через те самые часы: тихие, громкие, те, которые потом уже не отдашь."],
		workTitle: "Как я работаю",
		work: [
			"Я не ставлю кадры. Я иду рядом.",
			"Никому не нужно знать, куда деть руки, и никто не должен улыбаться в камеру. Я иду следом, жду, оставляю место. Лучшие кадры часто рождаются в паузах — когда ребёнок вдруг бежит или прижимается к плечу.",
			"На BirthStory я стараюсь быть как можно незаметнее. Роды принадлежат вам, а не камере."
		],
		valuesTitle: "Что для меня важно",
		values: [
			"Настоящая близость вместо поставленных улыбок.",
			"Естественный свет, где это возможно.",
			"Не спешить — никакой съёмки по минутам.",
			"Деликатность, особенно при родах и домашних историях."
		],
		placesTitle: "Где я снимаю",
		places: [
			"В Хемнице и окрестностях: в Кюхвальде, у Шлосстайха, в Ботаническом саду, у вас дома или там, где живёт ваша история.",
			"На BirthStory я приезжаю в клинику, роддом или к вам домой.",
			"Выезд: Хемниц и окрестности до 30 км."
		],
		factsTitle: "Коротко",
		facts: [
			{
				label: "Имя",
				value: "Катерина Гоголь"
			},
			{
				label: "Город",
				value: "Хемниц, Саксония"
			},
			{
				label: "Языки",
				value: "Немецкий, русский"
			},
			{
				label: "Специализация",
				value: "FamilyStory, PregnancyStory, BirthStory, LoveStory, YourStory"
			},
			{
				label: "Результат",
				value: "Онлайн-галерея через 1–2 недели"
			}
		],
		ctaHeading: "Расскажите мне свою историю.",
		ctaText: "Напишите в WhatsApp, без обязательств. Вместе посмотрим, какая история подойдёт именно вам.",
		ctaWhatsapp: "Написать в WhatsApp"
	}
});
function AboutPage() {
	strings$2.setLanguage(detectLang());
	return /* @__PURE__ */ jsx(StoryShell, { children: /* @__PURE__ */ jsxs("article", {
		className: "story-article",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "story-intro",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "story-eyebrow",
						children: strings$2.eyebrow
					}),
					/* @__PURE__ */ jsx("h1", { children: strings$2.title }),
					/* @__PURE__ */ jsx("p", {
						className: "story-lead",
						children: strings$2.lead
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "story-portrait",
				children: /* @__PURE__ */ jsx("img", {
					src: about_me_default,
					alt: strings$2.portraitAlt,
					width: "900",
					height: "1100",
					loading: "eager"
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "story-section",
				"aria-labelledby": "journey-heading",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "journey-heading",
					children: strings$2.journeyTitle
				}), strings$2.journey.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph.slice(0, 24)))]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "story-section",
				"aria-labelledby": "work-heading",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "work-heading",
					children: strings$2.workTitle
				}), strings$2.work.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph.slice(0, 24)))]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "story-section",
				"aria-labelledby": "values-heading",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "values-heading",
					children: strings$2.valuesTitle
				}), /* @__PURE__ */ jsx("ul", {
					className: "story-list",
					children: strings$2.values.map((value) => /* @__PURE__ */ jsx("li", { children: value }, value))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "story-section",
				"aria-labelledby": "places-heading",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "places-heading",
					children: strings$2.placesTitle
				}), strings$2.places.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph.slice(0, 24)))]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "story-section",
				"aria-labelledby": "facts-heading",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "facts-heading",
					children: strings$2.factsTitle
				}), /* @__PURE__ */ jsx("dl", {
					className: "story-facts",
					children: strings$2.facts.map((fact) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: fact.label }), /* @__PURE__ */ jsx("dd", { children: fact.value })] }, fact.label))
				})]
			}),
			/* @__PURE__ */ jsx(StoryCallToAction, {
				heading: strings$2.ctaHeading,
				text: strings$2.ctaText,
				whatsapp: strings$2.ctaWhatsapp,
				instagram: INSTAGRAM_HANDLE,
				instagramUrl: INSTAGRAM_URL
			})
		]
	}) });
}
//#endregion
//#region src/portfolio/StoryGallery.tsx
var strings$1 = new LocalizedStrings({
	de: {
		loading: "Lade Bilder …",
		error: "Die Bilder konnten gerade nicht geladen werden.",
		empty: "Für diese Story kommen bald Bilder.",
		label: "Bilder"
	},
	ru: {
		loading: "Загружаю фото …",
		error: "Не удалось загрузить фотографии.",
		empty: "Фотографии этой истории скоро появятся.",
		label: "Фотографии"
	}
});
strings$1.setLanguage(detectLang());
/**
* A small per-story gallery fed by its own Lightroom share. It only starts
* fetching when it scrolls near the viewport, so five galleries on one page
* do not fire five requests on load. The prerendered HTML shows the
* placeholder — the story copy itself is always in the static HTML.
*/
function StoryGallery({ story, limit = 6, label }) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	const [images, setImages] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		if (typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				setVisible(true);
				observer.disconnect();
			}
		}, { rootMargin: "400px 0px" });
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	useEffect(() => {
		if (!visible) return;
		let active = true;
		fetch(`/api/stories/${story}/images`).then(async (response) => {
			if (!response.headers.get("content-type")?.includes("application/json")) return null;
			if (!response.ok) throw new Error("Story photos could not be loaded.");
			const result = await response.json();
			if (typeof result !== "object" || result === null) throw new Error("The story photo response is invalid.");
			const body = result;
			if (body.configured === false) return [];
			if (!Array.isArray(body.images) || !body.images.every(isLightroomPortfolioImage)) throw new Error("The Lightroom photo list is invalid.");
			return body.images;
		}).then((result) => {
			if (active && result) setImages(result);
		}).catch(() => {
			if (active) setError(true);
		});
		return () => {
			active = false;
		};
	}, [visible, story]);
	const works = useMemo(() => images ? createLightroomWorks(images.slice(0, limit)) : [], [images, limit]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: "story-gallery",
		"aria-label": label ?? strings$1.label,
		"aria-busy": visible && images === null && !error,
		children: [
			error ? /* @__PURE__ */ jsx("p", {
				role: "alert",
				className: "story-gallery-note",
				children: strings$1.error
			}) : null,
			!error && images === null ? /* @__PURE__ */ jsx("p", {
				className: "story-gallery-note",
				"aria-live": "polite",
				children: visible ? strings$1.loading : null
			}) : null,
			!error && images !== null && works.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "story-gallery-note",
				children: strings$1.empty
			}) : null,
			works.length > 0 ? /* @__PURE__ */ jsx(Gallery, { works }) : null
		]
	});
}
//#endregion
//#region src/portfolio/pages/ServicesPage.tsx
var strings = new LocalizedStrings({
	de: {
		eyebrow: "Leistungen · Chemnitz",
		title: "Deine Story.",
		subtitle: "Fünf Wege, sie festzuhalten.",
		lead: "Familien-, Babybauch-, Geburts- und Paarfotografie in Chemnitz: Jede Geschichte ist anders, deshalb gibt es bei mir nicht das eine Shooting. Wir schauen im Gespräch, welche Story zu euch passt — und wie viel Zeit sie braucht.",
		storiesLabel: "Die Stories",
		factsLabels: {
			forWhom: "Für wen",
			duration: "Dauer",
			where: "Wo",
			result: "Ergebnis"
		},
		stories: [
			{
				name: "FamilyStory",
				key: "familystory",
				tagline: "Familienreportage",
				text: "Für Familien mit Kindern, die keine gestellten Fotos wollen. Ich begleite euch beim Toben, Kuscheln und Quatschmachen — draußen in Chemnitz oder bei euch zu Hause. Auch als Homestory: der ganz normale Morgen, das Bad, das Einschlafen. Familienshooting in Chemnitz, so wie euer Alltag wirklich ist.",
				forWhom: "Familien mit Kindern jeden Alters",
				duration: "etwa 60–90 Minuten",
				where: "draußen in Chemnitz oder bei euch zu Hause",
				result: "Online-Galerie nach 1–2 Wochen"
			},
			{
				name: "PregnancyStory",
				key: "pregnancystory",
				tagline: "Babybauch",
				text: "Der Bauch ist rund und du fühlst dich wohl: Zwischen der 28. und 34. Schwangerschaftswoche ist der ideale Zeitpunkt für dein Babybauchshooting in Chemnitz. Wir fotografieren im Studio, draußen oder bei dir zu Hause — mit Partner, allein oder beides.",
				forWhom: "Schwangere ab der 28. Woche, mit oder ohne Partner",
				duration: "etwa 60 Minuten",
				where: "Studio, draußen oder bei dir zu Hause",
				result: "Outfit-Beratung vorher, Online-Galerie nach 1–2 Wochen"
			},
			{
				name: "BirthStory",
				key: "birthstory",
				tagline: "Geburtsfotografie",
				text: "Die intensivsten Stunden eures Lebens, diskret festgehalten. Geburtsfotografie in Chemnitz beginnt bei mir mit einem Kennenlernen ab der 20. Schwangerschaftswoche. Ab der 37. Woche bin ich in Rufbereitschaft, komme in die Klinik, ins Geburtshaus oder zu euch nach Hause und bleibe 2–3 Stunden nach der Geburt. Niemand muss für die Kamera etwas tun.",
				forWhom: "Eltern, die die Geburt dokumentiert haben möchten",
				duration: "Buchung ab der 20. SSW, Rufbereitschaft ab der 37. SSW",
				where: "Klinik, Geburtshaus oder Hausgeburt in Chemnitz und Umgebung",
				result: "Online-Galerie nach 2–3 Wochen"
			},
			{
				name: "LoveStory",
				key: "lovestory",
				tagline: "Paare",
				text: "Für zwei, die sich haben. Kein steifes Ineinanderstehen, sondern das, was zwischen euch passiert. Ein Paarshooting in Chemnitz, drinnen oder draußen, an eurem Lieblingsort oder dort, wo eure Geschichte angefangen hat.",
				forWhom: "Paare, Verliebte, Verlobte und frisch Verheiratete",
				duration: "etwa 45–60 Minuten",
				where: "an eurem Wunschort in Chemnitz",
				result: "Online-Galerie nach 1–2 Wochen"
			},
			{
				name: "YourStory",
				key: "yourstory",
				tagline: "Individuelle Fotografie",
				text: "Alles, was sonst nirgends hineinpasst: Portrait, Selbstliebe, Freundschaften, Business oder ein besonderer Anlass. Du erzählst mir, was du festhalten willst — ich baue die Story darum. Individuelle Fotografie in Chemnitz, ganz nach deinem Tempo.",
				forWhom: "Menschen mit einer eigenen Idee",
				duration: "nach Absprache",
				where: "Studio, draußen oder bei dir",
				result: "Online-Galerie nach 1–2 Wochen"
			}
		],
		processTitle: "So läuft es ab",
		process: [
			{
				title: "Wir lernen uns kennen",
				text: "Kurze Nachricht, kurzes Gespräch — wir spüren, ob es passt. Ganz ohne Druck."
			},
			{
				title: "Wir planen deine Story",
				text: "Ort, Zeit, Kleidung, Ablauf. Du musst nichts vorbereiten, außer da zu sein."
			},
			{
				title: "Wir fotografieren",
				text: "Ich begleite, du lebst. Kein Posieren, kein Zeitdruck."
			},
			{
				title: "Deine Galerie",
				text: "Nach 1–2 Wochen bekommst du deine Bilder in voller Auflösung als Online-Galerie."
			}
		],
		goodToKnowTitle: "Gut zu wissen",
		goodToKnow: [
			"Die professionelle Bearbeitung ist bei jeder Story inklusive.",
			"Deine Bilder bekommst du als Online-Galerie in voller Auflösung.",
			"Anfahrt in Chemnitz und Umgebung bis etwa 30 km.",
			"Outfit-Beratung vor dem Shooting, wenn du möchtest."
		],
		ctaHeading: "Preise? Jede Story ist anders.",
		ctaText: "Deshalb gibt es keine Liste. Schreib mir auf WhatsApp, erzähl kurz, was du vorhast — du bekommst ein passendes Angebot.",
		ctaWhatsapp: "Story besprechen"
	},
	ru: {
		eyebrow: "Услуги · Хемниц",
		title: "Твоя история.",
		subtitle: "Пять способов её сохранить.",
		lead: "Семейная, беременная, родовая и парная фотография в Хемнице: каждая история особенная, поэтому у меня нет одной универсальной съёмки. Мы обсудим, какая история подойдёт именно вам — и сколько времени ей нужно.",
		storiesLabel: "Истории",
		factsLabels: {
			forWhom: "Для кого",
			duration: "Длительность",
			where: "Где",
			result: "Результат"
		},
		stories: [
			{
				name: "FamilyStory",
				key: "familystory",
				tagline: "Семейная история",
				text: "Для семей с детьми, которым не нужны постановочные фото. Я иду рядом, пока вы бегаете, обнимаетесь и дурачитесь — на улице в Хемнице или у вас дома. В том числе как домашняя история: самое обычное утро, ванна, засыпание. Семейная съёмка в Хемнице — такая, какая есть ваша жизнь.",
				forWhom: "Семьи с детьми любого возраста",
				duration: "около 60–90 минут",
				where: "на улице в Хемнице или у вас дома",
				result: "онлайн-галерея через 1–2 недели"
			},
			{
				name: "PregnancyStory",
				key: "pregnancystory",
				tagline: "Беременность",
				text: "Живот уже округлился, и вы чувствуете себя хорошо: лучшее время для съёмки беременности в Хемнице — между 28-й и 34-й неделей. Снимаем в студии, на улице или у вас дома — с партнёром, одна или оба варианта.",
				forWhom: "Беременные с 28-й недели, с партнёром или без",
				duration: "около 60 минут",
				where: "студия, улица или ваш дом",
				result: "консультация по одежде заранее, галерея через 1–2 недели"
			},
			{
				name: "BirthStory",
				key: "birthstory",
				tagline: "Съёмка родов",
				text: "Самые интенсивные часы вашей жизни, бережно сохранённые. Съёмка родов в Хемнице начинается со знакомства с 20-й недели беременности. С 37-й недели я на связи, приезжаю в клинику, роддом или к вам домой и остаюсь на 2–3 часа после рождения. Никому не нужно ничего делать для камеры.",
				forWhom: "Родители, которые хотят сохранить роды",
				duration: "запись с 20-й недели, готовность с 37-й недели",
				where: "клиника, роддом или домашние роды в Хемнице и окрестностях",
				result: "онлайн-галерея через 2–3 недели"
			},
			{
				name: "LoveStory",
				key: "lovestory",
				tagline: "Пары",
				text: "Для двоих, у которых есть друг друг. Не застывшие позы, а то, что происходит между вами. Съёмка пары в Хемнице — в помещении или на улице, в вашем любимом месте или там, где началась ваша история.",
				forWhom: "Пары, влюблённые, помолвленные и молодожёны",
				duration: "около 45–60 минут",
				where: "в выбранном вами месте в Хемнице",
				result: "онлайн-галерея через 1–2 недели"
			},
			{
				name: "YourStory",
				key: "yourstory",
				tagline: "Индивидуальная фотография",
				text: "Всё, что не помещается в другие истории: портрет, любовь к себе, дружба, бизнес или особый повод. Вы рассказываете, что хотите сохранить, — я строю историю вокруг этого. Индивидуальная фотография в Хемнице, в вашем темпе.",
				forWhom: "Люди со своей идеей",
				duration: "по договорённости",
				where: "студия, улица или у вас",
				result: "онлайн-галерея через 1–2 недели"
			}
		],
		processTitle: "Как всё проходит",
		process: [
			{
				title: "Мы знакомимся",
				text: "Короткое сообщение, короткий разговор — понимаем, подходим ли друг другу. Без давления."
			},
			{
				title: "Планируем вашу историю",
				text: "Место, время, одежда, ход съёмки. Вам не нужно ничего готовить, кроме себя."
			},
			{
				title: "Снимаем",
				text: "Я иду рядом, вы живёте. Никаких поз и спешки."
			},
			{
				title: "Ваша галерея",
				text: "Через 1–2 недели вы получаете фото в полном разрешении в онлайн-галерее."
			}
		],
		goodToKnowTitle: "Полезно знать",
		goodToKnow: [
			"Профессиональная обработка входит в каждую историю.",
			"Фото вы получаете в онлайн-галерее в полном разрешении.",
			"Выезд по Хемницу и окрестностям до 30 км.",
			"Консультация по одежде перед съёмкой, если хотите."
		],
		ctaHeading: "Цены? Каждая история особенная.",
		ctaText: "Поэтому списка цен нет. Напишите в WhatsApp, коротко расскажите, что задумали, — получите подходящее предложение.",
		ctaWhatsapp: "Обсудить историю"
	}
});
function ServicesPage() {
	strings.setLanguage(detectLang());
	return /* @__PURE__ */ jsx(StoryShell, { children: /* @__PURE__ */ jsxs("article", {
		className: "story-article",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "story-intro",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "story-eyebrow",
						children: strings.eyebrow
					}),
					/* @__PURE__ */ jsxs("h1", { children: [
						strings.title,
						" ",
						/* @__PURE__ */ jsx("em", { children: strings.subtitle })
					] }),
					/* @__PURE__ */ jsx("p", {
						className: "story-lead",
						children: strings.lead
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "story-section",
				"aria-label": strings.storiesLabel,
				children: /* @__PURE__ */ jsx("div", {
					className: "story-cards",
					children: strings.stories.map((story) => /* @__PURE__ */ jsxs("section", {
						id: story.name.toLowerCase(),
						className: "story-card",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "story-card-tagline",
								children: story.tagline
							}),
							/* @__PURE__ */ jsx("h2", { children: story.name }),
							/* @__PURE__ */ jsx("p", { children: story.text }),
							/* @__PURE__ */ jsxs("dl", {
								className: "story-facts",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: strings.factsLabels.forWhom }), /* @__PURE__ */ jsx("dd", { children: story.forWhom })] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: strings.factsLabels.duration }), /* @__PURE__ */ jsx("dd", { children: story.duration })] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: strings.factsLabels.where }), /* @__PURE__ */ jsx("dd", { children: story.where })] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: strings.factsLabels.result }), /* @__PURE__ */ jsx("dd", { children: story.result })] })
								]
							}),
							/* @__PURE__ */ jsx(StoryGallery, {
								story: story.key,
								label: `${story.name} — ${story.tagline}`
							})
						]
					}, story.name))
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "story-section",
				"aria-labelledby": "process-heading",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "process-heading",
					children: strings.processTitle
				}), /* @__PURE__ */ jsx("ol", {
					className: "story-steps",
					children: strings.process.map((step) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("h3", { children: step.title }), /* @__PURE__ */ jsx("p", { children: step.text })] }, step.title))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "story-section",
				"aria-labelledby": "good-heading",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "good-heading",
					children: strings.goodToKnowTitle
				}), /* @__PURE__ */ jsx("ul", {
					className: "story-list",
					children: strings.goodToKnow.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item))
				})]
			}),
			/* @__PURE__ */ jsx(StoryCallToAction, {
				heading: strings.ctaHeading,
				text: strings.ctaText,
				whatsapp: strings.ctaWhatsapp,
				instagram: INSTAGRAM_HANDLE,
				instagramUrl: INSTAGRAM_URL
			})
		]
	}) });
}
//#endregion
//#region src/legal/LegalPage.tsx
/** Brand facts shared by the legal pages (proper nouns, not localized). */
var BRAND = {
	name: "FAMILIENSTORY",
	location: "Chemnitz"
};
/** Localized strings for the legal page layout */
var layoutStrings = new LocalizedStrings({
	de: {
		backToHome: "Zurück zur Website",
		copyright: (year) => `© ${year} ${BRAND.name}`
	},
	ru: {
		backToHome: "Вернуться на сайт",
		copyright: (year) => `© ${year} ${BRAND.name}`
	}
});
/**
* A standalone legal page (Impressum / Datenschutzerklärung) in the portfolio
* design. Legal pages must be on their own, permanently reachable pages
* (separate from the main content), so each lives at its own route.
* 
* Matches the portfolio style with:
* - Company wordmark/logo in header using Aboreto font
* - Cream background with consistent typography
* - Dark footer matching the portfolio footer
*/
function LegalPage({ title, intro, children }) {
	layoutStrings.setLanguage(detectLang());
	useEffect(() => {
		document.title = `${title} — ${BRAND.name}`;
		return () => {
			document.title = "Familien Story — Baby, Geburt & Familie";
		};
	}, [title]);
	return /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-cream font-sans text-ink",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "border-b border-linen",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4 sm:px-8",
					children: [/* @__PURE__ */ jsx("a", {
						href: "/",
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ jsx("span", {
							className: "font-signature text-xl tracking-tight",
							children: BRAND.name
						})
					}), /* @__PURE__ */ jsxs("a", {
						href: "/",
						className: "inline-flex min-h-11 items-center gap-1.5 text-[12px] tracking-[0.1em] text-fawn uppercase transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
						children: [
							layoutStrings.backToHome,
							" ",
							/* @__PURE__ */ jsx(ArrowUpRight, { className: "size-3.5" })
						]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-3xl px-5 py-14 sm:px-8",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "break-words font-serif text-4xl leading-tight tracking-tight hyphens-auto sm:text-5xl",
						children: title
					}),
					intro ? /* @__PURE__ */ jsx("p", {
						className: "mt-4 text-sm leading-relaxed text-ink/60",
						children: intro
					}) : null,
					/* @__PURE__ */ jsx("div", {
						className: "mt-10 space-y-8",
						children
					})
				]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "bg-cocoa-deep text-cream",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center md:text-left",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-lg font-light tracking-[0.22em]",
							children: BRAND.name
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-3 flex items-center justify-center gap-1.5 text-[12px] text-cream/60 md:justify-start",
							children: [
								/* @__PURE__ */ jsx(MapPin, { className: "size-3.5" }),
								" ",
								BRAND.location
							]
						})]
					}), /* @__PURE__ */ jsxs("nav", {
						className: "flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-cream/70 md:justify-end",
						children: [/* @__PURE__ */ jsx("a", {
							href: "/datenschutz",
							className: "transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream",
							children: detectLang() === "ru" ? "Конфиденциальность" : "Datenschutz"
						}), /* @__PURE__ */ jsx("a", {
							href: "/impressum",
							className: "transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream",
							children: detectLang() === "ru" ? "Реквизиты" : "Impressum"
						})]
					})]
				})
			})
		]
	});
}
/** A numbered/heading block within a legal page. */
function LegalSection({ title, children }) {
	return /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
		className: "break-words font-serif text-2xl leading-tight tracking-tight hyphens-auto",
		children: title
	}), /* @__PURE__ */ jsx("div", {
		className: "mt-3 space-y-3 text-sm leading-relaxed text-ink/70",
		children
	})] });
}
//#endregion
//#region src/legal/ImpressumPage.tsx
/** Required provider details (proper nouns, not localized). */
var CONTACT$1 = {
	brand: PHOTOGRAPHER_BRAND,
	name: PHOTOGRAPHER_NAME,
	strasse: PHOTOGRAPHER_STREET,
	plz: PHOTOGRAPHER_PLZ,
	ort: PHOTOGRAPHER_ORT,
	email: EMAIL_ADDRESS,
	whatsapp: WHATSAPP_PHONE
};
/**
* Impressum (own page, /impressum) — only the details required by § 5 DDG:
* provider, address and a fast electronic contact.
*
* Add a VAT ID (and register/authority details) here only if the business
* actually has one. No other information is published on this page.
*/
function ImpressumPage() {
	return /* @__PURE__ */ jsxs(LegalPage, {
		title: "Impressum",
		intro: "Angaben gemäß § 5 DDG.",
		children: [
			/* @__PURE__ */ jsx(LegalSection, {
				title: "Anbieter",
				children: /* @__PURE__ */ jsxs("p", { children: [
					CONTACT$1.name,
					/* @__PURE__ */ jsx("br", {}),
					CONTACT$1.brand,
					/* @__PURE__ */ jsx("br", {}),
					CONTACT$1.strasse,
					/* @__PURE__ */ jsx("br", {}),
					CONTACT$1.plz,
					" ",
					CONTACT$1.ort
				] })
			}),
			/* @__PURE__ */ jsx(LegalSection, {
				title: "Kontakt",
				children: /* @__PURE__ */ jsxs("p", { children: [
					"E-Mail:",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: `mailto:${CONTACT$1.email}`,
						className: "underline underline-offset-4 transition-colors hover:text-ink",
						children: CONTACT$1.email
					}),
					/* @__PURE__ */ jsx("br", {}),
					"WhatsApp: ",
					CONTACT$1.whatsapp
				] })
			}),
			/* @__PURE__ */ jsx(LegalSection, {
				title: "Verbraucherstreitbeilegung",
				children: /* @__PURE__ */ jsx("p", { children: "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." })
			})
		]
	});
}
//#endregion
//#region src/legal/DatenschutzPage.tsx
/** Contact details (proper nouns, not localized). */
var CONTACT = {
	brand: "FAMILIENSTORY",
	whatsapp: WHATSAPP_PHONE,
	email: EMAIL_ADDRESS,
	location: "Chemnitz",
	strasse: "Rosenhof 7",
	ort: "09111, Chemnitz"
};
/**
* Datenschutzerklärung (own page, /datenschutz) — DSGVO.
*
* Tailored to what this site actually does: Cloudflare hosting, the Adobe
* Lightroom Cloud share API behind the client galleries, server log files, and
* the admin session cookie. Contact details come from the shared portfolio data.
* (The display typeface is bundled locally, so no third-party font CDN is used.)
*/
function DatenschutzPage() {
	return /* @__PURE__ */ jsxs(LegalPage, {
		title: "Datenschutzerklärung",
		intro: "Hinweise zum Umgang mit personenbezogenen Daten auf dieser Website gemäß EU-Datenschutz-Grundverordnung (DSGVO).",
		children: [
			/* @__PURE__ */ jsx(LegalSection, {
				title: "01 · Verantwortlicher",
				children: /* @__PURE__ */ jsxs("div", { children: [
					CONTACT.brand,
					/* @__PURE__ */ jsx("br", {}),
					/* @__PURE__ */ jsx("p", { children: CONTACT.strasse }),
					/* @__PURE__ */ jsx("p", { children: CONTACT.ort }),
					/* @__PURE__ */ jsx("br", {}),
					"WhatsApp: ",
					CONTACT.whatsapp,
					/* @__PURE__ */ jsx("br", {}),
					"E-Mail: ",
					CONTACT.email
				] })
			}),
			/* @__PURE__ */ jsxs(LegalSection, {
				title: "02 · Allgemeines zur Datenverarbeitung",
				children: [/* @__PURE__ */ jsx("p", { children: "Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt ausschließlich auf Grundlage der nachfolgend genannten Rechtsgrundlagen. Wenn wir Daten für einen bestimmten Zweck verarbeiten, geben wir die Rechtsgrundlage an." }), /* @__PURE__ */ jsx("p", { children: "Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind, z. B. Name, E-Mail-Adresse oder Nutzungsverhalten. Wir treffen alle erforderlichen technischen und organisatorischen Maßnahmen, um die Sicherheit der Daten zu schützen." })]
			}),
			/* @__PURE__ */ jsxs(LegalSection, {
				title: "03 · Hosting und Server-Logfiles",
				children: [
					/* @__PURE__ */ jsx("p", { children: "Diese Website wird über Cloudflare gehostet. Beim Aufruf der Website werden durch den Server automatisch Informationen gesammelt und als „Server-Logfiles\" gespeichert:" }),
					/* @__PURE__ */ jsxs("ul", {
						className: "list-disc space-y-1 pl-5",
						children: [
							/* @__PURE__ */ jsx("li", { children: "verwendeter Browser und Betriebssystem" }),
							/* @__PURE__ */ jsx("li", { children: "Zugriffszeit und -dauer" }),
							/* @__PURE__ */ jsx("li", { children: "verwendete IP-Adresse" }),
							/* @__PURE__ */ jsx("li", { children: "Quelle/Verweis, von welcher Website der Nutzer auf diese Seite gelangt ist" })
						]
					}),
					/* @__PURE__ */ jsx("p", { children: "Die Speicherung erfolgt aus Sicherheitsgründen, z. B. um Missbrauchsfälle aufklären zu können. Die Logfiles werden nach spätestens 14 Tagen gelöscht. Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Rechtsgrundlage ist unser berechtigtes Interesse an der sicheren und zuverlässigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO)." })
				]
			}),
			/* @__PURE__ */ jsxs(LegalSection, {
				title: "04 · Client-Galleries (Adobe Lightroom Cloud)",
				children: [/* @__PURE__ */ jsx("p", { children: "Für die privaten Kunden-Galleries (unter /q/…) verlinken wir auf Bilder, die in der Adobe Lightroom Cloud von Adobe Inc. gespeichert sind. Die Galerie-URL selbst enthält nur einen verschlüsselten, nicht rückverfolgbaren Schlüssel; eine Zuordnung zu einer natürlichen Person findet nicht statt." }), /* @__PURE__ */ jsx("p", { children: "Beim Laden der Galerie werden die Bilder über einen Proxy auf unserem Server (Cloudflare) von den Adobe-Servern bezogen. Dabei kann Adobe Ihre IP-Adresse erhalten. Rechtsgrundlage ist unser berechtigtes Interesse an der Bereitstellung der Galerie (Art. 6 Abs. 1 lit. f DSGVO)." })]
			}),
			/* @__PURE__ */ jsxs(LegalSection, {
				title: "05 · Cookies",
				children: [/* @__PURE__ */ jsx("p", { children: "Diese Website setzt keine Tracking- oder Marketing-Cookies. Im Admin-Bereich wird ein technisch notwendiges Session-Cookie gesetzt, um eine Anmeldung aufrechtzuerhalten; es wird nach 12 Stunden abgelaufen und enthält keine personenbezogenen Daten." }), /* @__PURE__ */ jsx("p", { children: "Sie können Ihren Browser so einstellen, dass Sie Cookies ablehnen oder vor dem Setzen benachrichtigt werden. Das Deaktivieren kann die Funktionalität der Website einschränken." })]
			}),
			/* @__PURE__ */ jsxs(LegalSection, {
				title: "06 · Ihre Rechte",
				children: [
					/* @__PURE__ */ jsx("p", { children: "Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden Daten:" }),
					/* @__PURE__ */ jsxs("ul", {
						className: "list-disc space-y-1 pl-5",
						children: [
							/* @__PURE__ */ jsx("li", { children: "Recht auf Auskunft (Art. 15 DSGVO)" }),
							/* @__PURE__ */ jsx("li", { children: "Recht auf Berichtigung (Art. 16 DSGVO)" }),
							/* @__PURE__ */ jsx("li", { children: "Recht auf Löschung (Art. 17 DSGVO)" }),
							/* @__PURE__ */ jsx("li", { children: "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)" }),
							/* @__PURE__ */ jsx("li", { children: "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)" }),
							/* @__PURE__ */ jsx("li", { children: "Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)" }),
							/* @__PURE__ */ jsx("li", { children: "Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)" })
						]
					}),
					/* @__PURE__ */ jsx("p", { children: "Sie haben zudem das Recht, sich bei einer Datenschutzbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren." })
				]
			}),
			/* @__PURE__ */ jsxs(LegalSection, {
				title: "07 · Widerruf, Beschwerde",
				children: [/* @__PURE__ */ jsx("p", { children: "Die Verarbeitung, die auf Ihrer Einwilligung beruht, können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Ein Widerruf berührt die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung." }), /* @__PURE__ */ jsxs("p", { children: [
					"Bei Fragen oder Anliegen zum Datenschutz erreichen Sie uns per WhatsApp: ",
					CONTACT.whatsapp,
					"."
				] })]
			})
		]
	});
}
//#endregion
//#region src/App.tsx
/**
* The route table, shared by the client entry and the build-time prerender.
* German lives at the root, Russian under `/ru` so both languages have their
* own indexable URLs.
*/
function App() {
	return /* @__PURE__ */ jsxs(Routes, { children: [
		/* @__PURE__ */ jsx(Route, {
			path: "/",
			element: /* @__PURE__ */ jsx(PortfolioPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/leistungen",
			element: /* @__PURE__ */ jsx(ServicesPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/ueber-mich",
			element: /* @__PURE__ */ jsx(AboutPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/impressum",
			element: /* @__PURE__ */ jsx(ImpressumPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/datenschutz",
			element: /* @__PURE__ */ jsx(DatenschutzPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/ru",
			element: /* @__PURE__ */ jsx(PortfolioPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/ru/leistungen",
			element: /* @__PURE__ */ jsx(ServicesPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/ru/ueber-mich",
			element: /* @__PURE__ */ jsx(AboutPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/ru/impressum",
			element: /* @__PURE__ */ jsx(ImpressumPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "/ru/datenschutz",
			element: /* @__PURE__ */ jsx(DatenschutzPage, {})
		}),
		/* @__PURE__ */ jsx(Route, {
			path: "*",
			element: /* @__PURE__ */ jsx(Navigate, {
				to: "/",
				replace: true
			})
		})
	] });
}
//#endregion
//#region src/entry-server.tsx
/**
* Renders one route to static HTML for the build-time prerender step.
* The language is chosen by the prerender script via `__PRERENDER_LANG__`,
* because the localized strings are set at module scope.
*/
function render(url) {
	return renderToString(/* @__PURE__ */ jsx(StaticRouter, {
		location: url,
		children: /* @__PURE__ */ jsx(App, {})
	}));
}
//#endregion
export { render };
