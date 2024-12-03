import { useSearchBox } from 'react-instantsearch'
import shuffle from '~/utils/shuffle'

export const default_suggestions = [
  'Julia Child',
  'Louis Lyons',
  'Boston',
  'Arthur',
  'NOVA',
  'Civil Rights',
  'Vietnam',
  'WGBH',
  'Cooking',
  'Music',
]

export const SearchLink = (query: string) => {
  const { refine } = useSearchBox()

  return (
    <div
      onClick={(event) => {
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
          .map((query) => (
            <li key={query}>{SearchLink(query)}</li>
          ))}
      </ul>
    </>
  )
}
