import React, { Component } from 'react'

const AAPB_HOST = "https://americanarchive.org"

export function parseAapbGuids(aapbRecordGroups){
  // this flattens grousp into one group,  will delete

  // comes as array of 'aapb_record_group'

  // would be preferable to have values from api come split in an array rather than with arbitrary whitespace
  var guids = aapbRecordGroups.map( (aapbRecordGroup) => {
    return parseAapbRecordGroup(aapbRecordGroup.value.ids)
  }).flat()
  
  return guids
}

export function parseAapbRecordGroup(string){
  return string.split(/\s+/)
}

async function retrieveAapbRecord(guid){
  // cant get process.env in here, so need to use initializer to get it from env, but use this for now
  return await fetch(AAPB_HOST + "/api/" + guid + ".json").then(response => response.json() ).catch((e) => console.log( `Error retrieving record from AAPB: ${e}` ))
}

export class AAPBRecord extends Component {
  constructor(props){
    super(props)
    this.state = {
      showThumbnail: props.showThumbnail,
      showTitle: props.showTitle
    }
  }

  async componentDidMount(){
    var hyphenGuid = this.props.guid.replace(/cpb-aacip./, "cpb-aacip-")
    var record = await retrieveAapbRecord(hyphenGuid)
    console.log( 'record', record )
    this.setState({guid: hyphenGuid, pbcore: record})
  }

  aapbThumbnailURL(guid){
    const S3_BASE = "https://s3.amazonaws.com/americanarchive.org"
    return `${S3_BASE}/thumbnail/${guid}.jpg`
  }

  aapbCatalogURL(guid){
    return `${AAPB_HOST}/catalog/${guid}`
  }

  aapbTitle(pbcore){
    if(pbcore?.pbcoreDescriptionDocument?.pbcoreTitle?.text ){
      // there is one title
      return pbcore.pbcoreDescriptionDocument.pbcoreTitle.text
    } else if(pbcore?.pbcoreDescriptionDocument?.pbcoreTitle?.length > 0) {    
      // there are multiple titles
      return pbcore.pbcoreDescriptionDocument.pbcoreTitle.map( (titleObj) => { return titleObj.text }).join("; ")
    } else {
      return "Untitled Record"
    }
  }

  render(){
    let recordBlock
    if(this.state.pbcore){
      let titleBar
      if(this.props.showTitle){
        titleBar = (
          <div className="shade-bar">
            <div>
              { this.aapbTitle(this.state.pbcore) }
            </div>
          </div>
        )
      }

      let thumbnail
      if(this.props.showThumbnail){
        thumbnail = (
          { backgroundImage: `url(${ this.aapbThumbnailURL(this.state.guid) })` }
        )
      }

      recordBlock = (
        <a style={ thumbnail } className="content-aapbblock" href={ this.aapbCatalogURL(this.state.guid) }>
          { titleBar }
          <div className="blue-circle"><div/></div>
        </a>
      )
    }

    return recordBlock
  }
}
