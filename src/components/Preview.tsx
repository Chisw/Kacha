import React, { useState, useMemo } from 'react'
import { IWatermark } from '../ts/type'
import { FormGroup, ContentSwitcher, Switch } from 'carbon-components-react'
import { BG_GRID_DATA_DARK, BG_GRID_DATA_LIGHT } from '../ts/constant'

interface PreviewProps {
  watermark: IWatermark
  resizable?: boolean
}

export default function Preview(props: PreviewProps) {

  const {
    watermark,
    resizable = false,
  } = props

  const {
    theme,
    text,
  } = watermark

  const [selectedIndex, setSelectedIndex] = useState(0)

  const previewSrc = useMemo(() => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')

    const width = resizable ? [480, 1080, 1920][selectedIndex] : 400
    const height = resizable ? [320, 720, 1280][selectedIndex] : 200

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    if (resizable) {
      const img = new Image()
      img.src = theme === 'dark' ? BG_GRID_DATA_LIGHT : BG_GRID_DATA_DARK
      ctx!.fillStyle = ctx!.createPattern(img, 'repeat') as CanvasPattern
      ctx!.fillRect(0, 0, width, height)
    }

    ctx!.fillStyle = '#f00'
    ctx!.textAlign = 'left'
    ctx!.font = '32px monospace'
    ctx!.fillText(text, 0, 32)

    const previewSrc = canvas.toDataURL('image/png')
    return previewSrc
  }, [resizable, selectedIndex, theme, text])

  if (resizable) {
    return (
      <>
        <FormGroup legendText="效果预览">
          <div className="shadow-lg">
            <div className="w-full">
              <img
                alt="preview"
                className="max-w-full max-h-full"
                src={previewSrc}
              />
            </div>
            <ContentSwitcher selectedIndex={selectedIndex} onChange={() => { }}>
              <Switch text="480x320px" onClick={() => setSelectedIndex(0)} onKeyDown={() => { }} />
              <Switch text="1080x720px" onClick={() => setSelectedIndex(1)} onKeyDown={() => { }} />
              <Switch text="1920x1280px" onClick={() => setSelectedIndex(2)} onKeyDown={() => { }} />
            </ContentSwitcher>
          </div>
        </FormGroup>
        <style>
          {`
            .bx--content-switcher button {
              border-radius: 0 !important;
            }
          `}
        </style>
      </>
    )
  }

  return (
    <div
      className={`w-full h-full flex justify-center items-center bg-center
        ${theme === 'dark' ? 'bg-grid-light' : 'bg-grid-dark' }`}
    >
      <img
        alt="preview"
        className="max-w-full max-h-full"
        src={previewSrc}
      />
    </div>
  )
}