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
}
