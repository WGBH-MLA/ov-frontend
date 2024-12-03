import { useSearchBox } from 'react-instantsearch'

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

export const shuffle = (array: Array<any>) => {
  // Fisher-Yates shuffle algorithm (AKA Knuth shuffle)
  // Blatantly stolen from https://stackoverflow.com/a/2450976/19192178
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
}

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
  shuffle(default_suggestions)
  return (
    <>
      <h4>Search suggestions:</h4>
      <ul>
        {default_suggestions.slice(0, 4).map((query) => (
          <li key={query}>{SearchLink(query)}</li>
        ))}
      </ul>
    </>
  )
}
