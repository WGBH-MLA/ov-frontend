import { useState, useEffect, useCallback } from 'react'
import { useInstantSearch } from 'react-instantsearch'
import { ExternalLink } from 'lucide-react'
import debounce from 'lodash/debounce'
import { Spinner } from './Spinner'
import { pbcore2json } from '~/utils/pbcore'
import type { PBCore } from '~/types/pbcore'

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
        View{' '}
        <span className='ais-RefinementList-count'>
          {result_count === null ? <Spinner /> : result_count}
        </span>{' '}
        more results on AmericanArchive.org"
        <ExternalLink />
      </a>
    </>
  )
}

export const AAPBHit = ({ hit, aapb_host }: AAPBHitProps) => {
  let pb = pbcore2json(hit.xml)

  console.log('hit pbcore', pb)
  return (
    <div className='ais-Hits-item aapb-hit'>
      <a href={`${aapb_host}/catalog/${hit.id}`}>
        <div className='tag'>AAPB</div>
        <h3>
          {highlightHighlight(hit.title)} <ExternalLink />
        </h3>
        {/* <pre>{hit.xml}</pre> */}
        <PBCoreDescriptionSnippet pbcore={pb} />
      </a>
    </div>
  )
}

type PB = {
  pbcore: PBCore
}

export const PBCoreDescriptionSnippet = ({ pbcore }: PB) => {
  const { indexUiState } = useInstantSearch()
  let description = pbcore?.pbcoreDescriptionDocument?.pbcoreDescription
  console.log('pbcoredescription', description)

  if (!description) {
    return null
  }

  switch (typeof description) {
    case 'string':
      description = description.toString()
      break
    case 'object':
      if (Array.isArray(description)) {
        description = description.map((d) => d.text).join(', ')
      } else {
        description = Object.values(description).join(', ')
      }
      break
  }

  // Truncate the description to 200 characters

  if (description.length > 200) {
    description = description.slice(0, 200) + '...'
  }

  console.log('description', description)
  return (
    <div className='pbcore-description-highlight'>
      <p>{highlightSnippet(description)}</p>
    </div>
  )
}

export const highlightHighlight = (text: string) => {
  const { indexUiState } = useInstantSearch()
  let { query } = indexUiState

  if (!query) {
    return text
  }

  // remove all special characters from the query,
  // so they don't match in the regex
  query = removeSpecialChars(query)

  const parts = text.split(new RegExp(`(${query})`, 'gi'))

  return (
    <span className='ais-Highlight'>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark className='ais-Highlight-highlighted' key={i}>
            {part}
          </mark>
        ) : (
          <span className='ais-Highlight-nonHighlighted' key={i}>
            {part}
          </span>
        )
      )}
    </span>
  )
}

export const highlightSnippet = (text: string) => {
  const { indexUiState } = useInstantSearch()
  let { query } = indexUiState

  if (!query) {
    return text
  }

  query = removeSpecialChars(query)

  const parts = text.split(new RegExp(`(${query})`, 'gi'))

  return (
    <span className='ais-Snippet'>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark className='ais-Snippet-highlighted' key={i}>
            {part}
          </mark>
        ) : (
          <span className='ais-Snippet-nonHighlighted' key={i}>
            {part}
          </span>
        )
      )}
    </span>
  )
}

export const removeSpecialChars = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\"']/g, '')
