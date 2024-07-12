import { history } from 'instantsearch.js/cjs/lib/routers/index.js'
import type { UiState } from 'instantsearch.js'

export const stateToRoute = (uiState: UiState) => {
  // console.log('stateToRoute', uiState)
  return {
    q: uiState['']?.query,
    p: uiState['wagtail__wagtailcore_page']?.page,
  }
}
export const routeToState = routeState => {
  // console.log('routeToState', routeState)
  return {
    '': {
      query: routeState.q,
    },
    wagtail__wagtailcore_page: {
      page: routeState.p,
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
