import { decode } from "html-entities"

export function renderBlocks(blocks){
  // jsx likes to be in an array to be concatted when rendered
  let output = []
  blocks.forEach( (block) => {
    output.push( renderBlock(block) )
  })

  return output
}

export function renderBlock(block){
  if(block.type == "text"){
    return textContent(block)
  // } else if(block.type == "interviews"){
  //   return interviewsContent(block)
  // } else if(block.type == "archivalFootage"){
  //   return archivalFootageContent(block)
  // } else if(block.type == "photographs"){
  //   return photographsContent(block)
  // } else if(block.type == "originalFootage"){
  //   return originalFootageContent(block)
  // } else if(block.type == "relatedContent"){
  //   return relatedContentContent(block)
  // } else if(block.type == "credits"){
  //   return creditsContent(block)
  } else if(block.type == "heading"){
    return headingContent(block)
  } else if(block.type == "image"){
    return imageContent(block)
  } else {
    // lol
    // return (<div key={ block.id }>I DONT FEEL LIKE IT</div>)
    return contentBlock(block)
  }
}

export function textContent(block){
  return (
    <div key={ block.id } id={ block.id } className="content-block content-text">
      { block.value }
    </div>  
  )
}

export function headingContent(block){
  return (
    <div key={ block.id } id={ block.id } className="content-block content-heading">
      { block.value }
    </div>  
  )
}

export function contentBlock(block){
  <div className="content-block" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
}

export function creditsContent(block){
  // let parser = new DOMParser()
  // let creditHTML = parser.parseFromString(block.value)
  // var creds = creditHTML.querySelector("p")

  return (
    <div className="page-body" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
  )
}

export function interviewsContent(block){}
export function archivalFootageContent(block){}
export function photographsContent(block){}
export function originalFootageContent(block){}
export function relatedContentContent(block){}
export function imageContent(block){}
