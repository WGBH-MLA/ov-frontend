import { generateSitemap } from '@balavishnuvj/remix-seo'
import { EntryContext } from '@remix-run/node'

type Handler = (
  request: Request,
  remixContext: EntryContext
) => Promise<Response | null> | null

export const otherRootRoutes: Record<string, Handler> = {
  '/sitemap.xml': async (request, remixContext) => {
    return generateSitemap(request, remixContext, {
      siteUrl: 'https://openvault.wgbh.org',
    })
  },
}

export const otherRootRouteHandlers: Array<Handler> = [
  ...Object.entries(otherRootRoutes).map(([path, handler]) => {
    return (request: Request, remixContext: EntryContext) => {
      if (new URL(request.url).pathname !== path) return null

      return handler(request, remixContext)
    }
  }),
]