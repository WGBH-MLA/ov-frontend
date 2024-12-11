import { useState, useEffect, useCallback } from 'react'
import { useInstantSearch } from 'react-instantsearch'

import debounce from 'lodash/debounce'
import { Spinner } from './Spinner'

const gbh_query =
  '+AND+(contributing_organizations:%20WGBH(MA)%20OR%20producing_organizations:%20WGBH%20Educational%20Foundation)&f[access_types][]=online'

export type AAPBHit = {
  id: string
  title: string
  xml: string
}

export type AAPBHitProps = {
  hit: AAPBHit
  aapb_host: string
}

export const AAPBResults = ({ aapb_host }) => {
  const { indexUiState } = useInstantSearch()

  const [result_count, setResults] = useState(null)
  const [hits, setHits] = useState([])

  const fetchResults = useCallback(
    debounce((currentQuery) => {
      console.log('fetching AAPB results for', currentQuery)
      fetch(
        `${aapb_host}/api.json?q=${encodeURIComponent(currentQuery)}&rows=10`
      )
        .then((response) => response.json())
        .then((data) => {
          setResults(data.response.numFound)
          setHits(data.response.docs)
        })
        .catch((error) => console.error(error))
    }, 200),
    []
  )

  useEffect(() => {
    setResults(null) // Set results to null when the query changes to show the spinner
    fetchResults(indexUiState.query || '')
  }, [fetchResults, indexUiState])

  return (
    <>
      Found{' '}
      <span className='ais-RefinementList-count'>
        {result_count === null ? <Spinner /> : result_count}
      </span>{' '}
      matching records on AmericanArchive.org for "{indexUiState.query}"
      <div className='ais-Hits'>
        <div className='ais-Hits-list'>
          {hits.map((hit: AAPBHit) => (
            <AAPBHit key={hit.id} hit={hit} aapb_host={aapb_host} />
          ))}
        </div>
      </div>
      <a
        href={`${aapb_host}/catalog?q=${indexUiState.query}${gbh_query}`}
        target='_blank'>
        See{' '}
        <span className='ais-RefinementList-count'>
          {result_count === null ? <Spinner /> : result_count}
        </span>{' '}
        more matching records on AmericanArchive.org for "{indexUiState.query}"
      </a>
    </>
  )
}

export const AAPBHit = ({ hit, aapb_host }: AAPBHitProps) => {
  return (
    <div className='ais-Hits-item aapb-hit'>
      <a href={`${aapb_host}/catalog/${hit.id}`}>
        <div className='tag'>AAPB</div>
        <h3>{hit.title}</h3>
        <pre>{hit.xml}</pre>
      </a>
    </div>
  )
}
