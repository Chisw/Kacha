import React from 'react'
import { Button } from 'carbon-components-react'
import { PositionType } from '../../ts/type'
import {
  ArrowUpLeft16,
  ArrowUp16,
  ArrowUpRight16,
  ArrowLeft16,
  CenterSquare16,
  ArrowRight16,
  ArrowDownLeft16,
  ArrowDown16,
  ArrowDownRight16,
  CarbonIconType,
} from '@carbon/icons-react'

const positionMap: { [KEY: string]: CarbonIconType } = {
  'left-top': ArrowUpLeft16, 'center-top': ArrowUp16, 'right-top': ArrowUpRight16,
  'left-center': ArrowLeft16, 'center-center': CenterSquare16, 'right-center': ArrowRight16,
  'left-bottom': ArrowDownLeft16, 'center-bottom': ArrowDown16, 'right-bottom': ArrowDownRight16,
}

export interface PositionSelectorProps {
  selected: PositionType
  onSelect: (selected: PositionType) => void
}

export default function PositionSelector(props: PositionSelectorProps) {
  const {
    selected,
    onSelect,
  } = props

  return (
    <>
      <div className="w-24">
        {Object.entries(positionMap).map(([position, icon]) => (
          <Button
            key={position}
            hasIconOnly
            iconDescription=" "
            renderIcon={icon}
            size="small"
            kind={position === selected ? 'primary' : 'secondary'}
            onClick={() => onSelect(position as PositionType)}
          />
        ))}
      </div>
    </>
  )
}