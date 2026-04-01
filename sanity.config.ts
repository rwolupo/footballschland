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
          { name: 'updatedDate', title: 'Aktualisierungsdatum', type: 'date' },
          { name: 'author', title: 'Autor', type: 'string' },
          {
            name: 'category',
            title: 'Kategorie',
            type: 'string',
            options: {
              list: [
                { title: 'College', value: 'College' },
                { title: 'NFL', value: 'NFL' },
                { title: 'NFL Draft', value: 'NFL Draft' },
                { title: 'Feature', value: 'Feature' },
              ],
            },
          },
          { name: 'readTime', title: 'Lesezeit', type: 'string' },
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
                  {
                    name: 'conference',
                    title: 'Conference',
                    type: 'string',
                    options: {
                      list: [
                        { title: '— FBS —', value: '' },
                        { title: 'ACC', value: 'ACC' },
                        { title: 'AAC', value: 'AAC' },
                        { title: 'Big Ten', value: 'Big Ten' },
                        { title: 'Big 12', value: 'Big 12' },
                        { title: 'CUSA', value: 'CUSA' },
                        { title: 'MAC', value: 'MAC' },
                        { title: 'Mountain West', value: 'Mountain West' },
                        { title: 'SEC', value: 'SEC' },
                        { title: 'Sun Belt', value: 'Sun Belt' },
                        { title: 'Independents (FBS)', value: 'Independents (FBS)' },
                        { title: '— FCS —', value: ' ' },
                        { title: 'Big Sky', value: 'Big Sky' },
                        { title: 'Big South', value: 'Big South' },
                        { title: 'CAA', value: 'CAA' },
                        { title: 'Missouri Valley (MVFC)', value: 'MVFC' },
                        { title: 'NEC', value: 'NEC' },
                        { title: 'OVC', value: 'OVC' },
                        { title: 'Patriot League', value: 'Patriot League' },
                        { title: 'Pioneer League', value: 'Pioneer League' },
                        { title: 'SoCon', value: 'SoCon' },
                        { title: 'Southland', value: 'Southland' },
                        { title: 'MEAC', value: 'MEAC' },
                        { title: 'SWAC', value: 'SWAC' },
                        { title: 'UAC', value: 'UAC' },
                        { title: 'WAC (FCS)', value: 'WAC' },
                        { title: 'Independents (FCS)', value: 'Independents (FCS)' },
                      ],
                    },
                  },
                  {
                    name: 'division',
                    title: 'Division',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'D1-FBS', value: 'D1-FBS' },
                        { title: 'D1-FCS', value: 'D1-FCS' },
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
                          { name: 'yearStatus', title: 'Projection (kurz)', type: 'string' },
                          { name: 'college', title: 'College', type: 'string' },
                          { name: 'nflTeams', title: 'NFL Teams (Visits / Interviews / Pro Day)', type: 'string' },
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
    // ── Statische Seiten (Impressum, Datenschutz, etc.) ──
    {
      name: 'page',
      title: 'Seiten',
      type: 'document' as const,
      fields: [
        {
          name: 'slug',
          title: 'Seiten-ID',
          type: 'slug',
          description: 'z.B. impressum oder datenschutz',
          validation: (Rule: any) => Rule.required(),
          options: { source: 'title', maxLength: 96 },
        },
        { name: 'title', title: 'Seitentitel', type: 'string', validation: (Rule: any) => Rule.required() },
        {
          name: 'body',
          title: 'Inhalt',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Fließtext', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
              ],
              marks: {
                decorators: [
                  { title: 'Fett', value: 'strong' },
                  { title: 'Kursiv', value: 'em' },
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [{ name: 'href', type: 'url', title: 'URL' }],
                  },
                ],
              },
            },
          ],
        },
      ],
      preview: {
        select: { title: 'title', subtitle: 'slug.current' },
      },
    },
    ],
  },
})
