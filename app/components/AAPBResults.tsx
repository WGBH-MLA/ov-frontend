import { useState, useEffect, useCallback } from 'react'
import { useSearchBox } from 'react-instantsearch'
import { Spinner } from '../classes/search-utils'
import pkg from 'lodash'
const { debounce } = pkg

export const AAPBResults = ({ host }) => {
  const [results, setResults] = useState(null)
  const { query } = useSearchBox()

  const fetchResults = useCallback(
    debounce(currentQuery => {
      fetch(
        `https://${host}/api.json?q=${encodeURIComponent(currentQuery)}&rows=0`
      )
        .then(response => response.json())
        .then(data => setResults(data.response.numFound))
        .catch(error => console.error(error))
    }, 500),
    []
  )

  useEffect(() => {
    if (query) {
      setResults(null) // Set results to null when the query changes to show the spinner
      fetchResults(query)
    }
  }, [fetchResults, query])

  return (
    <>
      <a href="#">
        Search AmericanArchive.org &#x21E8;
        <span className="ais-RefinementList-count">
          {/* If there's a query, show the spinner or results */}
          {query ? results !== null ? results : <Spinner /> : null}
        </span>
      </a>
    </>
  )
}
