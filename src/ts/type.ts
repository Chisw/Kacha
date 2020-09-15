export type WatermarkType = 'image' | 'text'
export type FormatType = 'origin' | 'jpeg' | 'png' | 'webp'
export type SizeChangeType = 'none' | 'pixel' | 'percent'
export type RepeatType = 'none' | 'x' | 'y' | 'cover'
export type PositionType = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'

export interface IExportSetting {
  format: FormatType
  quality: number
  scaleType: SizeChangeType
  scalePixel: number
  scalePercent: number
  saveEXIF: boolean
}

export interface IWatermark {
  id: string
  type: WatermarkType
  src: string
  text: string
  font?: string
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
  exportSetting?: IExportSetting
}
