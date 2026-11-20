import { LegalPage, LegalSection } from "./LegalPage";
import { EMAIL_ADDRESS, WHATSAPP_PHONE, PHOTOGRAPHER_NAME, PHOTOGRAPHER_BRAND, PHOTOGRAPHER_STREET, PHOTOGRAPHER_PLZ, PHOTOGRAPHER_ORT } from "@/portfolio/config";

/** Required provider details (proper nouns, not localized). */
const CONTACT = {
  brand: PHOTOGRAPHER_BRAND,
  name: PHOTOGRAPHER_NAME,
  strasse: PHOTOGRAPHER_STREET,
  plz: PHOTOGRAPHER_PLZ,
  ort: PHOTOGRAPHER_ORT,
  email: EMAIL_ADDRESS,
  whatsapp: WHATSAPP_PHONE,
} as const;

/**
 * Impressum (own page, /impressum) — only the details required by § 5 DDG:
 * provider, address and a fast electronic contact.
 *
 * Add a VAT ID (and register/authority details) here only if the business
 * actually has one. No other information is published on this page.
 */
export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" intro="Angaben gemäß § 5 DDG.">
      <LegalSection title="Anbieter">
        <p>
          {CONTACT.name}
          <br />
          {CONTACT.brand}
          <br />
          {CONTACT.strasse}
          <br />
          {CONTACT.plz} {CONTACT.ort}
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          E-Mail:{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="underline underline-offset-4 transition-colors hover:text-ink"
          >
            {CONTACT.email}
          </a>
          <br />
          WhatsApp: {CONTACT.whatsapp}
        </p>
      </LegalSection>

      <LegalSection title="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
