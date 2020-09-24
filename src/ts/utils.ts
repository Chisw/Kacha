import { IWatermark } from './type'


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