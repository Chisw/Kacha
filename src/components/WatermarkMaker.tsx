import React from 'react'
import { Button } from 'carbon-components-react'
import { Reset16 } from '@carbon/icons-react'
import { IWatermark } from '../ts/type'
import Preview from './Preview'

interface WatermarkMakerProps {
  activeWatermark: IWatermark
  setActiveWatermark: (watermark: IWatermark | null) => void
}

export default function WatermarkMaker(props: WatermarkMakerProps) {

  const {
    activeWatermark,
    setActiveWatermark,
  } = props

  return (
    <>
      <Button size="small" renderIcon={Reset16} onClick={() => setActiveWatermark(null)}>重选</Button>
      <div className="py-4">
        <div className="w-64">
          <Preview watermark={activeWatermark} />
        </div>
      </div>
    </>
  )
}