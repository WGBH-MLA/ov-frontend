import { useSearchBox, Pagination } from 'react-instantsearch'
import { useInstantSearch } from 'react-instantsearch-core'

import sampleSize from 'lodash/sampleSize'

const default_suggestions = [
  'Julia Child',
  'Louis Lyons',
  'Boston',
  'Arthur',
  'NOVA',
  'Civil Rights',
  'Vietnam',
  'WGBH',
  'Cooking',
  'Music',
]

export const EmptyQueryMessage = () => {
  const { refine } = useSearchBox()

  function setQuery(newQuery) {
    refine(newQuery)
  }
  return (
    <>
      <p>Search articles, titles, and GBH Series on Open Vault</p>
      <Suggestions queries={sampleSize(default_suggestions, 4)} />
      <p>See the help section for search tips and advanced syntax.</p>
    </>
  )
}

export const Suggestions = ({ queries, ...props }) => {
  const { refine } = useSearchBox(props)

  return (
    <>
      <h4>Suggestions</h4>
      <ul>
        {queries.map(query => (
          <li>{SearchLink(query)}</li>
        ))}
      </ul>
    </>
  )
}

export const SearchLink = query => {
  const { refine } = useSearchBox()

  return (
    <a
      onClick={event => {
        event.preventDefault()
        refine(query)
      }}
    >
      {query}
    </a>
  )
}

export function Error() {
  const { error } = useInstantSearch({ catchError: true })

  if (error) {
    throw error
  }
}

export const LoadingIndicator = () => {
  const { status } = useInstantSearch()

  if (status === 'stalled') {
    return (
      <>
        <p>Loading search results</p>
      </>
    )
  }
  return null
}

export function Pager() {
  const { query } = useSearchBox()

  return <>{query && <Pagination />}</>
}

export const EmptyQueryBoundary = ({ children, fallback }) => {
  const { indexUiState } = useInstantSearch()

  if (!indexUiState.query) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return children
}

export function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch()
  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return children
}

export const NoResults = () => {
  const { results } = useInstantSearch()
  return (
    <>
      <h2>
        No results for <i>{results.query}</i>
      </h2>
      <p>Try using different keywords, or check your spelling.</p>
    </>
  )
}
