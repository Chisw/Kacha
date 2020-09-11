import React from 'react'
import { ReactComponent as Plus } from './plus.svg'
import { ReactComponent as Duplicate } from './duplicate.svg'
import { ReactComponent as Edit } from './edit.svg'
import { ReactComponent as Delete } from './delete.svg'
import { ReactComponent as Github } from './github.svg'
import { ReactComponent as Tick } from './tick.svg'

const iconsMap: { [KEY: string]: React.FC } = {
  Plus,
  Duplicate,
  Edit,
  Delete,
  Github,
  Tick,
}

const Icons: { [KEY: string]: any } = {}

Object.entries(iconsMap).forEach(([name, icon]) => {
  Icons[name] = (props: any) => {
    const { size } = props
    return (
      <span className="">
        {(icon as any).render({
          width: size || 16,
          height: size || 16,
          fill: 'currentColor',
        })}
      </span>
    )
  }
})

export default Icons