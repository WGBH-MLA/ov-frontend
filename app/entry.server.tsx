import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerRouter } from 'react-router';
import type { EntryContext } from 'react-router';
import { createSitemapGenerator } from 'remix-sitemap'

const { isSitemapUrl, sitemap } = createSitemapGenerator({
  siteUrl: 'https://openvault.wgbh.org',
  changefreq: 'yearly',
  autoLastmod: false,
  priority: 0.5,
})

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext
) {
  if (isSitemapUrl(request)) return await sitemap(request, reactRouterContext);

  const markup = renderToString(
    <ServerRouter context={reactRouterContext} url={request.url} />
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
