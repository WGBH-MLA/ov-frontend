import { useState, useEffect, useCallback } from 'react'
import { useSearchBox, useInstantSearch } from 'react-instantsearch'
import { Spinner } from '../classes/search-utils'
import pkg from 'lodash'
const { debounce } = pkg

export const AAPBResults = ({ aapb_host }) => {
  const [results, setResults] = useState(null)
  const { query, refine } = useSearchBox({
    // queryHook: (query, refine) => {
    //   console.log('queryhook', query, refine)
    //   refine(query)
    // },
  })
  const { status } = useInstantSearch()

  console.log('aapb results', query, status)

  const fetchResults = useCallback(currentQuery => {
    console.log('fetching AAPB results for', currentQuery)
    fetch(`${aapb_host}/api.json?q=${encodeURIComponent(currentQuery)}&rows=0`)
      .then(response => response.json())
      .then(data => setResults(data.response.numFound))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    if (query) {
      setResults(null) // Set results to null when the query changes to show the spinner
      fetchResults(query)
    }
  }, [fetchResults, query])

  return (
    <>
      <a href="#">
        <span className="ais-RefinementList-count">
          {/* If there's a query, show the spinner or results */}
          {/* {query ? results !== null ? results : <Spinner /> : null} */}
          {results}
        </span>
        matching records on AmericanArchive.org for "{query}"
      </a>
    </>
  )
}
