// separate file so we dont include this in every loader
import { seriesData } from "./data/seriesData"

export async function getSeries() {
  return {
    seriesData: seriesData,
    AAPB_HOST: process.env.AAPB_HOST
  }
}
