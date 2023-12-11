import React, { Component } from 'react'

export function parseAapbGuids(aapbRecordGroups){
  // comes as array of 'aapb_record_group'

  // would be preferable to have values from api come split in an array rather than with arbitrary whitespace
  var guids = aapbRecordGroups.map( (aapbRecordGroup) => {
    return parseAapbRecordGroup(aapbRecordGroup.value.ids)
  }).flat()
  
  console.log( 'its da guids baby!', guids )
  return guids
}

function parseAapbRecordGroup(string){
  return string.split(/\s+/)
}

async function retrieveAapbRecord(guid){
  // cant get process.env in here, so need to use initializer to get it from env, but use this for now
  var aapbHost = "https://americanarchive.org"
  return await fetch(aapbHost + "/api/" + guid + ".json").then(response => response.json() ).catch((e) => console.log( 'oh no!' ))
}

export function aapbBlock(block){
  return (
    <a style={{ backgroundImage: `url(${devImgSrc(block.image.src)})` }} className="content-aapbblock" href={ block.link }>
      <div className="shade-bar" dangerouslySetInnerHTML={{ __html: decode(block.title) }}/>
      <div className="blue-circle"><div/></div>
    </a>
  )
}

export class AAPBRecord extends Component {
  constructor(props){
    super(props)
    this.state = {
      // woo: "great"
    }
  }

  async componentDidMount(){
    var record = await retrieveAapbRecord(this.props.guid)
    console.log( 'record', record )
  }

  render(){
    return (
      <div>
        { this.props.guid }
      </div>
    )
  }
}
