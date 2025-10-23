import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useInstantSearch } from 'react-instantsearch'
import debounce from '~/utils/debounce'
import { ExternalLink } from 'lucide-react'

import { Spinner } from '~/components'
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
  aapbHost: string
}

export const AAPBResults = ({
  aapbHost,
  onResultCountChange,
}: {
  aapbHost: string
  onResultCountChange?: (count: number | null) => void
}) => {
  const { indexUiState } = useInstantSearch()
  const callbackRef = useRef(onResultCountChange)

  // Extract only the query from indexUiState
  const query = indexUiState.query || ''

  // Keep the ref current
  useEffect(() => {
    callbackRef.current = onResultCountChange
  }, [onResultCountChange])

  const [result_count, setResults] = useState<number | null>(null)
  const [hits, setHits] = useState([])

  const updateResults = useCallback((count: number | null) => {
    setResults(count)
    callbackRef.current?.(count)
  }, [])

  // Memoize the debounced function
  const debouncedFetch = useMemo(
    () =>
      debounce((currentQuery: string) => {
        console.log('fetching AAPB results for', currentQuery)
        fetch(
          `${aapbHost}/api.json?q=${encodeURIComponent(currentQuery)}&rows=10`
        )
          .then(response => response.json())
          .then(data => {
            const count = data.response.numFound
            updateResults(count)
            setHits(data.response.docs)
          })
          .catch(error => {
            console.error(error)
            setResults(undefined)
          })
      }, 200),
    [aapbHost, updateResults]
  )

  useEffect(() => {
    updateResults(null)
    debouncedFetch(query)
  }, [debouncedFetch, query, updateResults]) // Use query instead of indexUiState
  const aapbSearchUrl = `${aapbHost}/catalog?q=${query}${gbh_query}`
  if (result_count === undefined) {
    return (
      <>
        <h2>Search Error</h2>
        Sorry, there was an issue{' '}
        <a href={aapbSearchUrl}>
          searching AmericanArchive.org for <em>{query}</em> <ExternalLink />
        </a>
      </>
    )
  }
  return (
    <>
      Found
      <AAPBResultCount resultCount={result_count} />
      matching records on AmericanArchive.org for "{query}"
      <div className='ais-Hits'>
        <div className='ais-Hits-list'>
          {hits.map((hit: AAPBHit) => (
            <AAPBHit key={hit.id} hit={hit} aapbHost={aapbHost} />
          ))}
        </div>
      </div>
      <a href={aapbSearchUrl} target='_blank'>
        View
        <AAPBResultCount resultCount={result_count} />
        more results on AmericanArchive.org"
        <ExternalLink />
      </a>
    </>
  )
}

export const AAPBHit = ({ hit, aapbHost }: AAPBHitProps) => {
  let pb = pbcore2json(hit.xml)

  console.log('hit pbcore', pb)
  return (
    <div className='ais-Hits-item aapb-hit'>
      <a href={`${aapbHost}/catalog/${hit.id}`}>
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
        description = description.map(d => d.text).join(', ')
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
        part.toLowerCase() === query.toLowerCase() ?
          <mark className='ais-Highlight-highlighted' key={i}>
            {part}
          </mark>
        : <span className='ais-Highlight-nonHighlighted' key={i}>
            {part}
          </span>
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
        part.toLowerCase() === query.toLowerCase() ?
          <mark className='ais-Snippet-highlighted' key={i}>
            {part}
          </mark>
        : <span className='ais-Snippet-nonHighlighted' key={i}>
            {part}
          </span>
      )}
    </span>
  )
}

export const removeSpecialChars = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\"']/g, '')

export const AAPBResultCount = ({
  resultCount,
}: {
  resultCount: number | null | undefined
}) => (
  <span className='ais-RefinementList-count'>
    {resultCount === null ?
      <Spinner />
    : resultCount.toLocaleString()}
  </span>
)
