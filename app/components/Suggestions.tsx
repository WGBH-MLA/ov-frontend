import { useSearchBox } from 'react-instantsearch'
import shuffle from '~/utils/shuffle'

export const default_suggestions = [
  // People
  'Julia Child',
  'Joyce Chen',
  'Louis Lyons',
  // Topics
  'Boston',
  'Civil Rights',
  'Cooking',
  'History',
  'Music',
  'Radio',
  'Television',
  'Vietnam',
  'WGBH',
  // Shows
  'Arthur',
  'NOVA',
  'Frontline',
  'The Big Dig',
  'The French Chef',
]

export const SearchLink = (query: string) => {
  const { refine } = useSearchBox()

  return (
    <div
      onClick={event => {
        refine(query)
      }}>
      {query}
    </div>
  )
}

export default () => {
  return (
    <>
      <h4>Search suggestions:</h4>
      <ul>
        {shuffle(default_suggestions)
          .slice(0, 4)
          .map(query => (
            <li className='search-suggestion' key={query}>
              {SearchLink(query)}
            </li>
          ))}
      </ul>
    </>
  )
}
