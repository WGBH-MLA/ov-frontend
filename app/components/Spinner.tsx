import { useInstantSearch } from 'react-instantsearch'
import '~/styles/spinner.css'

// Generic loading spinner component
export const Spinner = () => (
  <div className='spinner'>
    <div className='rect1'></div>
    <div className='rect2'></div>
    <div className='rect3'></div>
    <div className='rect4'></div>
    <div className='rect5'></div>
  </div>
)

/* InstantSearch aware loading spinner based on search status

  States:
  - loading: The search is in progress
  - stalled: The search is taking longer than expected
  - error: The search failed
  - idle: The search succeeded
*/
export const StatusSpinner = () => {
  const { status } = useInstantSearch()
  return <>{(status === 'loading' || status === 'stalled') && <Spinner />}</>
}
