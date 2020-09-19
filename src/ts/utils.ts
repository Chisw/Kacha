import { IWatermark } from './type'

export const getPatternDataURL = (watermark: IWatermark) => {
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
    y: 16
  }
  ctx!.globalAlpha = opacity / 100
  ctx!.translate(center.x, center.y)
  ctx!.rotate(rotate * Math.PI / 180)
  ctx!.translate(-center.x, -center.y)
  ctx!.fillStyle = '#f00'
  ctx!.textAlign = 'left'
  ctx!.fillStyle = '32px monospace'
  ctx!.fillText(text, 0, 32)

  return canvas.toDataURL('image/png')
}