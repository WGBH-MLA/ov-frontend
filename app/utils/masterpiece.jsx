// separate file so we dont include this in every loader
import { masterpieceData } from '../data/masterpieceData'

export async function getMasterpiece() {
  return {
    masterpieceData: masterpieceData,
    AAPB_HOST: process.env.AAPB_HOST,
  }
}
