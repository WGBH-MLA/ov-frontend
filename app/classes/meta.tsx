type Article = {
  title: string
  cover_image: { url: string }
  meta: { search_description: string }
}

export const extractMeta = (server_url: URL, article: Article) => [
  { property: 'og:url', content: server_url },
  { property: 'og:type', content: 'article' },
  { property: 'og:title', content: article.title },
  {
    property: 'og:description',
    content: article.meta.search_description || 'GBH Open Vault Exhibit',
  },
  { property: 'og:image', content: article.cover_image.url },
  { name: 'twitter:card', content: 'summary_large_image' },
  { property: 'twitter:domain', content: 'openvault.wgbh.org' },
  { property: 'twitter:url', content: server_url },
  { property: 'twitter:title', content: article.title },
  {
    property: 'twitter:description',
    content: article.meta.search_description || 'GBH Open Vault Exhibit',
  },
  { property: 'twitter:image', content: article.cover_image.url },
]

export const HomeMeta = [
  // { property: 'og:url', content: 'https://openvault.wgbh.org' },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'GBH Open Vault' },
  {
    property: 'og:description',
    content: 'Explore Scholar Exhibits and Collections from GBH Open Vault',
  },
  { property: 'og:image', content: 'https://ov.wgbh-mla.org/gbh-mural.jpg' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { property: 'twitter:domain', content: 'openvault.wgbh.org' },
  // { property: 'twitter:url', content: 'https://openvault.wgbh.org' },
  { property: 'twitter:title', content: 'GBH Open Vault Exhibit' },
  {
    property: 'twitter:description',
    content: 'Explore Scholar Exhibits and Collections from GBH Open Vault',
  },
  {
    property: 'twitter:image',
    content: 'https://ov.wgbh-mla.org/gbh-mural.jpg',
  },
]
