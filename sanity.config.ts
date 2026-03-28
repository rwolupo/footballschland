import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'footballschland',
  title: 'Footballschland CMS',
  projectId: 'k31tvjv8',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [
      {
        name: 'blockblogPost',
        title: 'Blockblog Artikel',
        type: 'document' as const,
        fields: [
          {
            name: 'title',
            title: 'Titel',
            type: 'string',
            validation: (Rule: any) => Rule.required().max(120),
          },
          {
            name: 'slug',
            title: 'URL-Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Beschreibung (SEO)',
            type: 'text',
            validation: (Rule: any) => Rule.required().max(300),
          },
          {
            name: 'pubDate',
            title: 'Veröffentlichungsdatum',
            type: 'date',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'updatedDate',
            title: 'Zuletzt aktualisiert',
            type: 'date',
          },
          {
            name: 'author',
            title: 'Autor',
            type: 'string',
          },
          {
            name: 'category',
            title: 'Kategorie',
            type: 'string',
            options: {
              list: [
                { title: 'Draft', value: 'Draft' },
                { title: 'NFL', value: 'NFL' },
                { title: 'College', value: 'College' },
                { title: 'Podcast', value: 'Podcast' },
                { title: 'Community', value: 'Community' },
              ],
            },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'readTime',
            title: 'Lesezeit (z.B. "6 Min. Lesezeit")',
            type: 'string',
          },
          {
            name: 'heroImage',
            title: 'Hero-Bild',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'body',
            title: 'Artikelinhalt',
            type: 'array',
            of: [
              {
                type: 'block',
                marks: {
                  annotations: [
                    {
                      name: 'link',
                      type: 'object',
                      title: 'Link',
                      fields: [
                        { name: 'href', type: 'url', title: 'URL' },
                        { name: 'blank', type: 'boolean', title: 'In neuem Tab öffnen' },
                      ],
                    },
                  ],
                  decorators: [
                    { value: 'strong', title: 'Fett' },
                    { value: 'em', title: 'Kursiv' },
                    { value: 'underline', title: 'Unterstrichen' },
                  ],
                },
                styles: [
                  { value: 'normal', title: 'Normal' },
                  { value: 'h2', title: 'Überschrift 2' },
                  { value: 'h3', title: 'Überschrift 3' },
                  { value: 'h4', title: 'Überschrift 4' },
                  { value: 'blockquote', title: 'Zitat' },
                ],
              },
              {
                type: 'image',
                title: 'Einzelbild',
                fields: [
                  { name: 'caption', type: 'string', title: 'Bildunterschrift' },
                  { name: 'alt', type: 'string', title: 'Alt-Text' },
                ],
                options: { hotspot: true },
              },
              {
                name: 'playerCard',
                type: 'object',
                title: 'Spielerkarte',
                fields: [
                  {
                    name: 'playerName',
                    title: 'Name',
                    type: 'string',
                    validation: (Rule: any) => Rule.required(),
                  },
                  {
                    name: 'position',
                    title: 'Position (z.B. DE, OL, TE)',
                    type: 'string',
                  },
                  {
                    name: 'yearStatus',
                    title: 'Jahrgang/Status (z.B. Redshirt Freshman, Senior)',
                    type: 'string',
                  },
                  {
                    name: 'college',
                    title: 'College',
                    type: 'string',
                  },
                  {
                    name: 'conferenceOrDivision',
                    title: 'Conference / Division (z.B. FBS, FCS)',
                    type: 'string',
                  },
                  {
                    name: 'images',
                    title: 'Spieler-Grafiken / Fotos',
                    type: 'array',
                    of: [{
                      type: 'image',
                      fields: [{ name: 'caption', type: 'string', title: 'Bildunterschrift' }],
                      options: { hotspot: true },
                    }],
                  },
                  {
                    name: 'externalImageUrls',
                    title: 'Externe Bild-URLs (Wix CDN etc.)',
                    type: 'array',
                    of: [{ type: 'url' }],
                  },
                  {
                    name: 'bio',
                    title: 'Kurz-Bio / Notizen',
                    type: 'text',
                  },
                ],
                preview: {
                  select: { title: 'playerName', subtitle: 'college' },
                },
              },
              {
                name: 'imageGallery',
                type: 'object',
                title: 'Bildergalerie / Slider',
                fields: [
                  { name: 'caption', title: 'Galerie-Überschrift', type: 'string' },
                  {
                    name: 'images',
                    title: 'Bilder',
                    type: 'array',
                    of: [{
                      type: 'image',
                      fields: [
                        { name: 'caption', type: 'string', title: 'Bildunterschrift' },
                        { name: 'alt', type: 'string', title: 'Alt-Text' },
                      ],
                      options: { hotspot: true },
                    }],
                    validation: (Rule: any) => Rule.min(1),
                  },
                ],
                preview: { select: { title: 'caption' } },
              },
              {
                name: 'playerTable',
                type: 'object',
                title: 'Spieler-Tabelle',
                fields: [
                  { name: 'tableTitle', title: 'Tabellen-Überschrift', type: 'string' },
                  {
                    name: 'players',
                    title: 'Spieler',
                    type: 'array',
                    of: [{
                      name: 'playerRow',
                      type: 'object',
                      fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'position', title: 'Pos.', type: 'string' },
                        { name: 'yearStatus', title: 'Status', type: 'string' },
                        { name: 'college', title: 'College', type: 'string' },
                      ],
                      preview: { select: { title: 'name', subtitle: 'college' } },
                    }],
                  },
                ],
                preview: { select: { title: 'tableTitle' } },
              },
            ],
          },
        ],
        preview: {
          select: { title: 'title', subtitle: 'category', media: 'heroImage' },
        },
      },
      {
        name: 'siteSettings',
        title: 'Website-Einstellungen',
        type: 'document' as const,
        fields: [
          {
            name: 'siteTitle',
            title: 'Website-Titel',
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'footballschland',
  title: 'Footballschland CMS',
  projectId: 'k31tvjv8',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [
      {
        name: 'blockblogPost',
        title: 'Blockblog Artikel',
        type: 'document' as const,
        fields: [
          {
            name: 'title',
            title: 'Titel',
            type: 'string',
            validation: (Rule: any) => Rule.required().max(120),
          },
          {
            name: 'slug',
            title: 'URL-Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Beschreibung (SEO)',
            type: 'text',
            validation: (Rule: any) => Rule.required().max(300),
          },
          {
            name: 'pubDate',
            title: 'Veröffentlichungsdatum',
            type: 'date',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'updatedDate',
            title: 'Zuletzt aktualisiert',
            type: 'date',
          },
          {
            name: 'author',
            title: 'Autor',
            type: 'string',
          },
          {
            name: 'category',
            title: 'Kategorie',
            type: 'string',
            options: {
              list: [
                { title: 'Draft', value: 'Draft' },
                { title: 'NFL', value: 'NFL' },
                { title: 'College', value: 'College' },
                { title: 'Podcast', value: 'Podcast' },
                { title: 'Community', value: 'Community' },
              ],
            },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'readTime',
            title: 'Lesezeit (z.B. "6 Min. Lesezeit")',
            type: 'string',
          },
          {
            name: 'heroImage',
            title: 'Hero-Bild',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'body',
            title: 'Artikelinhalt',
            type: 'array',
            of: [
              {
                type: 'block',
                marks: {
                  annotations: [
                    {
                      name: 'link',
                      type: 'object',
                      title: 'Link',
                      fields: [
                        { name: 'href', type: 'url', title: 'URL' },
                        { name: 'blank', type: 'boolean', title: 'In neuem Tab oeffnen' },
                      ],
                    },
                  ],
                  decorators: [
                    { value: 'strong', title: 'Fett' },
                    { value: 'em', title: 'Kursiv' },
                    { value: 'underline', title: 'Unterstrichen' },
                  ],
                },
                styles: [
                  { value: 'normal', title: 'Normal' },
                  { value: 'h2', title: 'Ueberschrift 2' },
                  { value: 'h3', title: 'Ueberschrift 3' },
                  { value: 'h4', title: 'Ueberschrift 4' },
                  { value: 'blockquote', title: 'Zitat' },
                ],
              },
              {
                type: 'image',
                title: 'Einzelbild',
                fields: [
                  { name: 'caption', type: 'string', title: 'Bildunterschrift' },
                  { name: 'alt', type: 'string', title: 'Alt-Text' },
                ],
                options: { hotspot: true },
              },
              {
                name: 'playerCard',
                type: 'object',
                title: 'Spielerkarte',
                fields: [
                  {
                    name: 'playerName',
                    title: 'Name',
                    type: 'string',
                    validation: (Rule: any) => Rule.required(),
                  },
                  { name: 'position', title: 'Position (z.B. DE, OL, TE)', type: 'string' },
                  { name: 'yearStatus', title: 'Jahrgang/Status', type: 'string' },
                  { name: 'college', title: 'College', type: 'string' },
                  { name: 'conferenceOrDivision', title: 'Conference / Division (z.B. FBS, FCS)', type: 'string' },
                  {
                    name: 'images',
                    title: 'Spieler-Grafiken / Fotos',
                    type: 'array',
                    of: [{
                      type: 'image',
                      fields: [{ name: 'caption', type: 'string', title: 'Bildunterschrift' }],
                      options: { hotspot: true },
                    }],
                  },
                  {
                    name: 'externalImageUrls',
                    title: 'Externe Bild-URLs (Wix CDN etc.)',
                    type: 'array',
                    of: [{ type: 'url' }],
                  },
                  { name: 'bio', title: 'Kurz-Bio / Notizen', type: 'text' },
                ],
                preview: {
                  select: { title: 'playerName', subtitle: 'college' },
                },
              },
              {
                name: 'imageGallery',
                type: 'object',
                title: 'Bildergalerie / Slider',
                fields: [
                  { name: 'caption', title: 'Galerie-Ueberschrift', type: 'string' },
                  {
                    name: 'images',
                    title: 'Bilder',
                    type: 'array',
                    of: [{
                      type: 'image',
                      fields: [
                        { name: 'caption', type: 'string', title: 'Bildunterschrift' },
                        { name: 'alt', type: 'string', title: 'Alt-Text' },
                      ],
                      options: { hotspot: true },
                    }],
                    validation: (Rule: any) => Rule.min(1),
                  },
                ],
                preview: { select: { title: 'caption' } },
              },
              {
                name: 'playerTable',
                type: 'object',
                title: 'Spieler-Tabelle',
                fields: [
                  { name: 'tableTitle', title: 'Tabellen-Ueberschrift', type: 'string' },
                  {
                    name: 'players',
                    title: 'Spieler',
                    type: 'array',
                    of: [{
                      name: 'playerRow',
                      type: 'object',
                      fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'position', title: 'Pos.', type: 'string' },
                        { name: 'yearStatus', title: 'Status', type: 'string' },
                        { name: 'college', title: 'College', type: 'string' },
                      ],
                      preview: { select: { title: 'name', subtitle: 'college' } },
                    }],
                  },
                ],
                preview: { select: { title: 'tableTitle' } },
              },
            ],
          },
        ],
        preview: {
          select: { title: 'title', subtitle: 'category', media: 'heroImage' },
        },
      },
      {
        name: 'siteSettings',
        title: 'Website-Einstellungen',
        type: 'document' as const,
        fields: [
          { name: 'siteTitle', title: 'Website-Titel', type: 'string' },
          { name: 'siteDescription', title: 'Website-Beschreibung (SEO)', type: 'text' },
          { name: 'heroHeadline', title: 'Hero: Hauptueberschrift', type: 'string' },
          { name: 'heroSubtext', title: 'Hero: Untertext', type: 'text' },
          {
            name: 'heroImage',
            title: 'Hero: Hintergrundbild',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'aboutText',
            title: 'Ueber uns / About-Sektion',
            type: 'array',
            of: [{ type: 'block' }],
          },
          {
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            of: [{
              name: 'socialLink',
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Plattform',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'Twitter / X', value: 'twitter' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'TikTok', value: 'tiktok' },
                      { title: 'Spotify (Podcast)', value: 'spotify' },
                      { title: 'Apple Podcasts', value: 'apple_podcasts' },
                      { title: 'Facebook', value: 'facebook' },
                    ],
                  },
                },
                { name: 'url', title: 'URL', type: 'url' },
              ],
              preview: { select: { title: 'platform', subtitle: 'url' } },
            }],
          },
          {
            name: 'navLinks',
            title: 'Navigation Links',
            type: 'array',
            of: [{
              name: 'navLink',
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Pfad (z.B. /blockblog)', type: 'string' },
              ],
              preview: { select: { title: 'label', subtitle: 'href' } },
            }],
          },
        ],
      },
    ],
  },
})
