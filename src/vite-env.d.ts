/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PHOTOGRAPHER_NAME: string;
  readonly VITE_PHOTOGRAPHER_BRAND: string;
  readonly VITE_PHOTOGRAPHER_STREET: string;
  readonly VITE_PHOTOGRAPHER_PLZ: string;
  readonly VITE_PHOTOGRAPHER_ORT: string;
  readonly VITE_PHOTOGRAPHER_EMAIL: string;
  readonly VITE_PHOTOGRAPHER_WHATSAPP: string;
  readonly VITE_PHOTOGRAPHER_INSTAGRAM: string;
  readonly VITE_PHOTOGRAPHER_INSTAGRAM_URL: string;
  readonly VITE_WHATSAPP_MESSAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
