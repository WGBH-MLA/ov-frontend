import { useInstantSearch } from 'react-instantsearch'
import { Spinner } from './Spinner'

export const ResultsCount = () => {
  const { results } = useInstantSearch()

  return (
    <span className='ais-RefinementList-count'>
      {results === undefined ?
        <Spinner />
      : results.nbHits.toLocaleString()}
    </span>
  )
}
