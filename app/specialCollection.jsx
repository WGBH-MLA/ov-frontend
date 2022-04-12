export async function getSpecialCollections() {
  // how you get just em 
  return await fetch("http://localhost:8000/api/v2/pages", (res) => {
    console.log(res)
  })
}

export async function getSpecialCollection(id) {
  return await fetch("http://localhost:8000/api/v2/pages/" + id)
}
