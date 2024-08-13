export async function getExhibits() {
  return await fetch(process.env.OV_API_URL + '/api/v2/exhibits/', res => {
    console.log('exs', res)
  })
}

export async function getExhibit(path) {
  // maybe its an alphanum slug
  const body = await fetch(
    `${process.env.OV_API_URL}/api/v2/pages/?slug=${path}`
  )
    .then(res => res.json())
    .catch(err => {
      console.log('exhibit fetch error', err)
      throw new Response('Error fetching exhibits', { status: 500 })
    })
  console.log('exhibit body', body)
  if (body.meta && body.meta.total_count === 0) {
    console.log('exhibit not found by slug')
    throw new Response(`No Exhibit called: ${path}`, { status: 404 })
  }
  return await fetch(
    `${process.env.OV_API_URL}/api/v2/exhibits/${body.items[0].id}`
  )
}
