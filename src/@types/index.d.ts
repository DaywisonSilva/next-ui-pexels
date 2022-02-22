declare module '*.svg'
declare module '*.css'

type Photo = {
  // remove description, name and location
  description?: string
  name?: string
  location?: string
  /**/
  alt?: string
  avg_color?: string
  height?: number
  id?: number
  liked?: boolean
  photographer?: string
  photographer_id?: number
  photographer_url?: string
  src?: {
    landscape: string
    large: string
    large2x: string
    medium: string
    original: string
    portrait: string
    small: string
    tiny: string
  }
  url?: string
  width?: number
}
