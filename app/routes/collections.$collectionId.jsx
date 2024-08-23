import { useLoaderData } from '@remix-run/react'
import { getPageBySlug } from '../fetch'
import { renderCollection } from '../classes/collectionPresenter'
import { ErrorBoundary } from './exhibits.$exhibitPath'

export const loader = async ({ params }) => {
  return await getPageBySlug('collections', params.collectionId)
}

export const meta = ({ data }) => {
  return [
    {
      title: `${data.title} | GBH Open Vault`,
    },
    {
      name: 'description',
      content: data.meta.search_description || 'GBH Open Vault Collection',
    },
  ]
}

export default function Collections() {
  const spec = useLoaderData()

  if (!spec.content) {
    return <div className="page-body-container">Collection was not found!</div>
  }

  return renderCollection(spec)
}

export { ErrorBoundary }
