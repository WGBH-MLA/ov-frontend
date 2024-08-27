import React from 'react'
import { renderToString } from 'react-dom/server'
import { RemixServer } from '@remix-run/react'
import type { EntryContext } from '@remix-run/node'
import { createSitemapGenerator } from 'remix-sitemap'

const { isSitemapUrl, sitemap } = createSitemapGenerator({
  siteUrl: 'https://openvault.wgbh.org',
  changefreq: 'yearly',
  autoLastmod: false,
})

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  if (isSitemapUrl(request)) return await sitemap(request, remixContext)

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
