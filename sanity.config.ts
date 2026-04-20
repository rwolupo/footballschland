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
                { title: 'Podcast', value: 'Podcast' },
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
                    name: 'conference', title: 'Conference', type: 'string',
                    options: { list: [
                      { title: 'ACC', value: 'ACC' }, { title: 'Big Ten', value: 'Big Ten' },
                      { title: 'Big 12', value: 'Big 12' }, { title: 'SEC', value: 'SEC' },
                      { title: 'Big Sky', value: 'Big Sky' }, { title: 'CAA', value: 'CAA' },
                      { title: 'MVFC', value: 'MVFC' }, { title: 'SoCon', value: 'SoCon' },
                    ]},
                  },
                  {
                    name: 'division', title: 'Division', type: 'string',
                    options: { list: [
                      { title: 'D1-FBS', value: 'D1-FBS' }, { title: 'D1-FCS', value: 'D1-FCS' },
                      { title: 'D2', value: 'D2' }, { title: 'D3', value: 'D3' },
                      { title: 'JUCO', value: 'JUCO' }, { title: 'NAIA', value: 'NAIA' },
                    ]},
                  },
                  { name: 'images', title: 'Bilder (Upload)', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
                  { name: 'externalImageUrls', title: 'Externe Bild-URLs', type: 'array', of: [{ type: 'url' }] },
                  { name: 'bio', title: 'Bio / Beschreibung', type: 'text' },
                ],
                preview: { select: { title: 'playerName', subtitle: 'position' } },
              },
              {
                type: 'object', name: 'playerTable', title: 'Spieler-Tabelle',
                fields: [
                  { name: 'tableTitle', title: 'Tabellenueberschrift', type: 'string' },
                  { name: 'players', title: 'Spieler', type: 'array', of: [{
                    type: 'object',
                    fields: [
                      { name: 'name', title: 'Name', type: 'string' },
                      { name: 'position', title: 'Position', type: 'string' },
                      { name: 'yearStatus', title: 'Projection (kurz)', type: 'string' },
                      { name: 'college', title: 'College', type: 'string' },
                      { name: 'nflTeams', title: 'NFL Teams', type: 'string' },
                    ],
                  }]},
                ],
                preview: { select: { title: 'tableTitle' } },
              },
              {
                type: 'object',
                name: 'mockDraftComparison',
                title: 'KI Mock Draft Vergleich',
                fields: [
                  { name: 'year', title: 'Draft-Jahr', type: 'number', validation: (Rule: any) => Rule.required() },
                  {
                    name: 'aiMocks', title: 'Mocks je KI', type: 'array',
                    validation: (Rule: any) => Rule.required().min(1),
                    of: [{
                      type: 'object',
                      name: 'aiMock',
                      title: 'KI Mock',
                      fields: [
                        { name: 'aiName', title: 'Anzeigename', type: 'string', validation: (Rule: any) => Rule.required() },
                        {
                          name: 'aiSlug', title: 'Stil / Farbe', type: 'string',
                          validation: (Rule: any) => Rule.required(),
                          options: { list: [
                            { title: 'Claude', value: 'claude' },
                            { title: 'ChatGPT', value: 'chatgpt' },
                            { title: 'Perplexity', value: 'perplexity' },
                            { title: 'Gemini', value: 'gemini' },
                            { title: 'Footballschland', value: 'footballschland' },
                          ]},
                        },
                        { name: 'prompt', title: 'Verwendeter Prompt', type: 'text', rows: 6 },
                        {
                          name: 'picks', title: 'Picks (Runde 1)', type: 'array',
                          of: [{
                            type: 'object',
                            fields: [
                              { name: 'pickNumber', title: 'Pick #', type: 'number', validation: (Rule: any) => Rule.required().min(1).max(32) },
                              { name: 'team', title: 'Team', type: 'string' },
                              { name: 'playerName', title: 'Spieler', type: 'string', validation: (Rule: any) => Rule.required() },
                              { name: 'position', title: 'Position', type: 'string' },
                              { name: 'college', title: 'College', type: 'string' },
                            ],
                            preview: {
                              select: { pick: 'pickNumber', player: 'playerName', team: 'team', pos: 'position' },
                              prepare: ({ pick, player, team, pos }: any) => ({
                                title: `#${pick ?? '?'} ${team ?? ''} — ${player ?? ''}`,
                                subtitle: pos ?? '',
                              }),
                            },
                          }],
                        },
                        {
                          name: 'fazit', title: 'Fazit', type: 'array',
                          of: [{
                            type: 'block',
                            styles: [{ title: 'Normal', value: 'normal' }],
                            marks: { decorators: [
                              { title: 'Strong', value: 'strong' },
                              { title: 'Emphasis', value: 'em' },
                            ]},
                          }],
                        },
                      ],
                      preview: {
                        select: { title: 'aiName', subtitle: 'aiSlug' },
                        prepare: ({ title, subtitle }: any) => ({ title, subtitle: subtitle ?? '' }),
                      },
                    }],
                  },
                ],
                preview: {
                  select: { year: 'year', count: 'aiMocks.length' },
                  prepare: ({ year }: any) => ({ title: `KI Mock Draft Vergleich ${year ?? ''}` }),
                },
              },
            ],
          },
        ],
      },
    // Podcast Transkripte
    {
      name: 'podcastTranscript',
      title: 'Podcast Transkript',
      type: 'document' as const,
      fields: [
        { name: 'episodeId', title: 'Episode ID', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'title', title: 'Episodentitel', type: 'string' },
        { name: 'publishedDate', title: 'Veroeffentlicht', type: 'date' },
        { name: 'durationMin', title: 'Dauer (Minuten)', type: 'number' },
        { name: 'assemblyaiTranscriptId', title: 'AssemblyAI ID', type: 'string' },
        { name: 'mainGuest', title: 'Hauptgast', type: 'string' },
        { name: 'guestPosition', title: 'Position (Spieler)', type: 'string' },
        { name: 'guestCollege', title: 'College / Team', type: 'string' },
        {
          name: 'speakerMap', title: 'Speaker-Zuordnung', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'speaker', title: 'Speaker-Label (A/B/C)', type: 'string' },
              { name: 'role', title: 'Rolle', type: 'string', options: { list: [
                { title: 'Host', value: 'host' }, { title: 'Gast', value: 'guest' },
                { title: 'Werbung / Sponsor', value: 'ad' }, { title: 'Unbekannt', value: 'unknown' },
              ]}},
              { name: 'name', title: 'Name', type: 'string' },
            ],
            preview: { select: { title: 'speaker', subtitle: 'name' } },
          }],
        },
        { name: 'fullText', title: 'Volltext', type: 'text', rows: 5 },
        {
          name: 'utterances', title: 'Utterances', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'speaker', title: 'Speaker', type: 'string' },
              { name: 'text', title: 'Text', type: 'text' },
              { name: 'start', title: 'Start (ms)', type: 'number' },
              { name: 'end', title: 'End (ms)', type: 'number' },
            ],
            preview: {
              select: { title: 'speaker', subtitle: 'text' },
              prepare: ({ title, subtitle }: any) => ({ title: 'Speaker ' + title, subtitle: subtitle?.slice(0, 80) }),
            },
          }],
        },
        { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
      ],
      preview: {
        select: { title: 'episodeId', subtitle: 'mainGuest' },
        prepare: ({ title, subtitle }: any) => ({ title, subtitle: subtitle ?? '- kein Gast -' }),
      },
      orderings: [
        { title: 'Episode (neu -> alt)', name: 'episodeIdDesc', by: [{ field: 'episodeId', direction: 'desc' }] },
        { title: 'Episode (alt -> neu)', name: 'episodeIdAsc', by: [{ field: 'episodeId', direction: 'asc' }] },
      ],
    },
    // Statische Seiten
    {
      name: 'page', title: 'Seiten', type: 'document' as const,
      fields: [
        { name: 'slug', title: 'Seiten-ID', type: 'slug', description: 'z.B. impressum', validation: (Rule: any) => Rule.required(), options: { source: 'title', maxLength: 96 } },
        { name: 'title', title: 'Seitentitel', type: 'string', validation: (Rule: any) => Rule.required() },
        {
          name: 'body', title: 'Inhalt', type: 'array',
          of: [{
            type: 'block',
            styles: [{ title: 'Fliesstext', value: 'normal' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }],
            marks: {
              decorators: [{ title: 'Fett', value: 'strong' }, { title: 'Kursiv', value: 'em' }],
              annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'URL' }] }],
            },
          }],
        },
      ],
      preview: { select: { title: 'title', subtitle: 'slug.current' } },
    },
    ],
  },
})
