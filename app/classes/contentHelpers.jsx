export function renderBlocks(blocks){
  // jsx likes to be in an array to be concatted when rendered
  let output = []
  blocks.forEach( (block) => {
    console.log( 'render this one!', block )
    output.push( renderBlock(block) )
  })

  return output
}

export function renderBlock(block){
  if(block.type == "text"){
    return textContent(block)
  } else if(block.type == "credits"){
    // something else
    return (<div key={ block.id }>SOMETHING ELSE</div>)
  } else {
    return (<div key={ block.id }>I DONT FEEL LIKE IT</div>)
  }
}


export function textContent(block){
  return (
    <div key={ block.id } id={ block.id } className="content-text">
      { block.value }
    </div>  
  )
}
