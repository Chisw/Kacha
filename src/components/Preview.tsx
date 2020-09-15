import React from 'react'
import { IWatermark } from '../ts/type'

interface PreviewProps {
  watermark: IWatermark
}

export default function Preview(props: PreviewProps) {

  const {
    watermark
  } = props

  const {
    theme,
    text,
  } = watermark

  const canvas: HTMLCanvasElement = document.createElement('canvas')

  canvas.width = 400
  canvas.height = 200

  const ctx = canvas.getContext('2d')
  ctx!.fillStyle = '#f00'
  ctx!.font = '32px monospace'
  ctx!.fillText(text, 32, 32)

  const previewSrc = canvas.toDataURL('image/png', .92)

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