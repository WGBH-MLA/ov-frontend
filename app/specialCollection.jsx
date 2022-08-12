export async function getSpecialCollections() {
  // how you get just em 
  return await fetch("http://localhost:8000/api/v2/", (res) => {
    console.log("specs", res)

  })
}

export async function getSpecialCollection(id) {
  return await fetch("http://localhost:8000/api/v2/pages/" + id, (res) => {
    console.log( "spec", res )
  })
}
