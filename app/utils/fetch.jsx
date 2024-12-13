export async function getExhibits() {
  return await fetch(process.env.OV_API_URL + '/api/v2/exhibits/?limit=20', res => {
    console.log('exs', res)
  })
}

export async function getCollections() {
  return await fetch(process.env.OV_API_URL + '/api/v2/collections/?limit=20')
}

export async function getHomepage() {
  var cr = await fetch(
    process.env.OV_API_URL + '/api/v2/collections/?order=random&limit=3'
  )
  var collections = await cr.json()
  var er = await fetch(
    process.env.OV_API_URL + '/api/v2/exhibits/?order=random&limit=3'
  )
  var exhibits = await er.json()
  return {
    collections: collections,
    exhibits: exhibits,
  }
}

export async function getPageBySlug(type, slug) {
  // Search for a Wagtail page by slug
  // Then fetch the full exhibit or collection data

  // type must be 'exhibits' or 'collections'
  const body = await fetch(
    `${process.env.OV_API_URL}/api/v2/pages/?slug=${slug}`
  )
    .then(res => res.json())
    .catch(err => {
      console.log('fetch error', err)
      throw new Response(`Error fetching ${type}`, {
        status: 500,
        statusText: 'Something went wrong. Try again later.',
      })
    })
  if (body.meta && body.meta.total_count === 0) {
    console.log(`Page not found by slug`)
    throw new Response(`No ${type} called: ${slug}`, { status: 404 })
  }
  return await fetch(
    `${process.env.OV_API_URL}/api/v2/${type}/${body.items[0].id}`
  ).then(res => res.json())
}
