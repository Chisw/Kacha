import React from 'react'
import { Button } from 'element-react'
import { IMark, MarkPosition } from '../ts/type'

const defaultMarkList: IMark[] = [
  {
    title: '',
    src: 'jisuowei.com',
    type: 'text',
    position: 'bottom-right',
    width: '80px',
    height: '20px',
    ratioLock: true,
    repeat: 'none',
    opacity: 1,
    rotate: 0,
    font: ''
  },
  {
    title: '',
    src: 'jisuowei.com',
    type: 'text',
    position: 'bottom-right',
    width: '80px',
    height: '20px',
    ratioLock: true,
    repeat: 'none',
    opacity: 1,
    rotate: 0,
    font: ''
  },
  {
    title: '',
    src: 'jisuowei.com',
    type: 'text',
    position: 'bottom-right',
    width: '80px',
    height: '20px',
    ratioLock: true,
    repeat: 'none',
    opacity: 1,
    rotate: 0,
    font: ''
  },
]

export default function Manager() {

  return (
    <>
      <div className="flex flex-wrap -mx-2">
        {defaultMarkList.map((mark, index) => {
          const { type, src} = mark
          return (
            <div
              key={index}
              className="mb-4 px-2 w-1/6 shadow-lg"
            >
              <div className="relative h-40 bg-grid">
                <div>
                  {type === 'text' ? (
                    <span className="text-white">{src}</span>
                  ) : (
                    <img src={src} alt="img" />
                  )}
                </div>
                <div className="absolute inset-0 p-2 opacity-0 hover:opacity-100">
                  <div className="w-full h-24 bg-hazy-100 cursor-pointer flex justify-center items-center text-white opacity-50 hover:opacity-75 transition-all duration-200 rounded-md">
                    使用水印
                  </div>
                  <div className="mt-2 h-10 flex justify-between items-center text-white text-xs">
                    <div>复制</div>
                    <div>编辑</div>
                    <div>删除</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="mb-4 px-2 w-1/6">
          <div
            className="h-40 bg-gray-900 border-2 border-dashed flex justify-center items-center text-white text-6xl cursor-pointer opacity-50 hover:opacity-75 transition-all duration-200 bg-hazy-100"
          >
            +
          </div>
        </div>
      </div>
    </>
  )
}