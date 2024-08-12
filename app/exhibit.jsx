export async function getExhibits() {
  return await fetch(process.env.OV_API_URL + "/api/v2/exhibits/", (res) => {
    console.log("exs", res)
  })
}

export async function getExhibit(path) {
  var url
  if(path.match(/^\d$/)){

    // its an integer ID
    url = `${process.env.OV_API_URL}/api/v2/exhibits/${path}`
    return await fetch(url)
  } else {

    // its an alphanum slug
    url = `${process.env.OV_API_URL}/api/v2/pages/?slug=${path}`

    const resp = await fetch(url)
    const body = await resp.json()
    if(body.items && body.items.length > 0){
      return await fetch(`${process.env.OV_API_URL}/api/v2/exhibits/${ body.items[0].id }`)
    }
  }
}
