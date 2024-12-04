import { useInstantSearch } from 'react-instantsearch'

export const ResultsCount = () => {
  const { results } = useInstantSearch()

  return (
    <span className='ais-RefinementList-count'>
      {results ? results.nbHits : null}
    </span>
  )
}
