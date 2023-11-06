export async function getSpecialCollection(id) {
  return await fetch(process.env.OV_API_URL + "/api/v2/specialCollection/" + id, (res) => {
    console.log( "spec", res )
  })
}

export async function getSpecialCollections() {
  return await fetch(process.env.OV_API_URL + "/api/v2/specialCollection/", (res) => {
    console.log("specs", res)
  })
}
