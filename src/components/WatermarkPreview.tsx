import React from 'react'
import { IWatermark } from '../ts/type'

interface WatermarkPreviewProps {
  watermark: IWatermark
}

export default function WatermarkPreview(props: WatermarkPreviewProps) {

  const {
    watermark
  } = props

  const {
    text,
  } = watermark

  const canvas: HTMLCanvasElement = document.createElement('canvas')

  canvas.width = 400
  canvas.height = 200

  const ctx = canvas.getContext('2d')
  ctx!.fillStyle = '#fff'
  ctx!.font = '32px monospace'
  ctx!.fillText(text, 32, 32)

  const previewSrc = canvas.toDataURL('image/png', .92)

  return (
    <img
      alt="preview"
      className="max-w-full max-h-full"
      src={previewSrc}
    />
  )
}