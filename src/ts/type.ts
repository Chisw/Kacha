export declare const MarkPosition: {
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

export declare type MarkPosition = typeof MarkPosition[keyof typeof MarkPosition]

export interface IMark {
  type: 'image' | 'text'
  position: MarkPosition
  width: number | string
  height: number | string
  ratioLock: boolean
  repeat: 'none' | 'x' | 'y' | 'cover'
  opacity: number
  rotate: number
  font: {
    size: number
    family: string
  }
}

export interface ISetting {
  format: 'jpeg' | 'png' | 'webp'
  quality: number
  scaleType: 'none' | 'percent' | 'pixel'
  scaleValue: number
  saveEXIF: boolean
}
