import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

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
            // Document type: blockblogPost
{
        name: 'blockblogPost',
                  title: 'Blockblog Post',
                  type: 'document',
                  fields: [
          {
                      name: 'title',
                                    title: 'Titel',
                                    type: 'string',
                                    validation: (Rule) => Rule.required(),
                        },
{
            name: 'slug',
                          title: 'Slug (URL)',
                          type: 'slug',
                          options: { source: 'title', maxLength: 96 },
                          validation: (Rule) => Rule.required(),
              },
{
            name: 'publishedAt',
                          title: 'Veroeffentlicht am',
                          type: 'datetime',
              },
{
            name: 'excerpt',
                          title: 'Kurzbeschreibung',
                          type: 'text',
                          rows: 3,
              },
              {
                          name: 'coverImage',
                                        title: 'Titelbild URL',
                                        type: 'url',
                            },
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
{ title: 'Blockquote', value: 'blockquote' },
                ],
                                  marks: {
                  decorators: [
{ title: 'Bold', value: 'strong' },
                    { title: 'Italic', value: 'em' },
                  ],
                                      annotations: [
{
                      name: 'link',
                                              type: 'object',
                                              title: 'Link',
                                              fields: [
                        { name: 'href', type: 'url', title: 'URL' },
                      ],
},
                                                          ],
                                        },
},
                                        { type: 'playerCard' },
{ type: 'imageGallery' },
{ type: 'playerTable' },
              ],
  },
          ],
          preview: {
          select: { title: 'title', subtitle: 'publishedAt' },
},
},

      // Object type: playerCard
{
        name: 'playerCard',
                  title: 'Spieler-Karte',
                  type: 'object',
                  fields: [
{ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
{ name: 'position', title: 'Position', type: 'string' },
{ name: 'college', title: 'College', type: 'string' },
{ name: 'hometown', title: 'Heimatstadt', type: 'string' },
{ name: 'height', title: 'Groesse', type: 'string' },
{ name: 'weight', title: 'Gewicht', type: 'string' },
{ name: 'imageUrl', title: 'Bild URL', type: 'url' },
{ name: 'stats', title: 'Statistiken (Saison)', type: 'text', rows: 3 },
  { name: 'note', title: 'Anmerkung', type: 'text', rows: 2 },
          ],
          preview: {
          select: { title: 'name', subtitle: 'position' },
},
},

      // Object type: imageGallery
{
        name: 'imageGallery',
                  title: 'Bildergalerie',
                  type: 'object',
        fields: [
          { name: 'caption', title: 'Bildunterschrift', type: 'string' },
{
            name: 'externalImageUrls',
                          title: 'Bild URLs (externe Links)',
                          type: 'array',
                          of: [{ type: 'url' }],
},
{
            name: 'images',
                          title: 'Sanity Bilder',
                          type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
},
        ],
                      preview: {
          select: { title: 'caption' },
          prepare({ title }) {
            return { title: title || 'Bildergalerie' };
          },
},
            },

      // Object type: playerTable
{
        name: 'playerTable',
                  title: 'Spieler-Tabelle',
                  type: 'object',
                  fields: [
{ name: 'caption', title: 'Tabellen-Titel', type: 'string' },
{
            name: 'players',
                          title: 'Spieler',
                          type: 'array',
                          of: [
              {
                              type: 'object',
                                                name: 'playerRow',
                                                fields: [
                                { name: 'name', title: 'Name', type: 'string' },
{ name: 'position', title: 'Position', type: 'string' },
{ name: 'college', title: 'College', type: 'string' },
{ name: 'note', title: 'Anmerkung', type: 'string' },
                ],
            },
            ],
},
        ],
        preview: {
          select: { title: 'caption' },
                      prepare({ title }) {
            return { title: title || 'Spieler-Tabelle' };
          },
                  },
        },
    ],
},
});
