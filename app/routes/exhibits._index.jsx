import { Link, useLoaderData } from '@remix-run/react'
import { getExhibits } from '~/utils/fetch'
import { renderPageLinks } from '~/classes/pageHelpers'
import { Meta } from '~/classes/meta'

export const loader = async () => {
  return await getExhibits()
}

export const meta = () => {
  return [
    { title: `Scholar Exhibits | GBH Open Vault` },
    {
      name: 'description',
      content: `Explore exhibits created by scholars from the GBH Archives.`,
    },
    ...Meta,
  ]
}

export default function Exhibits() {
  let exhibits = useLoaderData()
  let exhibitLinks
  if (exhibits.items) {
    exhibitLinks = renderPageLinks('exhibits', exhibits.items)
  }

  return <div className="pagelinks-container">{exhibitLinks}</div>
}
