export async function getCollections() {
  return await fetch(process.env.OV_API_URL + '/api/v2/collections/')
}

export async function getCollection(id) {
  return await fetch(process.env.OV_API_URL + `/api/v2/collections/${id}/`)
}
