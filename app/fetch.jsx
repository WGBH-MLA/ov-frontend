export const fetch2 = async (url, options) => {
    // fetch data and throw errors if they occur
  return await fetch(url, options)
    .then(res => {
      console.log('res', res)
      if (res.ok) {
        return res.json()
      }
      // if the response is not ok, throw an error with the status code and text
      console.log('res not ok', res)
      throw new Response('Failed to fetch data', {
        status: res.status,
        statusText: res.statusText,
      })
    })
    .catch(err => {
      // Catch all errors, including the fetch error above.
      console.error('error', err)
      if (err.cause?.code === 'ECONNREFUSED') {
        throw new Response('Failed to connect to the API', {
          status: 500,
          statusText: 'Failed to connect to the API',
        })
      }
      throw new Response('Fetch failed', {
        status: err.status,
        statusText: err.statusText,
      })
    })
}
