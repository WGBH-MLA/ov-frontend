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
  } else if(block.type == "interviews"){
    return interviewsContent(block)
  } else if(block.type == "programs"){
    return programsContent(block)    
  // } else if(block.type == "archivalFootage"){
  //   return archivalFootageContent(block)
  // } else if(block.type == "photographs"){
  //   return photographsContent(block)
  // } else if(block.type == "originalFootage"){
  //   return originalFootageContent(block)
  } else if(block.type == "related_content"){
    return relatedContentContent(block)
  // } else if(block.type == "credits"){
  //   return creditsContent(block)
  } else if(block.type == "heading"){
    return headingContent(block)
  } else if(block.type == "image"){
    return imageContent(block)
  } else if(block.type == "credits") {
    return creditsContent(block)
  } else {
    // return (<div key={ block.id }>I DONT FEEL LIKE IT</div>)
    return contentBlock(block)
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
  var content = links.map( (link) => {
    return (
      <a href={ link.link } dangerouslySetInnerHTML={{ __html: decode(link.title) }} />
    )
  })

  return (
    <div id={ block.id } key={ block.id } className="content-block content-relatedcontent">
      <h3>Related Content</h3>
      { content }
    </div>
  )
}

export function creditsContent(block){
  return (
    <div id={ block.id } className="content-block content-credits">
      <h3>Credits</h3>
      <div className="content-block-body" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
    </div>
  )
}

export function interviewsContent(block){
  var interviews = block.value.map( (interview) => {
    return (
      <a className="interview" href={ interview.link }>
        <img src={ devImgSrc(interview.image.src) } />
        <div dangerouslySetInnerHTML={{ __html: decode(interview.title) }}/>
      </a>
    )
  })

  interviews = block.value.map( (interview) => {
    return aapbBlock(interview)
  })

  return (
    <div id={ block.id } className="content-interviews">
      <h3>Interviews</h3>
      { interviews }
    </div>
  )
}

export function programsContent(block){
  var programs = block.value.map( (program) => {
    return (
      <a className="program" href={ program.link } dangerouslySetInnerHTML={{ __html: decode(program.title) }} />
    )
  })

  return (
    <div id={ block.id } className="content-programs">
      <h3>Programs</h3>
      { programs }
    </div>
  )
}

export function aapbBlock(block){
  return (
    <a style={{ backgroundImage: `url(${devImgSrc(block.image.src)})` }} className="content-aapbblock" href={ block.link }>
      <div className="shade-bar" dangerouslySetInnerHTML={{ __html: decode(block.title) }}/>
    </a>
  )
}

// generic block
export function contentBlock(block){
  return <div id={ block.id } className="content-block" dangerouslySetInnerHTML={{ __html: decode(block.value) }} />
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

