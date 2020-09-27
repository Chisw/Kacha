export type WatermarkType = 'image' | 'text'
export type ThemeType = 'dark' | 'light'
export type FormatType = 'origin' | 'jpeg' | 'png' | 'webp'
export type SizeChangeType = 'none' | 'pixel' | 'percent'
export type RepeatType = 'no-repeat' | 'repeat-x' | 'repeat-y' | 'repeat'
export type PositionType =
  'left-top' | 'center-top' | 'right-top' |
  'center-left' | 'center-center' | 'center-right' |
  'left-bottom' | 'center-bottom' | 'right-bottom'

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
  dataURL: string
  text: string
  width: number
  height: number
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
