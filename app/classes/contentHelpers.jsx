import { decode } from "html-entities"
import { handleAapbRecordGroup, AAPBRecord } from "~/classes/aapbRecordHelpers"

export function renderBlocks(blocks){
  // jsx likes to be in an array to be concatted when rendered
  let output = []
  blocks.forEach( (block, index) => {
    output.push( renderBlock(block, index) )
  })

  return output
}

export function renderBlock(block, key){

  if(block.type == "text"){
    return textContent(block, key)
  } else if(block.type == "interviews" || block.type == "archival_footage" || block.type == "photographs" || block.type == "original_footage" || block.type == "programs" || block.type == "related_content"){
    return aapbRecordsBlock(block, key)
  } else if(block.type == "heading"){
    return headingContent(block, key)
  } else if(block.type == "image"){
    return imageContent(block, key)
  } else if(block.type == "credits"){
    return creditsContent(block, key)
  } else {
    // return (<div key={ block.id }>I DONT FEEL LIKE IT</div>)
    return contentBlock(block, key)
  }
}

export function aapbRecordsBlock(block, key){
  // here its an aapbrecordgroup
  return (
    <div>
      <div className="guids-block-title" dangerouslySetInnerHTML={{ __html: decode(block.value.title) }} />
      { handleAapbRecordGroup(block, key) }
    </div>
  )
}

export function textContent(block){
  return (
    <div id={ block.id } key={ block.id } className="content-block content-text">
      { block.value }
    </div>  
  )
}

export function headingContent(block){
  return (
    <div id={ block.id } key={ block.id } className="content-block content-heading">
      { block.value }
    </div>  
  )
}

export function imageContent(block){
  return (
    <div id={ block.id } key={ block.id } className="content-block content-image">
      An Image! (id { block.value })
    </div>
  )
}

export function creditsContent(block){
  return (
    <div key={ block.id } id={ block.id } className="content-block content-credits">
      <h3>Credits</h3>
      <div className="content-block-body" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
    </div>
  )
}

// generic block
export function contentBlock(block){
  return <div key={ block.id } id={ block.id } className="content-block" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
}

function devImgSrc(src){
  if(src.startsWith("/")){
    return "http://localhost:8000" + src
  }
}
