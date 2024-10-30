import { useState, useEffect, useCallback } from 'react'
import { useInstantSearch } from 'react-instantsearch'

import debounce from 'lodash/debounce'
import { Spinner } from './Spinner'

const gbh_query =
  '+(contributing_organizations:%20WGBH(MA)%20OR%20producing_organizations:%20WGBH%20Educational%20Foundation)&'

export const AAPBResults = ({ aapb_host }) => {
  const { indexUiState } = useInstantSearch()

  const [result_count, setResults] = useState(null)

  const fetchResults = useCallback(
    debounce(currentQuery => {
      console.log('fetching AAPB results for', currentQuery)
      fetch(
        `${aapb_host}/api.json?q=${encodeURIComponent(
          currentQuery
        )}${gbh_query}&rows=0`
      )
        .then(response => response.json())
        .then(data => setResults(data.response.numFound))
        .catch(error => console.error(error))
    }, 200),
    []
  )

  useEffect(() => {
    if (indexUiState.query) {
      setResults(null) // Set results to null when the query changes to show the spinner
      fetchResults(indexUiState.query)
    }
  }, [fetchResults, indexUiState])

  return (
    <a
      href={`${aapb_host}/catalog?q=${indexUiState.query}${gbh_query}`}
      target="_blank"
    >
      View
      <span className="ais-RefinementList-count">
        {result_count || <Spinner />}
      </span>
      matching records on AmericanArchive.org for "{indexUiState.query}"
    </a>
  )
}
