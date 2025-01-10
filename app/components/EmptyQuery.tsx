import { useSearchBox } from 'react-instantsearch'
import Suggestions from './Suggestions'

export const EmptyQueryBoundary = ({ children, fallback }) => {
  const { query } = useSearchBox()

  return (
    <>
      <div hidden={Boolean(query)}>{fallback}</div>
      <div hidden={!Boolean(query)}>{children}</div>
    </>
  )
}

export const EmptyQueryMessage = () => {
  return (
    <>
      <p>Search articles, titles, and GBH Series on Open Vault</p>
      <Suggestions />
      <p>See the help section for search tips and advanced syntax.</p>
    </>
  )
}
