import { Component } from 'react'

export function handleAapbRecordGroup(aapbRecordGroup, key) {
  // this func is where we split by whitespace v
  var guids = parseAapbRecordGroup(aapbRecordGroup.value.guids)

  // preserve these flags' effect for each aapb_record_group
  var showThumbnail = aapbRecordGroup.value.show_thumbnail
  var showTitle = aapbRecordGroup.value.show_title

  return (
    <AAPBRecords
      guids={guids}
      startTime={aapbRecordGroup.value.start_time}
      endTime={aapbRecordGroup.value.end_time}
      showThumbnail={showThumbnail}
      showTitle={showTitle}
      embedPlayer={true}
      specialCollections={aapbRecordGroup.value.special_collections ? aapbRecordGroup.value.special_collections : null  }
    />
  )
}

export function parseAapbRecordGroup(string) {
  return string.split(/\s+/)
}

async function retrieveAapbRecord(guid) {
  return await fetch(window.ENV.AAPB_HOST + '/api/' + guid + '.json')
    .then(response => response.json())
    .catch(e => console.log(`Error retrieving record from AAPB: ${e}`))
}

export class AAPBRecord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      embedPlayer: true,
      showThumbnail: props.showThumbnail,
      showTitle: props.showTitle,
    }
  }

  async componentDidMount() {
    var hyphenGuid = this.props.guid.replace(/cpb-aacip./, 'cpb-aacip-')
    var record = await retrieveAapbRecord(hyphenGuid)
    console.log( 'duh!@!!!!', record )

    // TODO: add essencetracks to aapb api
    let isWide = false
    // if(record){
    //   let inst = record.pbcoreDescriptionDocument.pbcoreInstantiation.find( (i) => i.instantiationGenerations.text == "Proxy" )
    //   if(inst){
    //     let et = inst.essenceTrack.find( (et) => et.essenceTrackAspectRatio)
    //     isWide = et.essenceTrackAspectRatio == "16:9"
    //   }
    // }
    this.setState({ guid: hyphenGuid, pbcore: record, wide: isWide })
  }

  mediaType(pbcore){
    if(pbcore.pbcoreDescriptionDocument && pbcore.pbcoreDescriptionDocument.pbcoreInstantiation && pbcore.pbcoreDescriptionDocument.pbcoreInstantiation.length > 0){
      
      if(pbcore.pbcoreDescriptionDocument.pbcoreInstantiation.some((instantiation) => instantiation.instantiationMediaType == "Moving Image")){
        return "Moving Image"
      } else if(pbcore.pbcoreDescriptionDocument.pbcoreInstantiation.some((instantiation) => instantiation.instantiationMediaType == "Sound")) {
        return "Sound"
      }
    } 
  }

  aapbThumbnailURL(guid) {
    const S3_BASE = 'https://s3.amazonaws.com/americanarchive.org'
    return `${S3_BASE}/thumbnail/${guid}.jpg`
  }

  aapbCatalogURL(guid) {
    return `${window.ENV.AAPB_HOST}/catalog/${guid}`
  }

  aapbTitle(pbcore) {
    if (pbcore?.pbcoreDescriptionDocument?.pbcoreTitle?.text) {
      // there is one title
      return pbcore.pbcoreDescriptionDocument.pbcoreTitle.text
    } else if (pbcore?.pbcoreDescriptionDocument?.pbcoreTitle?.length > 0) {
      // there are multiple titles
      return pbcore.pbcoreDescriptionDocument.pbcoreTitle
        .map(titleObj => {
          return titleObj.text
        })
        .join('; ')
    } else {
      return 'Untitled Record'
    }
  }

  embed(guid, startTime, endTime, wide) {
    var times
    if (startTime || endTime) {
      times = `?start=${startTime}&end=${endTime}`
    }
    var url = `${this.state.aapb_host}/openvault/${guid}${times || ''}`
    var classes = wide ? "aapb-record-video-wide" : "aapb-record-video"
    return (
      <a className="content-aapbblock">
        <iframe
          className={ classes }
          src={url}
          frameBorder="0"
          allowFullScreen={true}
        />
      </a>
    )
  }

  render() {
    let recordBlock
    if (this.state.pbcore) {

      let titleBar
      if (this.props.showTitle) {
        titleBar = (
          <div className="shade-bar">
            <div>{this.aapbTitle(this.state.pbcore)}</div>
          </div>
        )
      }

      let thumbnail
      if (this.props.showThumbnail) {
        if( this.mediaType(this.state.pbcore) == "Moving Image" ){
          // check here for digitized? if not show VIDEO THUMB
          var ci_pbi = this.state.pbcore.pbcoreDescriptionDocument.pbcoreIdentifier.find((pbi) => pbi.source == "Sony Ci")
          if(ci_pbi && ci_pbi.text){

            thumbnail = {
              backgroundImage: `url(${this.aapbThumbnailURL(this.state.guid)})`,
            }            
          } else {
            // video THUMB
            thumbnail = {
              backgroundImage: `url(/VIDEO_SMALL.png)`,
            }
          }

        } else {
          // AUDIO THUMB
          thumbnail = {
            backgroundImage: `url(/AUDIO_SMALL.png)`,
          }
        }

      }

      if (this.state.showEmbed) {
        recordBlock = this.embed(
          this.state.guid,
          this.props.startTime,
          this.props.endTime,
          this.state.wide
        )
      } else {
        if (this.props.embedPlayer) {
          recordBlock = (
            <a
              style={thumbnail}
              className="content-aapbblock"
              onClick={() => this.setState({ showEmbed: true })}
            >
              {titleBar}
              <div className="blue-circle">
                <div />
              </div>
            </a>
          )
        } else {
          // fake video player
          recordBlock = (
            <a
              style={thumbnail}
              className="content-aapbblock"
              href={this.aapbCatalogURL(this.state.guid)}
            >
              {titleBar}
              <div className="blue-circle">
                <div />
              </div>
            </a>
          )
        }
      }
    }

    return recordBlock
  }
}

