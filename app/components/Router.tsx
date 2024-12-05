import { history } from 'instantsearch.js/cjs/lib/routers/index.js'
import type { UiState } from 'instantsearch.js'

type RouteState = {
  q?: string
  p?: number
  types?: string[]
  featured?: boolean
  sort?: string
}

export const stateToRoute = (uiState: UiState): RouteState => {
  console.log('stateToRoute', uiState)
  let wagtail = uiState['wagtail__wagtailcore_page']
  return {
    q: wagtail.query,
    p: wagtail.page,
    types: wagtail.refinementList?.content_type,
    featured: wagtail.toggle?.featured,
    sort: wagtail.sortBy,
  }
}

export const routeToState = (routeState: RouteState): UiState => {
  console.log('routeToState', routeState)
  return {
    wagtail__wagtailcore_page: {
      query: routeState.q,
      page: routeState.p,
      refinementList: { content_type: routeState.types },
      toggle: { featured: routeState.featured ? true : undefined },
      sortBy: routeState.sort,
    },
  }
}

export const Router = (serverUrl: URL) =>
  history({
    getLocation() {
      if (typeof window === 'undefined') {
        return new URL(serverUrl!) as unknown as Location
      }
      return window.location
    },
  })
