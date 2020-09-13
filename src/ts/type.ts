export declare const WatermarkPosition: {
  TOP_LEFT: 'top-left'
  TOP: 'top'
  TOP_RIGHT: 'top-right'
  LEFT: 'left'
  CENTER: 'center'
  RIGHT: 'right'
  BOTTOM_LEFT: 'bottom-left'
  BOTTOM: 'bottom'
  BOTTOM_RIGHT: 'bottom-right'
}

export declare type WatermarkPosition = typeof WatermarkPosition[keyof typeof WatermarkPosition]

export interface IExportSetting {
  format: 'origin' | 'jpeg' | 'png' | 'webp'
  quality: number
  scaleType: 'none' | 'pixel' | 'percent'
  scalePixel: number
  scalePercent: number
  saveEXIF: boolean
}

export interface IWatermark {
  id: string
  src: string
  type: 'image' | 'text'
  position: WatermarkPosition
  width: number | string
  height: number | string
  ratioLock: boolean
  repeat: 'none' | 'x' | 'y' | 'cover'
  opacity: number
  rotate: number
  font?: string
  exportSetting: IExportSetting
}
