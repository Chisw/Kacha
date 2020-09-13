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
  type: 'image' | 'text'
  src: string
  text: string
  font?: string
  position: 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'
  scaleType: 'none' | 'pixel' | 'percent'
  scalePixel: number
  scalePercent: number
  offsetType: 'none' | 'pixel' | 'percent'
  offsetPixelX: number
  offsetPixelY: number
  offsetPercentX: number
  offsetPercentY: number
  repeat: 'none' | 'x' | 'y' | 'cover'
  opacity: number
  rotate: number
  exportSetting?: IExportSetting
}
