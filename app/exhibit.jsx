import { redirect } from '@remix-run/node'
import { fetch2 } from './fetch'

export async function getExhibits() {
  return await fetch2(process.env.OV_API_URL + '/api/v2/exhibits/')
}

export async function getExhibit(id) {
  return await fetch2(process.env.OV_API_URL + `/api/v2/exhibits/${id}/`).catch(
    async error => {
      if (error.status === 404) {
        console.log('Exhibit not found. Checking if this is an old Open Vault URL...')
        // If there's no matching exhibit from the API,
        // check if this might be an old Open Vault URL.

        // This service is not yet implemented,
        // but using it would look something like this:
        await fetch(`${process.env.ORGAN_URL}/v1/ov/exhibits/${id}`)
          .then(res => {
            if (res?.status === 200) {
              console.log('Found old exhibit', res)
              let exhibit = res.json()
              return redirect(`/exhibits/${exhibit.id}`)
            }
          })
          .catch(err => {
            console.error('error resolving exhibit', err)
          })
      }
      throw error
    }
  )
}
