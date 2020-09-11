import React from 'react'
import { IMark, MarkPosition } from '../ts/type'
import Icons from '../images/icons'

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
]

export default function Manager() {

  return (
    <>
      <div className="flex flex-wrap -mx-4">
        {defaultMarkList.map((mark, index) => {
          const { type, src} = mark
          return (
            <div
              key={index}
              className="mb-4 px-4 w-1/2 md:w-1/3 lg:w-1/5 shadow-lg"
            >
              <div className="relative h-40 bg-grid overflow-hidden">
                <div>
                  {type === 'text' ? (
                    <span className="text-white">{src}</span>
                  ) : (
                    <img src={src} alt="img" />
                  )}
                </div>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 flex flex-col bg-black-600 bg-hazy-25 transition-all duration-200">
                  <div
                    className="flex-grow w-full cursor-pointer flex justify-center items-center text-white hover:bg-white-100 transition-all duration-300 text-sm"
                    onClick={() => { }}
                  >
                    使用水印
                  </div>
                  <div className="border-t border-gray-800 flex justify-between items-center text-xs">
                    <div
                      className="py-2 flex-grow flex justify-center hover:bg-white-100 transition-all duration-300 cursor-pointer text-white border-r border-gray-800"
                      onClick={() => {}}
                    >
                      <Icons.Edit />
                    </div>
                    <div
                      className="py-2 flex-grow flex justify-center hover:bg-white-100 transition-all duration-300 cursor-pointer text-white border-r border-gray-800"
                      onClick={() => {}}
                    >
                      <Icons.Duplicate />
                    </div>
                    <div
                      className="py-2 flex-grow flex justify-center hover:bg-white-100 transition-all duration-300 cursor-pointer text-red-600"
                      onClick={() => {}}
                    >
                      <Icons.Delete />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="mb-8 px-4 w-1/2 md:w-1/3 lg:w-1/5">
          <div
            className="h-40 bg-gray-900 border-2 border-dashed flex justify-center items-center text-white text-6xl cursor-pointer opacity-50 hover:opacity-75 transition-all duration-200 bg-hazy-100"
          >
            <Icons.Plus size={48} />
          </div>
        </div>
      </div>
    </>
  )
}