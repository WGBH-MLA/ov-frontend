import { decode } from "html-entities"
import { handleAapbRecordGroup, AAPBRecord } from "./aapbRecordHelpers"
import { AAPB_BLOCK_TYPES } from '../data/aapbBlockTypes'

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
  } else if(AAPB_BLOCK_TYPES.some((bt) => bt == block.type)){
    return aapbRecordsBlock(block, key)
  } else if(block.type == "heading"){
    return headingContent(block, key)
  } else if(block.type == "subheading"){
    return subHeadingContent(block, key)
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
    <div key={ key }>
      <div id={ block.id } className="guids-block-title" dangerouslySetInnerHTML={{ __html: decode(block.value.title) }} />
      { handleAapbRecordGroup(block) }
    </div>
  )
}

export function textContent(block, key){
  return (
    <div id={ block.id } key={ key } className="content-block content-text" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />  
  )
}

export function headingContent(block, key){
  return (
    <h3 id={ block.id } key={ key } className="content-block content-heading" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
  )
}

export function subHeadingContent(block, key) {
  return (
    <h4 id={ block.id } key={ key } className="content-block content-subheading" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
  )
}
export function imageContent(block, key){
  return (
    <div id={ block.id } key={ key } className="content-block content-image">
      An Image! (id { block.value })
    </div>
  )
}

export function creditsContent(block, key){
  return (
    <div key={ key } id={ block.id } className="content-block content-credits">
      <h3>Credits</h3>
      <div className="content-block-body" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
    </div>
  )
}

// generic block
export function contentBlock(block, key){
  return <div key={ key } id={ block.id } className="content-block" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
}

function devImgSrc(src){
  if(src.startsWith("/")){
    return "http://localhost:8000" + src
  }
}
