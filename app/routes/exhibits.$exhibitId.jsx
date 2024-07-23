import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'
import { getExhibit } from '../exhibit'
import { renderExhibit } from '../classes/exhibitPresenter'

export const loader = async ({ params }) => {
  console.log('exx id ', params)
  return await getExhibit(params.exhibitId)
}

export default function Exhibits() {
  const exhibit = useLoaderData()

  if (!exhibit) {
    return <div className="page-body-container">Exhibit was not found!</div>
  }

  return renderExhibit(exhibit)
}

export function ErrorBoundary() {
  const error = useRouteError()
  if (error.status === 404) {
    // Check to see if this is an old Open Vault URL
    let exhibitId = error.exhibit_id
    if (isRouteErrorResponse(error)) {
      console.log('exhibit error', error)
      switch (error.status) {
        case 404:
          return (
            <div>
              <h1>Exhibit Not Found</h1>
              <p>Sorry, we couldn't find the exhibit you were looking for.</p>
            </div>
          )
      }
    }
  }
}
