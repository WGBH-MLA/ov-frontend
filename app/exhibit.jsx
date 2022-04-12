export async function getExhibits() {
  // how you get just exhibits 
  return await fetch("http://localhost:8000/api/v2/pages", (res) => {
    console.log(res)
  })
}

export async function getExhibit(id) {
  return await fetch("http://localhost:8000/api/v2/pages/" + id)
}
