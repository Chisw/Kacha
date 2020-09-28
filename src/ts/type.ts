export type WatermarkType = 'image' | 'text'
export type ThemeType = 'dark' | 'light'
export type FormatType = 'origin' | 'jpeg' | 'png' | 'webp'
export type SizeChangeType = 'none' | 'pixel' | 'percent'
export type ScaleBaseType = 'width' | 'height'
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
  theme: ThemeType
  type: WatermarkType
  dataURL: string
  text: string
  width: number
  height: number
  scaleType: SizeChangeType
  scaleBase: ScaleBaseType
  scalePixel: number
  scalePercent: number
  position: PositionType
  offsetType: SizeChangeType
  offsetPixelX: number
  offsetPixelY: number
  offsetPercentX: number
  offsetPercentY: number
  repeat: RepeatType
  opacity: number
  rotate: number
  fontSize: number
  fontFamily: string
  textColor: string
  exportSetting?: IExportSettingg
}
