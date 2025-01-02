import { Guid, PBCore } from './pbcore'

export type AAPBRecordProps = {
  guid: Guid
  showThumbnail: boolean
  showTitle: boolean
  startTime: string
  endTime: string
  accessLevel: string
}

export type AAPBRecordState = {
  showTitle: boolean
  showEmbed: boolean
  finishedRetrieval: boolean
  guid: Guid
  pbcore: PBCore
  wide: boolean
}

export interface AAPBRecordBlockProps extends AAPBRecordProps {
  guids: Guid[]
  showThumbnail: boolean
  specialCollections: string
}

export interface AAPBRecordBlockState {
  showTitle: boolean
  numRecords: number
}
