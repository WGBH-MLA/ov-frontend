import { history } from 'instantsearch.js/cjs/lib/routers/index.js'
import type { UiState } from 'instantsearch.js'

type RouteState = {
  q?: string
  p?: number
  types?: string[]
  featured?: boolean
  sort?: string
  perPage?: number
  'gbh-series'?: any
}

export const stateToRoute = (uiState: UiState): RouteState => {
  console.log('stateToRoute', uiState)
  let wagtail = uiState['wagtail__wagtailcore_page']
  let gbh = uiState['gbh-series']
  return {
    q: wagtail.query,
    p: wagtail.page,
    types: wagtail.refinementList?.content_type,
    featured: wagtail.toggle?.featured,
    sort: wagtail.sortBy,
    perPage: wagtail.hitsPerPage,
    'gbh-series': {
      page: gbh?.page,
      sort: gbh?.sortBy,
    },
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
      hitsPerPage: routeState.perPage,
    },
    'gbh-series': routeState['gbh-series'],
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

    windowTitle(routeState) {
      const hash = window.location.hash
      // console.log('windowTitle', routeState, hash)
      let title
      switch (hash) {
        case '#gbh':
          title = 'Search GBH Series'
          break
        case '#aapb':
          title = 'Search American Archive'
          break
        case '#help':
          title = 'Search Help'
          break
        default:
          title = 'Search Open Vault'
      }

      if (!routeState.q) {
        return title
      }

      return `${routeState.q} | ${title}`
    },

    cleanUrlOnDispose: false,
  })
