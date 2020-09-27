import { IWatermark } from './type'
import { isString } from 'lodash'

export const isWatermark = (obj: any) => {
  return isString(obj.id)
    && isString(obj.title)
    && isString(obj.type)
    && isString(obj.theme)
}

export const getImageBySrc: (src: string) => Promise<CanvasImageSource> = async (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    // img.setAttribute('crossOrigin', 'Anonymous')
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = () => reject()
  })
}

export const getImageByWatermark: (w: IWatermark) => Promise<CanvasImageSource> = async (watermark) => {
  const {
    text,
    opacity,
    rotate,
  } = watermark

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 100
  canvas.height = 32
  const center = {
    x: 50,
    y: 16,
  }
  ctx!.globalAlpha = opacity / 100
  ctx!.translate(center.x, center.y)
  ctx!.rotate(rotate * Math.PI / 180)
  ctx!.translate(-center.x, -center.y)
  ctx!.fillStyle = '#f00'
  ctx!.textAlign = 'left'
  ctx!.fillStyle = '32px monospace'
  ctx!.fillText(text, 0, 32)

  const dataURL = canvas.toDataURL('image/png')

  return getImageBySrc(dataURL)
}

export const getShortId = (n?: number) => Array
  .from('*'.repeat(n || 6))
  .map(() => Math.random().toString(36)[2])
  .join('')

export const getTypeBase64Bytes = (typeBase64: string) => {
  if (!typeBase64) return 0
  let padding = 0
  if (typeBase64.endsWith('==')) {
    padding = 2
  } else if (typeBase64.endsWith('=')) {
    padding = 1
  }
  const bytes = (typeBase64.length / 4) * 3 - padding
  return bytes
}

export const getBytesSize = (bytes: number, unit?: 'B' | 'KB' | 'MB' | 'GB') => {
  if (!unit) {
    if (0 <= bytes && bytes < 1024) {
      unit = 'B'
    } else if (1024 <= bytes && bytes < 1048576) {
      unit = 'KB'
    } else if (1048576 <= bytes && bytes < 1073741824) {
      unit = 'MB'
    } else {
      unit = 'GB'
    }
  }
  const level = ['B', 'KB', 'MB', 'GB'].indexOf(unit)
  const divisor = [1, 1024, 1048576, 1073741824][level]
  const result = `${(bytes / divisor).toFixed(unit === 'B' ? 0 : 2)} ${unit}`
  return result
}