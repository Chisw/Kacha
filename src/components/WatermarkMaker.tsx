import React from 'react'
import { Button } from 'carbon-components-react'

interface WatermarkMakerProps {
  activeId: string
  setActiveId: (id: string) => void
}

export default function WatermarkMaker(props: WatermarkMakerProps) {

  const {
    activeId,
    setActiveId,
  } = props

  return (
    <>
      <div className="py-4 text-white">
        {activeId}
      </div>
      <Button size="small" onClick={() => setActiveId('')}>重新选择水印</Button>
    </>
  )
}