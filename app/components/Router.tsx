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

    // createURL,
    // parseURL,

    cleanUrlOnDispose: false,
  })

// Add the dictionaries to convert the names and the slugs
const routeNames = {
  ov: 'wagtail__wagtailcore_page',
  gbh: 'gbh-series',
}

const decodedRoutes = Object.keys(routeNames).reduce((acc, key) => {
  const newKey = routeNames[key]
  const newValue = key

  return {
    ...acc,
    [newKey]: newValue,
  }
}, {})

// Update the getters to use the encoded/decoded values
function getCategorySlug(name) {
  const encodedName = decodedRoutes[name] || name

  return encodedName.split(' ').map(encodeURIComponent).join('+')
}

function getCategoryName(slug) {
  const decodedSlug = routeNames[slug] || slug

  return decodedSlug.split('+').map(decodeURIComponent).join(' ')
}

export const createURL = ({ qsModule, routeState, location }) => {
  console.log('createURL', routeState)
  const urlParts = location.href.match(/^(.*?)\/search/)
  const baseUrl = `${urlParts ? urlParts[1] : ''}/`

  const categoryPath = routeState.category
    ? `${getCategorySlug(routeState.category)}/`
    : ''
  const queryParameters = {}

  if (routeState.query) {
    queryParameters.query = encodeURIComponent(routeState.query)
  }
  if (routeState.page !== 1) {
    queryParameters.page = routeState.page
  }
  if (routeState.brands) {
    queryParameters.brands = routeState.brands.map(encodeURIComponent)
  }

  const queryString = qsModule.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  })

  return `${baseUrl}search/${categoryPath}${queryString}`
}

export const parseURL = ({ qsModule, location }) => {
  console.log('parseURL', location)
  const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/)
  const category = getCategoryName(
    (pathnameMatches && pathnameMatches[1]) || ''
  )
  const {
    query = '',
    page,
    brands = [],
  } = qsModule.parse(location.search.slice(1))
  // `qs` does not return an array when there's a single value.
  const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean)

  return {
    query: decodeURIComponent(query),
    page,
    brands: allBrands.map(decodeURIComponent),
    category,
  }
}
