import { ColorValueHex } from '../types/ColorValueHex'

interface Book {
  id: number
  title: string
  author: string
  publisher: string
  year: number
  pages: number | null
  plot: string
  audience: string
  color: ColorValueHex
  stared?: boolean
}

export { Book }
