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
          { name: 'heroImage', title: 'Hero-Bild', type: 'image', options: { hotspot: true } },
          {
            name: 'body',
            title: 'Inhalt',
            type: 'array',
            of: [
              {
                type: 'block',
                styles: [
                  { title: 'Normal', value: 'normal' },
                  { title: 'H2', value: 'h2' },
                  { title: 'H3', value: 'h3' },
                  { title: 'Quote', value: 'blockquote' },
                ],
                marks: {
                  decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                  ],
                },
              },
              {
                type: 'object',
                name: 'playerCard',
                title: 'Spieler-Karte',
                fields: [
                  { name: 'playerName', title: 'Spielername', type: 'string' },
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
                    title: 'Externe Bild-URLs',
                    type: 'array',
                    of: [{ type: 'url' }],
                  },
                  { name: 'bio', title: 'Bio / Beschreibung', type: 'text' },
                ],
                preview: {
                  select: { title: 'playerName', subtitle: 'position' },
                },
              },
              {
                type: 'object',
                name: 'playerTable',
                title: 'Spieler-Tabelle',
                fields: [
                  { name: 'tableTitle', title: 'Tabellenueberschrift', type: 'string' },
                  {
                    name: 'players',
                    title: 'Spieler',
                    type: 'array',
                    of: [
                      {
                        type: 'object',
                        fields: [
                          { name: 'name', title: 'Name', type: 'string' },
                          { name: 'position', title: 'Position', type: 'string' },
                          { name: 'yearStatus', title: 'Jahr / Status', type: 'string' },
                          { name: 'college', title: 'College', type: 'string' },
                        ],
                      },
                    ],
                  },
                ],
                preview: {
                  select: { title: 'tableTitle' },
                },
              },
            ],
          },
        ],
      },
    ],
  },
})
