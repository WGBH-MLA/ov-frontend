/*Health Check

This is a simple health check route that returns a 200 status code and a JSON response with a status of "ok". This is monitored by the cluster to ensure the app is running, and is available for use by monitoring tools.
*/

import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async () => {
  throw Response.json({ status: 'ok' })
}
