// GROQ query: alle Posts für die Übersichtsseite
export const ALL_POSTS_QUERY = `*[_type == "blockblogPost"] | order(pubDate desc) {
  title,
  "slug": slug.current,
  description,
  pubDate,
  author,
  category,
  readTime,
  heroImage {
    asset->{ url }
  }
}`;

// GROQ query: alle Slugs für getStaticPaths()
export const ALL_SLUGS_QUERY = `*[_type == "blockblogPost"] {
  "slug": slug.current
}`;

// GROQ query: einzelner Post mit vollständigem Body
export const POST_BY_SLUG_QUERY = `*[_type == "blockblogPost" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  description,
  pubDate,
  updatedDate,
  author,
  category,
  readTime,
  heroImage {
    asset->{ url }
  },
  body[] {
    ...,
    _type == "playerCard" => {
      ...,
      images[] {
        ...,
        asset->{ url }
      }
    },
    _type == "imageGallery" => {
      ...,
      images[] {
        ...,
        asset->{ url }
      }
    },
    _type == "mockDraftComparison" => {
      ...,
      aiMocks[] {
        ...,
        logo { asset->{ url } }
      }
    }
  }
}`;


// GROQ query: Seite per Slug (Impressum, Datenschutz etc.)
export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{ title, body }`;

// GROQ query: jährliche D1-Saison-Übersichten für den Guide-Hub
// „Deutsche im College Football". Konvention: Slug endet auf `-<YYYY>`,
// Sortierung damit neueste Saison zuerst. Zieht zusätzlich Kennzahlen aus
// dem Body (playerTable-Gesamt, playerCard-Positionen, Podcast-Erwähnungen
// in Bios) für den Hub-Teaser der aktuellen Saison.
export const D1_SEASONS_QUERY = `*[_type == "blockblogPost" && slug.current match "deutsche-talente-d1-*"]
  | order(slug.current desc) {
  "slug": slug.current,
  title,
  description,
  pubDate,
  updatedDate,
  readTime,
  "heroUrl": heroImage.asset->url,
  "totalPlayers": count(body[_type == "playerTable"][0].players),
  "positions": body[_type == "playerTable"][0].players[].position,
  "featuredCount": count(body[_type == "playerCard"]),
  "bios": body[_type == "playerCard"].bio
}`;
