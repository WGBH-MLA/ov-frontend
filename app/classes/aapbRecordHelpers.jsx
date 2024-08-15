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
    this.setState({ guid: hyphenGuid, pbcore: record })
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

  embed(guid, startTime, endTime) {
    var times
    if (startTime || endTime) {
      times = `?start=${startTime}&end=${endTime}`
    }
    var url = `${window.ENV.AAPB_HOST}/openvault/${guid}${times || ''}`
    return (
      <a className="content-aapbblock">
        <iframe
          className="aapb-record-video"
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
        thumbnail = {
          backgroundImage: `url(${this.aapbThumbnailURL(this.state.guid)})`,
        }
      }

      if (this.state.showEmbed) {
        recordBlock = this.embed(
          this.state.guid,
          this.props.startTime,
          this.props.endTime
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
    }
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
        />
      )
    })

    // TODO: how are we representing this set of records via a blacklight query/url on aapb?
    var recordsSearchLink = 'https://americanarchive.org'

    return (
      <div className="aapb-records">
        {aapbRecords}
        <a className="aapb-records-seemore" href={recordsSearchLink}>
          View all {this.props.guids.length} on AAPB &gt;
        </a>
      </div>
    )
  }
}
