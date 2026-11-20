// Photographer contact details — injected at build-time via VITE_ environment
// variables. Set these in .env locally and as GitHub Actions secrets for CI.
//
// Local: copy .env.example to .env and fill in your values.
// CI: add each VITE_* key to Repository Secrets (Settings → Secrets → Actions).
//
// The Lightroom share URL is NOT exposed to the client — it lives only in
// wrangler.jsonc (production) and .env (local dev) and is read by the Worker.

export const PHOTOGRAPHER_NAME = import.meta.env.VITE_PHOTOGRAPHER_NAME || "Kateryna Hohol";
export const PHOTOGRAPHER_BRAND = import.meta.env.VITE_PHOTOGRAPHER_BRAND || "FAMILIENSTORY";
export const PHOTOGRAPHER_STREET = import.meta.env.VITE_PHOTOGRAPHER_STREET || "Rosenhof 7";
export const PHOTOGRAPHER_PLZ = import.meta.env.VITE_PHOTOGRAPHER_PLZ || "09111";
export const PHOTOGRAPHER_ORT = import.meta.env.VITE_PHOTOGRAPHER_ORT || "Chemnitz";
export const EMAIL_ADDRESS = import.meta.env.VITE_PHOTOGRAPHER_EMAIL || "hoholkateryna@gmail.com";
export const WHATSAPP_PHONE = import.meta.env.VITE_PHOTOGRAPHER_WHATSAPP || "+49 176 64094869";
export const INSTAGRAM_HANDLE = import.meta.env.VITE_PHOTOGRAPHER_INSTAGRAM || "@kateryna.familienstory";
export const INSTAGRAM_URL = import.meta.env.VITE_PHOTOGRAPHER_INSTAGRAM_URL || "https://instagram.com/kateryna.familienstory";
export const WHATSAPP_MESSAGE = import.meta.env.VITE_WHATSAPP_MESSAGE || "Hallo Kateryna, ich interessiere mich für ein Fotoshooting und würde gern mehr erfahren.";

export function getWhatsAppUrl(message = WHATSAPP_MESSAGE): string {
  const phone = WHATSAPP_PHONE.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
