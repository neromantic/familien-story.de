import LocalizedStrings from "react-localization";
import { cn } from "@/lib/utils";
import { detectLang, setLang } from "./lang";

const strings = new LocalizedStrings({
  de: {
    label: "RU",
    ariaLabel: "Auf Russisch umstellen",
  },
  ru: {
    label: "DE",
    ariaLabel: "Переключить на немецкий",
  },
});
strings.setLanguage(detectLang());

export function LanguageSwitch({ className }: { className?: string }) {
  const nextLanguage = detectLang() === "de" ? "ru" : "de";

  return (
    <button
      type="button"
      aria-label={strings.ariaLabel}
      onClick={() => {
        setLang(nextLanguage);
        window.location.reload();
      }}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center border border-cream/70 px-3 text-[10px] font-medium tracking-[0.12em] uppercase transition-colors hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream",
        className,
      )}
    >
      {strings.label}
    </button>
  );
}
