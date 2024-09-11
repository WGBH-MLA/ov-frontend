import { useLoaderData } from '@remix-run/react'
import { getCollections } from '../fetch'
import { renderPageLinks } from '../classes/pageHelpers'
import { Meta } from '../classes/meta'

export const loader = async () => {
  return await getCollections()
}

export const meta = () => {
  return [
    { title: 'Collections | GBH Open Vault' },
    {
      name: 'description',
      content: 'Explore Special Collections, curated from the GBH Archives.',
    },
    ...Meta,
  ]
}

export default function Collections() {
  let specs

  // actually get from api
  specs = useLoaderData()
  let collectionLinks = renderPageLinks('collections', specs.items)

  return <div className="pagelinks-container">{collectionLinks}</div>
}
