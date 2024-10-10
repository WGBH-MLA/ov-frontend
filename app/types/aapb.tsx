import { Guid, PBCore } from './pbcore'

export type AAPBRecordProps = {
  guid: Guid
  showThumbnail: boolean
  showTitle: boolean
  embedPlayer: boolean
  guids: Guid[]
}

export type AAPBRecordState = {
  embedPlayer: boolean
  showThumbnail: boolean
  showTitle: boolean
  showEmbed: boolean
  guid: Guid
  pbcore: PBCore
  wide: boolean
}
