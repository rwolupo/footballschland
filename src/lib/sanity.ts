import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'k31tvjv8',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-28',
});

// Sanity image URL helper
export function sanityImageUrl(asset: { url: string } | undefined): string | null {
  return asset?.url ?? null;
}
