export const prerender = true;
import { sanityClient } from '../lib/sanity';

export async function GET() {
  // Fetch all blog post slugs + dates from Sanity
  const posts: { slug: string; pubDate: string; updatedDate?: string }[] =
    await sanityClient.fetch(
      `*[_type == "blockblogPost"] | order(pubDate desc) {
        "slug": slug.current,
        pubDate,
        updatedDate
      }`
    );

  const staticPages = [
    { url: 'https://footballschland.de/', priority: '1.0', changefreq: 'weekly', lastmod: '' },
    { url: 'https://footballschland.de/nfl-draft/', priority: '0.9', changefreq: 'weekly', lastmod: '2026-04-12' },
    { url: 'https://footballschland.de/weg-in-die-nfl/', priority: '0.9', changefreq: 'monthly', lastmod: '2026-04-05' },
    { url: 'https://footballschland.de/episoden/', priority: '0.8', changefreq: 'weekly', lastmod: '' },
    { url: 'https://footballschland.de/guides/', priority: '0.8', changefreq: 'monthly', lastmod: '2026-04-12' },
    { url: 'https://footballschland.de/blockblog/', priority: '0.8', changefreq: 'weekly', lastmod: '' },
    { url: 'https://footballschland.de/partner/', priority: '0.5', changefreq: 'monthly', lastmod: '' },
    { url: 'https://footballschland.de/datenschutz/', priority: '0.3', changefreq: 'yearly', lastmod: '' },
    { url: 'https://footballschland.de/impressum/', priority: '0.3', changefreq: 'yearly', lastmod: '' },
  ];

  const blogUrls = posts.map((post) => ({
    url: `https://footballschland.de/blockblog/${post.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: (post.updatedDate || post.pubDate || '').split('T')[0],
  }));

  const allUrls = [...staticPages, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
