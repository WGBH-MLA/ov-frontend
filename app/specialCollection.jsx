export async function getSpecialCollection(id) {
  return await fetch(process.env.OV_API_URL + "/api/v2/collections/" + id, (res) => {})
}

export async function getSpecialCollections() {
  return await fetch(process.env.OV_API_URL + "/api/v2/collections/", (res) => {})
}
