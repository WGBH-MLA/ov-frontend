import { useInstantSearch } from 'react-instantsearch-core'

export function Error() {
  const { error } = useInstantSearch({ catchError: true })

  if (error) {
    // throw error
    return (
      <div className='search-error'>
        <h2>Search Error</h2>
        <p>
          There was an error processing your search. Please try again later.
        </p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  return <></>
}
