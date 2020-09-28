import { IWatermark, IWatermarkImageMeta } from './type'
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

export const getImageByDataURL: (dataURL: string) => Promise<CanvasImageSource> = async (dataURL) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = dataURL
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

export const drawImageMeta2Canvas = async (meta: IWatermarkImageMeta, canvas: HTMLCanvasElement, isPreview: boolean) => {
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas
  const { dataURL, width: imgWidth, height: imgHeight, opacity, rotate, showOutline } = meta

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
        <foreignObject
          width="${width}"
          height="${height}"
        >
          <body
            xmlns="http://www.w3.org/1999/xhtml"
            style="margin: 0; padding: 0;"
          >
            <div
              style="
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: ${width}px;
                height: ${height}px;
                font-size:0;
              "
            >
              <img
                src="${dataURL}"
                style="
                  display: block;
                  width: ${imgWidth}px;
                  height: ${imgHeight}px;
                  opacity: ${opacity/100};
                  transform-origin: center;
                  transform: rotate(${rotate}deg);
                "
              />
              ${(isPreview && showOutline) ? (`
                <div
                  style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    border: 1px dashed aqua;
                  "
                >
                </div>
              `) : ''}
            </div>
          </body>
        </foreignObject>
      </svg>`
  })
}

export const getWatermarkDataURL: (wm: IWatermark, w: number, h: number, is: boolean) => Promise<string> = async (watermark, outerWidth, outerHeight, isPreview) => {
  const {
    type,
    showOutline,
    text,
    dataURL,
    width: wmWidth,
    height: wmHeight,
    scaleType,
    scaleBase,
    scalePixel,
    scalePercent,
    offsetType,
    offsetPixelX,
    offsetPixelY,
    offsetPercentX,
    offsetPercentY,
    opacity,
    rotate,
  } = watermark

  let width = 200
  let height = 32
  if (type === 'image') {
    if (scaleType === 'pixel') {
      if (scaleBase === 'width') {
        width = scalePixel
        height = wmHeight * (width / wmWidth)
      } else {
        height = scalePixel
        width = wmWidth * (height / wmHeight)
      }
    } else if (scaleType === 'percent') {
      const ratio = scalePercent / 100
      if (scaleBase === 'width') {
        width = outerWidth * ratio
        height = wmHeight * (width / wmWidth)
      } else {
        height = outerHeight * ratio
        width = wmWidth * (height / wmHeight)
      }
    } else {
      width = wmWidth || PREVIEW_WIDTH_SM
      height = wmHeight || PREVIEW_HEIGHT_SM
    }
  }

  let offsetX = 0
  let offsetY = 0
  if (offsetType === 'pixel') {
    offsetX = offsetPixelX
    offsetY = offsetPixelY
  } else if (offsetType === 'percent') {
    offsetX = outerWidth * (offsetPercentX / 100)
    offsetY = outerHeight * (offsetPercentY / 100)
  }

  const canvasWidth = width + offsetX * 2
  const canvasHeight = height + offsetY * 2

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  if (type === 'image') {
    if (dataURL) {
      await drawImageMeta2Canvas({ dataURL, width, height, opacity, rotate, showOutline }, canvas, isPreview)
    }
  } else if (type === 'text') {
    ctx!.fillStyle = '#f00'
    ctx!.textAlign = 'left'
    ctx!.fillStyle = '32px monospace'
    ctx!.fillText(text, 0, 32)
  }
  
  return canvas.toDataURL('image/png')
}

export const drawWatermark2Canvas = async (watermark: IWatermark, canvas: HTMLCanvasElement, isPreview: boolean) => {

  const ctx = canvas.getContext('2d')
  const { width, height } = canvas

  const dataURL = await getWatermarkDataURL(watermark, width, height, isPreview)
  const { position, repeat } = watermark
  const [x, y] = position.split('-')

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
        <foreignObject
          width="${width}"
          height="${height}"
        >
          <body
            xmlns="http://www.w3.org/1999/xhtml"
            style="margin: 0; padding: 0;"
          >
            <div
              style="
                width: ${width}px;
                height: ${height}px;
                background-image: url(${dataURL});
                background-position-x: ${x};
                background-position-y: ${y};
                background-repeat: ${repeat};
              "
            ></div>
          </body>
        </foreignObject>
      </svg>`
  })
}
