/// <reference types="vite/client" />

export interface ImportMetaEnv extends Partial<Readonly<{
  VITE_BASE_URL: string;
  VITE_SITE_URL: string;
  VITE_THEME_REALM: string;
  VITE_CLARITY_ID: string;
  VITE_GOOGLE_ANALYTICS_ID: string;
  VITE_CONTACT_API_ROUTE: string;
}>> {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
