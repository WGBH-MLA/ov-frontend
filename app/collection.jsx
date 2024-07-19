import { fetch2 } from './fetch'

export async function getCollection(id) {
  return await fetch2(process.env.OV_API_URL + '/api/v2/collections/' + id)
}

export async function getCollections() {
  return await fetch2(process.env.OV_API_URL + '/api/v2/collections/')
}
