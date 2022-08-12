export async function getExhibits() {
  // how you get just exhibits 
  return await fetch(process.env.OV_API_URL + "/api/v2/exhibit", (res) => {
    console.log("exs", res)
  })
}

export async function getExhibit(id) {
  return await fetch(process.env.OV_API_URL + "/api/v2/exhibit/" + id, (res) => {
    console.log("ex", res)
  })
}
