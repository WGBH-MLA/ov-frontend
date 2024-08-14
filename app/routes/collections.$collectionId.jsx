import { useLoaderData } from '@remix-run/react'
import { getPageBySlug } from '../fetch'
import { renderCollection } from '../classes/collectionPresenter'
import { ErrorBoundary } from './exhibits.$exhibitPath'

export const loader = async ({ params }) => {
  return await getPageBySlug('collections', params.collectionId)
}

export default function Collections() {
  const spec = useLoaderData()

  if (!spec.content) {
    return <div className="page-body-container">Collection was not found!</div>
  }

  return renderCollection(spec)
}

export { ErrorBoundary }
