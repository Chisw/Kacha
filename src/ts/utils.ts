import { IWatermark } from './type'
import { isString } from 'lodash'
import { PREVIEW_WIDTH_SM, PREVIEW_HEIGHT_SM } from './constant'

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

export const isWatermark = (obj: any) => {
  return isString(obj.id)
    && isString(obj.title)
    && isString(obj.type)
    && isString(obj.theme)
}

export const getImageBySrc: (src: string) => Promise<CanvasImageSource> = async (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

export const drawDataURL2Canvas = async (dataURL: string, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas
  return new Promise((resolve, reject) => {
    const svgImg = new Image()
    svgImg.width = width
    svgImg.height = height
    svgImg.onload = () => {
      ctx!.drawImage(svgImg, 0, 0, width, height)
      resolve()
    }
    svgImg.onerror = reject
    svgImg.src = `data:image/svg+xml;charset=utf-8,
      <svg xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="${width}" height="${height}">
          <body xmlns="http://www.w3.org/1999/xhtml" style="margin:0; padding:0;" >
            <div style="width:${width}px; height:${height}px; font-size:0; display:flex; justify-content:center; align-items:center;">
              <img src="${dataURL}" style="display:block; max-width:100%; max-height:100%;" />
            </div>
          </body>
        </foreignObject>
      </svg>`
  })
}

export const getWatermarkDataURL: (wm: IWatermark) => Promise<string> = async (watermark) => {
  const {
    type,
    text,
    src,
    width: wmWidth,
    height: wmHeight,
    scaleType,
    scalePixel,
    scalePercent,
    opacity,
    rotate,
  } = watermark

  let width = 200
  let height = 32
  if (type === 'image') {
    if (scaleType === 'pixel') {
      width = scalePixel
      height = wmHeight * (width / wmWidth)
    } else if (scaleType === 'percent') {
      width = wmWidth * (scalePercent / 100)
      height = wmHeight * (width / wmWidth)
    } else {
      width = wmWidth || PREVIEW_WIDTH_SM
      height = wmHeight || PREVIEW_HEIGHT_SM
    }
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  const center = {
    x: width / 2,
    y: height / 2,
  }
  ctx!.globalAlpha = opacity / 100
  ctx!.translate(center.x, center.y)
  ctx!.rotate(rotate * Math.PI / 180)
  ctx!.translate(-center.x, -center.y)

  if (type === 'image') {
    if (src) {
      await drawDataURL2Canvas(src, canvas)
    }
  } else if (type === 'text') {
    ctx!.fillStyle = '#f00'
    ctx!.textAlign = 'left'
    ctx!.fillStyle = '32px monospace'
    ctx!.fillText(text, 0, 32)
  }
  
  return canvas.toDataURL('image/png')
}

export const drawWatermark2Canvas = async (watermark: IWatermark, canvas: HTMLCanvasElement) => {

  const dataURL = await getWatermarkDataURL(watermark)
  const { position, repeat } = watermark
  const [x, y] = position.split('-')

  const ctx = canvas.getContext('2d')
  const { width, height } = canvas

  return new Promise((resolve, reject) => {
    const svgImg = new Image()
    svgImg.width = width
    svgImg.height = height
    svgImg.onload = () => {
      ctx!.drawImage(svgImg, 0, 0, width, height)
      resolve()
    }
    svgImg.onerror = reject
    svgImg.src = `data:image/svg+xml;charset=utf-8,
      <svg xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="${width}" height="${height}">
          <body xmlns="http://www.w3.org/1999/xhtml" style="margin:0; padding:0;" >
            <div
              style="
                width:${width}px;
                height:${height}px;
                background-image:url(${dataURL});
                background-position-x:${x};
                background-position-y:${y};
                background-repeat:${repeat};
              "
            ></div>
          </body>
        </foreignObject>
      </svg>`
  })
}
