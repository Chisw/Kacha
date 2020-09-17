import React, { useState } from 'react'
import { IWatermark } from '../ts/type'
import { RadioButtonGroup, RadioButton, FormGroup } from 'carbon-components-react'

interface PreviewProps {
  watermark: IWatermark
  resizable?: boolean
}

type ISize = 'sm' | 'md' | 'lg'

export default function Preview(props: PreviewProps) {

  const {
    watermark,
    resizable = false,
  } = props

  const {
    theme,
    text,
  } = watermark

  const [size, setSize] = useState<ISize>('md')

  const canvas: HTMLCanvasElement = document.createElement('canvas')

  canvas.width = 400
  canvas.height = 200

  const ctx = canvas.getContext('2d')
  ctx!.fillStyle = '#f00'
  ctx!.font = '32px monospace'
  ctx!.fillText(text, 32, 32)

  const previewSrc = canvas.toDataURL('image/png', .92)

  if (resizable) {
    return (
      <>
        <FormGroup legendText="预览大小">
          <RadioButtonGroup
            name="preview-size"
            valueSelected={size}
            onChange={(value: ISize) => setSize(value)}
          >
            <RadioButton
              id="preview-size-sm"
              labelText="小尺寸 480x320"
              value="sm"
            />
            <RadioButton
              id="preview-size-md"
              labelText="中尺寸 1080x720"
              value="md"
            />
            <RadioButton
              id="preview-size-lg"
              labelText="大尺寸 1920x1080"
              value="lg"
            />
          </RadioButtonGroup>
        </FormGroup>
        <FormGroup legendText="预览">
          <div
            className={`w-full h-full flex justify-center items-center bg-center shadow-lg
          ${theme === 'dark' ? 'bg-grid-light' : 'bg-grid-dark'}`}
          >
            <img
              alt="preview"
              className="max-w-full max-h-full"
              src={previewSrc}
            />
          </div>
        </FormGroup>
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