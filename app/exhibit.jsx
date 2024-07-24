import { redirectDocument } from '@remix-run/node'
import { fetch2 } from './fetch'

export async function getExhibits() {
  return await fetch2(process.env.OV_API_URL + '/api/v2/exhibits/')
}

export async function getExhibit(id) {
  return await fetch2(process.env.OV_API_URL + `/api/v2/exhibits/${id}/`).catch(
    async error => {
      if (error.status != 404) {
        throw error
      }
      console.log(
        'Exhibit not found. Checking if this is an old Open Vault URL...'
      )
      // If there's no matching exhibit from the API,
      // check if this might be an old Open Vault URL.

      // This service is not yet implemented,
      // but using it would look something like this:
      return await fetch(`${process.env.ORGAN_URL}/ov/exhibits/${id}`)
        .then(res => {
          if (res?.status !== 200) {
            throw error
          }
          console.log('Found old exhibit', res)
          return res.json()
        })
        .then(old_exhibit => {
          console.log('old exhibit', old_exhibit)
          return redirectDocument(`/exhibits/${old_exhibit.id}`)
        })
        .catch(err => {
          console.error('error resolving exhibit', err)
          // throw the initial 404 error, instead of the error from the resolver
          throw error
        })
    }
  )
}
