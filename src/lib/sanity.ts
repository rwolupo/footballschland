import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'k31tvjv8',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-28',
});

// Preview-Client: liest Drafts und published gleichzeitig ("drafts"-Perspektive)
// und benötigt einen Sanity-API-Token mit Viewer- oder Editor-Rolle. Wird auf
// Anfrage gebaut, damit im Normalbetrieb ohne Token weitergemacht werden kann.
// Aufrufer: src/pages/blockblog/[slug].astro (Preview-Modus via ?preview=<token>).
export function previewClient(token: string) {
  return createClient({
    projectId: 'k31tvjv8',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2026-03-28',
    token,
    perspective: 'drafts',
  });
}

// Sanity image URL helper
export function sanityImageUrl(asset: { url: string } | undefined): string | null {
  return asset?.url ?? null;
}
