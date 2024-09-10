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
