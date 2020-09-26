export type WatermarkType = 'image' | 'text'
export type ThemeType = 'dark' | 'light'
export type FormatType = 'origin' | 'jpeg' | 'png' | 'webp'
export type SizeChangeType = 'none' | 'pixel' | 'percent'
export type RepeatType = 'no-repeat' | 'repeat-x' | 'repeat-y' | 'repeat'
export type PositionType = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'

export interface IExportSettingg {
  format: FormatType
  quality: number
  scaleType: SizeChangeType
  scalePixel: number
  scalePercent: number
  saveEXIF: boolean
}

export interface IWatermark {
  id: string
  title: string
  type: WatermarkType
  theme: ThemeType
  src: string
  text: string
  position: PositionType
  scaleType: SizeChangeType
  scalePixel: number
  scalePercent: number
  offsetType: SizeChangeType
  offsetPixelX: number
  offsetPixelY: number
  offsetPercentX: number
  offsetPercentY: number
  repeat: RepeatType
  opacity: number
  rotate: number
  font?: string
  exportSetting?: IExportSettingg
}
