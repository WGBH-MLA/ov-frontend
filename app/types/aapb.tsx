import { Guid, PBCore } from './pbcore'

export type AAPBRecordProps = {
  guid: Guid
  showThumbnail: boolean
  showTitle: boolean
  embedPlayer: boolean
  startTime: string
  endTime: string
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

export interface AAPBRecordBlockProps extends AAPBRecordProps {
  guids: Guid[]
  specialCollections: string
}

export interface AAPBRecordBlockState {
  embedPlayer: boolean
  showThumbnail: boolean
  showTitle: boolean
  numRecords: number
}
