import { Component } from 'react'
import {
  AAPBRecordProps,
  AAPBRecordState,
  AAPBRecordBlockProps,
  AAPBRecordBlockState,
} from '~/types/aapb'
import { Guid, PBCore, PBCoreInstantiation, PBCoreTitle } from '~/types/pbcore'

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
      specialCollections={
        aapbRecordGroup.value.special_collections
          ? aapbRecordGroup.value.special_collections
          : null
      }
    />
  )
}

export function parseAapbRecordGroup(string: string) {
  return string.split(/\s+/)
}

export const normalizeGuid = (guid: Guid) =>
  guid.replace(/^cpb-aacip./, 'cpb-aacip-')

async function retrieveAapbRecord(guid: Guid) {
  try {
    var resp = await fetch(window.ENV.AAPB_HOST + '/api/' + guid + '.json')
    if (resp.status == 200) {
      return await resp.json()
    } else {
      return false
    }
  } catch (error) {
    console.error(`Error retrieving record from AAPB: ${error}`)
    return false
  }
}

export class AAPBRecord extends Component<AAPBRecordProps> {
  constructor(props: AAPBRecordProps) {
    super(props)
    this.state = {
      embedPlayer: true,
      showThumbnail: props.showThumbnail,
      showTitle: props.showTitle,
    } as AAPBRecordState
  }

  async componentDidMount() {
    var hyphenGuid: Guid = normalizeGuid(this.props.guid)
    var record = await retrieveAapbRecord(hyphenGuid)

    let isWide = false
    if (record?.pbcoreDescriptionDocument?.pbcoreInstantiation) {
      let inst = record.pbcoreDescriptionDocument.pbcoreInstantiation
      if (!(inst instanceof Array)) {
        inst = [inst]
      }
      // Find all proxies
      let proxies = inst.find(i => i.instantiationGenerations == 'Proxy')
      if (proxies) {
        // proxytome proxytome proxytome proxytome
        if (!(proxies instanceof Array)) {
          proxies = [proxies]
        }
        // Get the aspect ratio of the essence tracks
        let ets = proxies.map(proxy =>
          proxy.instantiationEssenceTrack.map(
            track => track.essenceTrackAspectRatio
          )
        )
        for (let aspect of ets) {
          // A-S-P-E-C-T
          // Find out if it's 4:3
          if (aspect.includes('16:9') || aspect.includes('1.778')) {
            // Just a little bit!
            isWide = true
            break
          }
        }
      }
      this.setState({ guid: hyphenGuid, pbcore: record, wide: isWide })
    }
  }

  mediaType(pbcore: PBCore) {
    let inst: PBCoreInstantiation | PBCoreInstantiation[] =
      pbcore.pbcoreDescriptionDocument?.pbcoreInstantiation
    if (!inst) {
      return
    }
    if (!(inst instanceof Array)) {
      inst = [inst]
    }
    if (
      inst.some(
        (i: PBCoreInstantiation) => i.instantiationMediaType == 'Moving Image'
      )
    ) {
      return 'Moving Image'
    }
    if (
      inst.some((i: PBCoreInstantiation) => i.instantiationMediaType == 'Sound')
    ) {
      return 'Sound'
    }
  }

  aapbThumbnailURL(guid: Guid) {
    const S3_BASE = 'https://s3.amazonaws.com/americanarchive.org'
    return `${S3_BASE}/thumbnail/${guid}.jpg`
  }

  aapbCatalogURL(guid: Guid) {
    return `${window.ENV.AAPB_HOST}/catalog/${guid}`
  }

  aapbTitle(pbcore: PBCore) {
    let pbt = pbcore?.pbcoreDescriptionDocument?.pbcoreTitle
    if (pbt && !Array.isArray(pbt)) {
      // there is one title
      return pbt.text
    }
    if (pbt?.length > 0) {
      // there are multiple titles
      return pbt.map((title: PBCoreTitle) => title.text).join('; ')
    } else {
      return 'Untitled Record'
    }
  }

  embed(guid: Guid, startTime: string, endTime: string, wide: boolean) {
    var times
    if (startTime || endTime) {
      times = `?start=${startTime}&end=${endTime}`
    }
    var url = `${window.ENV.AAPB_HOST}/openvault/${guid}${times || ''}`

    var iframeClasses = 'aapb-record-video'
    var containerClasses = 'content-aapbblock'
    if (wide) {
      iframeClasses += ' wide'
      containerClasses += ' wide'
    }
    return (
      <a className={containerClasses}>
        <iframe
          className={iframeClasses}
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
      // console.log('rendering aapb record', this.state.pbcore)
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
        if (this.mediaType(this.state.pbcore) == 'Moving Image') {
          // check here for digitized? if not show VIDEO THUMB
          var ci_pbi =
            this.state.pbcore.pbcoreDescriptionDocument.pbcoreIdentifier.find(
              pbi => pbi.source == 'Sony Ci'
            )
          if (ci_pbi && ci_pbi.text) {
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

export class AAPBRecords extends Component<AAPBRecordBlockProps> {
  constructor(props: AAPBRecordBlockProps) {
    super(props)
    this.state = {
      embedPlayer: props.embedPlayer,
      showThumbnail: props.showThumbnail,
      showTitle: props.showTitle,
      numRecords: props.guids.length,
    } as AAPBRecordBlockState
  }

  async componentDidMount() {
    this.setState({ aapb_host: window.ENV.AAPB_HOST }, async () => {
      if (this.props.specialCollections) {
        // fetch actual number of records from this special collection search
        var data = await fetch(
          // this endpoint takes a bare solr query within each filter option (q, fq, etc.), NOT BLACKLIGHT URL PARAMS
          `${window.ENV.AAPB_HOST}/api.json?fq=special_collections:${this.props.specialCollections} AND access_types:online&sort=title+asc&rows=0`
        )
          .then(response => response.json())
          .catch(error => console.error(error))
        if (data) {
          this.setState({ numRecords: parseInt(data['response']['numFound']) })
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
    if (this.props.specialCollections) {
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
