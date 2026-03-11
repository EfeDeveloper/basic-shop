/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PLACEHOLDER_IMAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
