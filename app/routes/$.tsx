/* This is a catch-all route for any unmatched paths */

import { redirect } from '@remix-run/node'
import { isRouteErrorResponse, useRouteError } from '@remix-run/react'
import { exhibitLinks, collectionLinks, externalLinks } from '~/data/redirects'

export const loader = async ({ params }) => {
  let path = params['*'] || ''
  let parts = path.split('/')
  let route = parts[0]
  let slug = parts[1] || ''
  let newSlug
  // Check if the path matches an exhibit or collection redirect
  switch (route) {
    case 'exhibits':
      newSlug = exhibitLinks[slug]
      if (newSlug) {
        if (newSlug === 'zoom') {
          // Special case for the Zoom exhibit, which links to AAPB
          return redirect(newSlug)
        }
        console.log(`Redirecting to new exhibit slug: ${newSlug}`)
        return redirect(`/exhibits/${newSlug}`)
      }
      break
    case 'collections':
      newSlug = collectionLinks[slug]
      if (newSlug) {
        console.log(`Redirecting to new collection slug: ${newSlug}`)
        return redirect(`/collections/${newSlug}`)
      }
      break
    default:
      newSlug = externalLinks[path]
      if (newSlug) {
        console.log(`Redirecting to external link: ${externalLinks[path]}`)
        return redirect(externalLinks[path])
      }
      throw new Response(`No page found for: ${path}`, { status: 404 })
  }

  // If no match, redirect to home
  return redirect('/')
}
export const ErrorBoundary = () => {
  const error = useRouteError()

  return isRouteErrorResponse(error) ? (
    <div className='page-body-container'>
      <h1>{error.status} error</h1>
      <h3>{error.data}</h3>
      <p>{error.statusText}</p>
    </div>
  ) : (
    <div className='error-container'>
      <h1>Oh no!</h1>
      <p>Oops! Something went wrong. Please try again later.</p>
    </div>
  )
}
export const meta = () => {
  return [
    { title: 'GBH Open Vault' },
    {
      name: 'description',
      content: 'GBH Open Vault',
    },
  ]
}
