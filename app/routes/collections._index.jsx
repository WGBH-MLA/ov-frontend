import { useLoaderData } from 'react-router';
import { getCollections } from '~/utils/fetch'
import { renderPageLinks } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'

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
  const specs = useLoaderData()
  const masterpiece = {
    meta: {
      slug: 'masterpiece',
    },
    title: 'Alistair Cooke Masterpiece Theatre Collection',
    cover_image: {
      full_url:
        'https://s3.amazonaws.com/openvault.wgbh.org/treasuries/alistair_cooke_collection.jpg',
    },
  }

  // mix in masterpiece collection
  specs.items.unshift(masterpiece)

  let collectionLinks = renderPageLinks('collections', specs.items)
  return (
    <div className='pagelinks-container'>
      <h1>Special Collections</h1>
      <h4>
        Explore selected topics and digitized programs of historical
        significance from the GBH Archives.
      </h4>
      {collectionLinks}
    </div>
  )
}
