export async function getPreview(id, content_type, token) {
  // exhibit_page or collection_page
  let url = `${process.env.OV_API_URL}/api/v2/page_preview/${id}/?content_type=${content_type}&token=${token}&format=json`


  console.log( 'OBVIOUSLy im trying to get', url )
  return await fetch(url, (res) => {
    // console.log("preview", res)
  })
}
