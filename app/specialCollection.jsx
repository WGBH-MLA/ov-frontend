export async function getSpecialCollection(id) {
  return await fetch("http://localhost:8000/api/v2/specialCollection/" + id, (res) => {
    console.log( "spec", res )
  })
}

export async function getSpecialCollections() {
  return await fetch("http://localhost:8000/api/v2/specialCollections", (res) => {
    console.log("specs", res)
  })
}
