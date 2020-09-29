export type WatermarkType = 'image' | 'text'
export type ThemeType = 'dark' | 'light'
export type FormatType = 'origin' | 'jpeg' | 'png' | 'webp'
export type SizeChangeType = 'none' | 'pixel' | 'percent'
export type ScaleBaseType = 'width' | 'height'
export type RepeatType = 'no-repeat' | 'repeat-x' | 'repeat-y' | 'repeat'
export type AlignType = 'flex-start' | 'center' | 'flex-end'
export type WeightType = 'normal' | 'bold'
export type StyleType = 'normal' | 'italic'
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
  version: number
  id: string
  title: string
  theme: ThemeType
  showOutline: boolean
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
  paddingType: SizeChangeType
  paddingPixelX: number
  paddingPixelY: number
  paddingPercentX: number
  paddingPercentY: number
  repeat: RepeatType
  opacity: number
  rotate: number
  fontSize: number
  fontColor: string
  fontFamily: string
  fontAlignX: AlignType
  fontAlignY: AlignType
  fontWeight: WeightType
  fontStyle: StyleType
  exportSetting: IExportSettingg
}

export interface IWatermarkMeta {
  watermark: IWatermark
  metaWidth: number
  metaHeight: number
}