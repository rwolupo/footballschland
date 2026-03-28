// GROQ query: alle Posts für die Übersichtsseite
export const ALL_POSTS_QUERY = `*[_type == "blockblogPost"] | order(pubDate desc) {
  title,
  "slug": slug.current,
  description,
  pubDate,
  author,
  category,
  readTime
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
    }
  }
}`;