export class AAPBRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      embedPlayer: props.embedPlayer,
      showThumbnail: props.showThumbnail,
      showTitle: props.showTitle,
      numRecords: props.guids.length
    }
  }

  async componentDidMount(){
    this.setState({aapb_host: window.ENV.AAPB_HOST}, async () => {

      if(this.props.specialCollections){
        // fetch actual number of records from this special collection search
        var data = await fetch(
          // this endpoint takes a bare solr query within each filter option (q, fq, etc.), NOT BLACKLIGHT URL PARAMS
        `${this.state.aapb_host}/api.json?fq=special_collections:${this.props.specialCollections} AND access_types:online&sort=title+asc&rows=0`
        )
        .then(response => response.json())
        .catch(error => console.error(error))
        if(data){
          this.setState({numRecords: parseInt(data["response"]["numFound"]) })
        }
      }
    })
    
  }

  render() {
    var aapbRecords = this.props.guids.slice(0, 2).map((guid, index) => {
      return (
        <AAPBRecord
          key={index}
          guid={guid}
          embedPlayer={this.state.embedPlayer}
          showThumbnail={this.state.showThumbnail}
          showTitle={this.state.showTitle}
          startTime={this.props.startTime}
          endTime={this.props.endTime}
          specialCollections={this.props.specialCollections}
        />
      )
    })

    var recordsSearchLink = `${this.state.aapb_host}/catalog`
    if(this.props.specialCollections){
      recordsSearchLink += `?f[special_collections][]=${this.props.specialCollections}&sort=title+asc&f[access_types][]=online`
    }
    return (
      <div className="aapb-records">
        {aapbRecords}
        <a className="aapb-records-seemore" href={recordsSearchLink}>
          View all {this.state.numRecords} on AAPB &gt;
        </a>
      </div>
    )
  }
}
