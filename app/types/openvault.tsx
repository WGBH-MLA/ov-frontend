import { AAPBRecordProps } from './aapb'

export type Image = {
  url: string
  full_url: string
  width: number
  height: number
  alt: string
}

export type Author = {
  author_id: number
  name: string
  image: Image
  bio: string
}

export type Article = {
  title: string
  meta: { search_description?: string; slug?: string }
  cover_image: Image
  hero_image: Image
  cover_thumb: Image
  hero_thumb: Image
  authors: Author[]
}

export type AAPBRecordBlock = {
  type:
    | 'interviews'
    | 'archival_footage'
    | 'photographs'
    | 'programs'
    | 'credits'
    | 'text'
    | 'heading'
    | 'subheading'
    | 'html'
  value: AAPBRecordProps
  id: string
}

export type Footnote = {
  id: number
  uuid: string
  text: string
}

export type Exhibit = Article & {
  body: Object[]
  footnotes: Footnote[]
  authors: Object[]
}

export type Collection = Article & {
  introduction: string
  content: AAPBRecordBlock[]
}
