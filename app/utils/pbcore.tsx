import xsl from '~/data/pbcore_xml_to_json'

import type { PBCore } from '~/types/pbcore'

export const pbcore2json = (pbcore: string): PBCore | undefined => {
  try {
    const xml = new DOMParser().parseFromString(pbcore, 'text/xml')
    var xsltProcessor = new XSLTProcessor()
    xsltProcessor.importStylesheet(
      new DOMParser().parseFromString(xsl, 'application/xml')
    )

    const resultDocument = xsltProcessor.transformToDocument(xml)
    const jsonString =
      resultDocument.getElementsByTagName('pre')[0].firstChild?.nodeValue

    const pb: PBCore = JSON.parse(jsonString)

    return pb
  } catch (e) {
    console.error(e)
    // throw e
  }
}
