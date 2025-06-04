import { Guid, PBCore } from './pbcore'

export type AAPBRecordProps = {
  guid: Guid
  title?: string
  showTitle: boolean
  showThumbnail: boolean
  showSidebar: boolean
  startTime?: string
  endTime?: string
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
  specialCollections: string
}

export interface AAPBRecordBlockState {
  showTitle: boolean
  numRecords: number
}
