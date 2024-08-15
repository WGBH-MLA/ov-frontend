import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'
import { getPageBySlug } from '../fetch'
import { renderExhibit } from '../classes/exhibitPresenter'

export const loader = async ({ params }) => {
  console.log('exx path ', params)
  let exhibit = await getPageBySlug('exhibits', params.exhibitPath)
  console.log('exhibit loader', exhibit)
  return exhibit
}

export default function Exhibit() {
  const exhibit = useLoaderData()
  console.log('exhibit', exhibit)

  return renderExhibit(exhibit)
}

export function ErrorBoundary() {
  // This is also the error boundary for the /collections route
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    console.error('exhibit error', error)
    if (error.status !== 404) throw error
    return (
      <div className="page-body-container">
        <h1>Not found</h1>
        <h3>{error.data}</h3>
        <div>{error.statusText}</div>
        <div>Check your spelling, or try another route.</div>
      </div>
    )
  }
}
