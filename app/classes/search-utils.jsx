import { useSearchBox, Pagination, ClearRefinements } from 'react-instantsearch'
import { useInstantSearch } from 'react-instantsearch-core'

import '../styles/spinner.css'

export function Error() {
  const { error } = useInstantSearch({ catchError: true })

  if (error) {
    return <>Search error: {error.message}</>
  }
}

export const LoadingIndicator = () => {
  const { status } = useInstantSearch()

  if (status === 'loading' || status === 'stalled') {
    return <p>Loading search results</p>
  }
  return null
}

export const Spinner = () => (
  <div className="spinner">
    <div className="rect1"></div>
    <div className="rect2"></div>
    <div className="rect3"></div>
    <div className="rect4"></div>
    <div className="rect5"></div>
  </div>
)

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

export function HiddenClearRefinements() {
  const { indexUiState } = useInstantSearch()

  if (indexUiState.refinementList) {
    return <ClearRefinements />
  }
}
