import React from 'react'
import { Button } from 'element-react'
import { IMark, MarkPosition } from '../ts/type'

const defaultMarkList: IMark[] = [
  {
    type: 'text',
    src: 'jisuowei.com',
    position: 'bottom-right',
    width: '80px',
    height: '20px',
    ratioLock: true,
    repeat: 'none',
    opacity: 1,
    rotate: 0,
    font: {
      size: 14,
      family: ''
    }
  },
]

export default function Manager() {

  return (
    <>
      {defaultMarkList.map((mark, index) => {
        const { type, src} = mark
        return (
          <div
            key={index}
            className="w-24 h-24 rounded-lg border"
          >
            {type === 'text' ? (
              <span className="text-white">{src}</span>
            ) : (
              <img src={src} alt="img" />
            )}
          </div>
        )
      })}

      <Button type="primary" icon="plus" size="large">创建水印项</Button>
    </>
  )
}