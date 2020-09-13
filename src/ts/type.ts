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
  position: 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'
  width: number | string
  height: number | string
  ratioLock: boolean
  repeat: 'none' | 'x' | 'y' | 'cover'
  opacity: number
  rotate: number
  font?: string
  exportSetting?: IExportSetting
}
