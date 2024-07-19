import { fetch2 } from './fetch'

export async function getExhibits() {
  return await fetch2(process.env.OV_API_URL + '/api/v2/exhibits/')
}

export async function getExhibit(id) {
  return await fetch2(process.env.OV_API_URL + '/api/v2/exhibits/' + id)
}
