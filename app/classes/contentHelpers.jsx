import { decode } from "html-entities"
import { AAPBRecord } from "~/classes/aapbRecordHelpers"

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
  } else if(block.type == "interviews"){
    return interviewsContent(block, key)
  } else if(block.type == "programs"){
    return programsContent(block, key)    
  // } else if(block.type == "archivalFootage"){
  //   return archivalFootageContent(block, key)
  // } else if(block.type == "photographs"){
  //   return photographsContent(block, key)
  // } else if(block.type == "originalFootage"){
  //   return originalFootageContent(block, key)
  } else if(block.type == "related_content"){
    return relatedContentContent(block, key)
  // } else if(block.type == "credits"){
  //   return creditsContent(block, key)
  } else if(block.type == "heading"){
    return headingContent(block, key)
  } else if(block.type == "image"){
    return imageContent(block, key)
  } else if(block.type == "credits"){
    return creditsContent(block, key)

  } else if(block.type == "aapb_record"){
    // share the AAPBRecord component with the separate aapb_record_group feature
    return <AAPBRecord key={ key } guid={ block.guid } />
  } else {
    // return (<div key={ block.id }>I DONT FEEL LIKE IT</div>)
    return contentBlock(block, key)
  }
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

export function relatedContentContent(block){
  var links = block.value
  var content = links.map( (link, index) => {
    return (
      <a key={ index } href={ link.link } dangerouslySetInnerHTML={{ __html: decode(link.title) }} />
    )
  })

  return (
    <div key={ block.id } id={ block.id } key={ block.id } className="content-block content-relatedcontent">
      <h3>Related Content</h3>
      { content }
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

export function interviewsContent(block){
  var interviews = block.value.map( (interview, index) => {
    return (
      <a key={ index } className="interview" href={ interview.link }>
        <img src={ devImgSrc(interview.image.src) } />
        <div dangerouslySetInnerHTML={{ __html: decode(interview.title) }}/>
      </a>
    )
  })

  return (
    <div key={ block.id } id={ block.id } className="content-interviews">
      <h3>Interviews</h3>
      { interviews }
    </div>
  )
}

export function programsContent(block){
  var programs = block.value.map( (program, index) => {
    return (
      <a key={ index } className="program" href={ program.link } dangerouslySetInnerHTML={{ __html: decode(program.title) }} />
    )
  })

  return (
    <div key={ block.id } id={ block.id } className="content-programs">
      <h3>Programs</h3>
      { programs }
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

// export function interviewsContent(block){}
// export function archivalFootageContent(block){}
// export function photographsContent(block){}
// export function originalFootageContent(block){}

