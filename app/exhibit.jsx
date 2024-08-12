export async function getExhibits() {
  return await fetch(process.env.OV_API_URL + '/api/v2/exhibits/')
}

export async function getExhibit(id) {
  return await fetch(process.env.OV_API_URL + `/api/v2/exhibits/${id}/`)
}
