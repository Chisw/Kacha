import React from 'react'
import { Button } from 'carbon-components-react'
import { Reset16 } from '@carbon/icons-react'

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
      <Button size="small" renderIcon={Reset16} onClick={() => setActiveId('')}>重选</Button>
      <div className="py-4 text-white">
        {activeId}
      </div>
    </>
  )
}