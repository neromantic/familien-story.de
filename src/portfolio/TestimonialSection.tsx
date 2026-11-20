import LocalizedStrings from "react-localization";
import { Star } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { detectLang } from "./lang";
import portfolioYourstory1 from "@/assets/images/portfolio-yourstory-1.webp";

const strings = new LocalizedStrings({
  de: {
    label: "Kundenstimme",
    quote:
      "„Es fühlte sich nicht wie ein Fotoshooting an. Es war einfach ein schöner Nachmittag als Familie – und jetzt haben wir Bilder, die sich genauso anfühlen.“",
    author: "— Anna & Tobias, Familienreportage",
  },
  ru: {
    label: "Отзыв клиента",
    quote:
      "«Это совсем не было похоже на фотосессию. Просто прекрасный день всей семьёй — и теперь у нас есть фотографии, которые ощущаются так же.»",
    author: "— Анна и Тобиас, семейная фотосессия",
  },
});
strings.setLanguage(detectLang());

export function TestimonialSection() {
  return (
    <section className="portfolio-testimonial" aria-label={strings.label}>
      <div className="portfolio-testimonial-image" aria-hidden>
        <img src={portfolioYourstory1} alt="" loading="lazy" />
      </div>
      <BlurFade className="portfolio-quote-card">
        <div className="portfolio-stars" aria-hidden>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={12} strokeWidth={0} />
          ))}
        </div>
        <blockquote>{strings.quote}</blockquote>
        <p>{strings.author}</p>
      </BlurFade>
    </section>
  );
}
