import React, { useState } from 'react'
import { IWatermark } from '../ts/type'
import { FormGroup, ContentSwitcher, Switch, InlineLoading } from 'carbon-components-react'
import { BG_GRID_DATA_DARK, BG_GRID_DATA_LIGHT, PREVIEW_WIDTH_SM, PREVIEW_HEIGHT_SM } from '../ts/constant'
import { getImageBySrc, drawWatermark2Canvas } from '../ts/utils'
import { useAsync } from 'react-use'

interface PreviewProps {
  watermark: IWatermark
  resizable?: boolean
}

export default function Preview(props: PreviewProps) {

  const {
    watermark,
    resizable = false,
  } = props

  const [selectedIndex, setSelectedIndex] = useState(0)

  const previewState = useAsync(async () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')

    const width = resizable ? [300, 720, 1920][selectedIndex] : PREVIEW_WIDTH_SM
    const height = resizable ? [160, 1080, 1080][selectedIndex] : PREVIEW_HEIGHT_SM

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    const bgImg = await getImageBySrc(watermark.theme === 'dark' ? BG_GRID_DATA_LIGHT : BG_GRID_DATA_DARK)
    ctx!.fillStyle = ctx!.createPattern(bgImg, 'repeat') as CanvasPattern
    ctx!.fillRect(0, 0, width, height)

    await drawWatermark2Canvas(watermark, canvas)

    return canvas.toDataURL('image/png')
  }, [resizable, selectedIndex, watermark])

  if (resizable) {
    return (
      <>
        <FormGroup legendText="效果预览">
          <div className="shadow-lg">
            <ContentSwitcher selectedIndex={selectedIndex} onChange={() => { }}>
              <Switch text="300x160px" onClick={() => setSelectedIndex(0)} onKeyDown={() => { }} />
              <Switch text="720x1080px" onClick={() => setSelectedIndex(1)} onKeyDown={() => { }} />
              <Switch text="1920x1080px" onClick={() => setSelectedIndex(2)} onKeyDown={() => { }} />
            </ContentSwitcher>
            <div className="relative w-full h-96 flex justify-center items-center bg-black">
              <img
                alt="preview"
                className="max-w-full max-h-full"
                src={previewState.value}
              />
              {previewState.loading && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <InlineLoading />
                </div>
              )}
            </div>
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
    <div className="w-full h-full flex justify-center items-center bg-center bg-black">
      {previewState.loading ? (
        <InlineLoading />
      ) : (
        <img
          alt="preview"
          className="max-w-full max-h-full"
          src={previewState.value}
        />
      )}
    </div>
  )
}