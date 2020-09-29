import { IWatermark, IWatermarkMeta } from './type'
import { isString, isNumber } from 'lodash'
import { PREVIEW_WIDTH_SM, PREVIEW_HEIGHT_SM } from './constant'

export const getShortId = (n?: number) => Array
  .from('*'.repeat(n || 6))
  .map(() => Math.random().toString(36)[2])
  .join('')

export const copy = (str: string) => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.value = str
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
}

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

export const HEX2RGB = (hex: string) => {
  let color = hex.toLowerCase()
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (color && reg.test(color)) {
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    const colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return `rgb(${colorChange.join(',')})`
  }
  return color
}

export const RGB2HEX = (rgb: string) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (/^(rgb|RGB)/.test(rgb)) {
    const aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    let strHex = '#'
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16)
      if (hex.length < 2) {
        hex = '0' + hex
      }
      strHex += hex
    }
    if (strHex.length !== 7) {
      strHex = rgb
    }
    return strHex
  } else if (reg.test(rgb)) {
    const aNum = rgb.replace(/#/, "").split("")
    if (aNum.length === 6) {
      return rgb
    } else if (aNum.length === 3) {
      let numHex = '#'
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i])
      }
      return numHex
    }
  }
  return rgb
}

export const isWatermark = (obj: any) => {
  return  isNumber(obj.version)
    && isString(obj.id)
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

export const drawMeta2Canvas = async (meta: IWatermarkMeta, canvas: HTMLCanvasElement, isPreview: boolean) => {
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas
  const {
    watermark: {
      showOutline,
      type,
      opacity,
      rotate,
      dataURL,
      text,
      fontSize,
      fontColor,
      fontFamily,
      fontAlignX,
      fontAlignY,
      fontWeight,
      fontStyle,
    },
    metaWidth,
    metaHeight,
  } = meta

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
              "
            >
              ${type === 'image' ? `
                <img
                  src="${dataURL}"
                  style="
                    display: block;
                    width: ${metaWidth}px;
                    height: ${metaHeight}px;
                    opacity: ${opacity / 100};
                    transform-origin: center;
                    transform: rotate(${rotate}deg);
                  "
                />
              ` : `
                <div
                  style="
                    display: flex;
                    justify-content: ${fontAlignX};
                    align-items: ${fontAlignY};
                    font-size: ${fontSize}px;
                    color: ${HEX2RGB(fontColor)};
                    font-family: ${fontFamily};
                    font-weight: ${fontWeight};
                    font-style: ${fontStyle};
                    width: ${metaWidth}px;
                    height: ${metaHeight}px;
                    opacity: ${opacity / 100};
                    transform-origin: center;
                    transform: rotate(${rotate}deg);
                  "
                >
                  ${text}
                </div>
              `}

              ${(isPreview && showOutline) ? `
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
              ` : ''}
            </div>
          </body>
        </foreignObject>
      </svg>`
  })
}

export const getWatermarkDataURL: (wm: IWatermark, w: number, h: number, is: boolean) => Promise<string> = async (watermark, outerWidth, outerHeight, isPreview) => {
  const {
    width,
    height,
    scaleType,
    scaleBase,
    scalePixel,
    scalePercent,
    paddingType,
    paddingPixelX,
    paddingPixelY,
    paddingPercentX,
    paddingPercentY,
  } = watermark

  let metaWidth = 0
  let metaHeight = 0
  if (scaleType === 'pixel') {
    if (scaleBase === 'width') {
      metaWidth = scalePixel
      metaHeight = height * (metaWidth / width)
    } else {
      metaHeight = scalePixel
      metaWidth = width * (metaHeight / height)
    }
  } else if (scaleType === 'percent') {
    const ratio = scalePercent / 100
    if (scaleBase === 'width') {
      metaWidth = outerWidth * ratio
      metaHeight = height * (metaWidth / width)
    } else {
      metaHeight = outerHeight * ratio
      metaWidth = width * (metaHeight / height)
    }
  } else {
    metaWidth = width || PREVIEW_WIDTH_SM
    metaHeight = height || PREVIEW_HEIGHT_SM
  }

  let paddingX = 0
  let paddingY = 0
  if (paddingType === 'pixel') {
    paddingX = paddingPixelX
    paddingY = paddingPixelY
  } else if (paddingType === 'percent') {
    paddingX = outerWidth * (paddingPercentX / 100)
    paddingY = outerHeight * (paddingPercentY / 100)
  }

  const canvasWidth = metaWidth + paddingX * 2
  const canvasHeight = metaHeight + paddingY * 2

  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  const meta = {
    watermark,
    metaWidth,
    metaHeight,
  }
  await drawMeta2Canvas(meta, canvas, isPreview)
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
