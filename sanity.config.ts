import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'footballschland',
  title: 'Footballschland CMS',
  projectId: 'k31tvjv8',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      {
        name: 'blockblogPost',
        title: 'Blockblog Artikel',
        type: 'document' as const,
        fields: [
          { name: 'title', title: 'Titel', type: 'string', validation: (Rule: any) => Rule.required().max(120) },
          { name: 'slug', title: 'URL-Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
          { name: 'description', title: 'Beschreibung (SEO)', type: 'text', validation: (Rule: any) => Rule.required().max(300) },
          { name: 'pubDate', title: 'Veroeffentlichungsdatum', type: 'date', validation: (Rule: any) => Rule.required() },
          { name: 'updatedDate', title: 'Zuletzt aktualisiert', type: 'date' },
          { name: 'author', title: 'Autor', type: 'string' },
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
          },
          { name: 'readTime', title: 'Lesezeit (Minuten)', type: 'number' },
          { name: 'heroImage', title: 'Titelbild', type: 'image', options: { hotspot: true } },
          {
            name: 'body',
            title: 'Inhalt',
            type: 'array',
            of: [
              { type: 'block' },
              {
                type: 'object',
                name: 'playerCard',
                title: 'Spieler-Karte',
                fields: [
                  { name: 'playerName', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
                  { name: 'position', title: 'Position', type: 'string' },
                  { name: 'yearStatus', title: 'Jahr / Status', type: 'string' },
                  { name: 'college', title: 'College', type: 'string' },
                  { name: 'conference', title: 'Conference', type: 'string' },
                  {
                    name: 'division',
                    title: 'Division',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'FBS', value: 'FBS' },
                        { title: 'FCS', value: 'FCS' },
                        { title: 'D2', value: 'D2' },
                        { title: 'D3', value: 'D3' },
                        { title: 'JUCO', value: 'JUCO' },
                        { title: 'NAIA', value: 'NAIA' },
                      ],
                    },
                  },
                  {
                    name: 'images',
                    title: 'Bilder (Upload)',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }],
                  },
                  {
                    name: 'externalImageUrls',
                    title: 'Bilder (externe URLs)',
                    type: 'array',
                    of: [{ type: 'url' }],
                  },
                  { name: 'bio', title: 'Beschreibung', type: 'text' },
                ],
                preview: {
                  select: { title: 'playerName', subtitle: 'position' },
                },
              },
            ],
          },
        ],
      },
      {
        name: 'siteSettings',
        title: 'Seiteneinstellungen',
        type: 'document' as const,
        fields: [
          { name: 'siteTitle', title: 'Seitentitel', type: 'string' },
          { name: 'siteDescription', title: 'Seitenbeschreibung', type: 'text' },
          { name: 'heroHeadline', title: 'Hero-Überschrift', type: 'string' },
          { name: 'heroSubtext', title: 'Hero-Untertext', type: 'text' },
          { name: 'heroImage', title: 'Hero-Bild', type: 'image', options: { hotspot: true } },
          { name: 'aboutText', title: 'Über uns Text', type: 'text' },
          {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'label', title: 'Label', type: 'string' },
                  { name: 'url', title: 'URL', type: 'url' },
                ],
              },
            ],
          },
          {
            name: 'navLinks',
            title: 'Navigation Links',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'label', title: 'Label', type: 'string' },
                  { name: 'url', title: 'URL', type: 'string' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})
