/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_API_USERNAME: string;
  readonly VITE_API_PASSWORD: string;
  readonly VITE_API_LANGUAGE: string;
  // Add more env variables as needed...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_API_USERNAME: string;
  readonly VITE_API_PASSWORD: string;
  readonly VITE_API_LANGUAGE: string;
  // Add more env variables as needed...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
