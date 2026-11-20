import { LegalPage, LegalSection } from "./LegalPage";
import { EMAIL_ADDRESS, WHATSAPP_PHONE } from "@/portfolio/config";

/** Contact details (proper nouns, not localized). */
const CONTACT = {
  brand: "FAMILIENSTORY",
  whatsapp: WHATSAPP_PHONE,
  email: EMAIL_ADDRESS,
  location: "Chemnitz",
  strasse: "Rosenhof 7",
  ort: "09111, Chemnitz",
} as const;

/**
 * Datenschutzerklärung (own page, /datenschutz) — DSGVO.
 *
 * Tailored to what this site actually does: Cloudflare hosting, the Adobe
 * Lightroom Cloud share API behind the client galleries, server log files, and
 * the admin session cookie. Contact details come from the shared portfolio data.
 * (The display typeface is bundled locally, so no third-party font CDN is used.)
 */
export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Hinweise zum Umgang mit personenbezogenen Daten auf dieser Website gemäß EU-Datenschutz-Grundverordnung (DSGVO)."
    >
      <LegalSection title="01 · Verantwortlicher">
        <div>
          {CONTACT.brand}
          <br />
          <p>{CONTACT.strasse}</p>
          <p>{CONTACT.ort}</p>
          <br />
          WhatsApp: {CONTACT.whatsapp}
          <br />
          E-Mail: {CONTACT.email}
        </div>
      </LegalSection>

      <LegalSection title="02 · Allgemeines zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich
          nur, soweit dies zur Bereitstellung einer funktionsfähigen Website
          sowie unserer Inhalte und Leistungen erforderlich ist. Die
          Verarbeitung erfolgt ausschließlich auf Grundlage der nachfolgend
          genannten Rechtsgrundlagen. Wenn wir Daten für einen bestimmten Zweck
          verarbeiten, geben wir die Rechtsgrundlage an.
        </p>
        <p>
          Personenbezogene Daten sind alle Daten, die auf Sie persönlich
          beziehbar sind, z. B. Name, E-Mail-Adresse oder Nutzungsverhalten. Wir
          treffen alle erforderlichen technischen und organisatorischen
          Maßnahmen, um die Sicherheit der Daten zu schützen.
        </p>
      </LegalSection>

      <LegalSection title="03 · Hosting und Server-Logfiles">
        <p>
          Diese Website wird über Cloudflare gehostet. Beim Aufruf der Website
          werden durch den Server automatisch Informationen gesammelt und als
          „Server-Logfiles" gespeichert:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>verwendeter Browser und Betriebssystem</li>
          <li>Zugriffszeit und -dauer</li>
          <li>verwendete IP-Adresse</li>
          <li>
            Quelle/Verweis, von welcher Website der Nutzer auf diese Seite
            gelangt ist
          </li>
        </ul>
        <p>
          Die Speicherung erfolgt aus Sicherheitsgründen, z. B. um
          Missbrauchsfälle aufklären zu können. Die Logfiles werden nach
          spätestens 14 Tagen gelöscht. Eine Zusammenführung mit anderen
          Datenquellen findet nicht statt. Rechtsgrundlage ist unser
          berechtigtes Interesse an der sicheren und zuverlässigen
          Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </LegalSection>

      <LegalSection title="04 · Client-Galleries (Adobe Lightroom Cloud)">
        <p>
          Für die privaten Kunden-Galleries (unter /q/…) verlinken wir auf
          Bilder, die in der Adobe Lightroom Cloud von Adobe Inc. gespeichert
          sind. Die Galerie-URL selbst enthält nur einen verschlüsselten, nicht
          rückverfolgbaren Schlüssel; eine Zuordnung zu einer natürlichen Person
          findet nicht statt.
        </p>
        <p>
          Beim Laden der Galerie werden die Bilder über einen Proxy auf unserem
          Server (Cloudflare) von den Adobe-Servern bezogen. Dabei kann Adobe
          Ihre IP-Adresse erhalten. Rechtsgrundlage ist unser berechtigtes
          Interesse an der Bereitstellung der Galerie (Art. 6 Abs. 1 lit. f
          DSGVO).
        </p>
      </LegalSection>

      <LegalSection title="05 · Cookies">
        <p>
          Diese Website setzt keine Tracking- oder Marketing-Cookies. Im
          Admin-Bereich wird ein technisch notwendiges Session-Cookie gesetzt,
          um eine Anmeldung aufrechtzuerhalten; es wird nach 12 Stunden
          abgelaufen und enthält keine personenbezogenen Daten.
        </p>
        <p>
          Sie können Ihren Browser so einstellen, dass Sie Cookies ablehnen oder
          vor dem Setzen benachrichtigt werden. Das Deaktivieren kann die
          Funktionalität der Website einschränken.
        </p>
      </LegalSection>

      <LegalSection title="06 · Ihre Rechte">
        <p>
          Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
          betreffenden Daten:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>
          Sie haben zudem das Recht, sich bei einer Datenschutzbehörde über die
          Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
        </p>
      </LegalSection>

      <LegalSection title="07 · Widerruf, Beschwerde">
        <p>
          Die Verarbeitung, die auf Ihrer Einwilligung beruht, können Sie
          jederzeit mit Wirkung für die Zukunft widerrufen. Ein Widerruf berührt
          die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung.
        </p>
        <p>
          Bei Fragen oder Anliegen zum Datenschutz erreichen Sie uns per
          WhatsApp: {CONTACT.whatsapp}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
