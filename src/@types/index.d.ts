declare module '*.svg'

type Photo = {
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
