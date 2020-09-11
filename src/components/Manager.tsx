import React, { useRef, useCallback, useState } from 'react'
import { IWatermark } from '../ts/type'
import Icons from '../images/icons'

const defaultWatermarkList: IWatermark[] = [
  {
    id: 'bj93tu',
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
    id: '44m9a8',
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

const HOVER_CLASS = 'hover:bg-white-100 transition-all duration-300 active:duration-75 active:bg-transparent cursor-pointer'

export default function Manager() {

  const editorRef = useRef<HTMLDivElement>(null)
  const [currentWrapper, setCurrentWrapper] = useState<HTMLDivElement>()

  const handleWatermarkEdit = useCallback((e: any, watermarkId: string) => {
    const wrapper = e.target.closest('.watermark-wrapper')
    setCurrentWrapper(wrapper)
    if (wrapper && editorRef && editorRef.current) {
      const rect = wrapper.getBoundingClientRect()
      const { x, y, width, height } = rect
      const right = document.body.clientWidth - x - width
      const bottom = document.body.clientHeight - y - height
      const div = editorRef.current
      div.style.display = 'block'
      div.style.top = `${y}px`
      div.style.right = `${right}px`
      div.style.bottom = `${bottom}px`
      div.style.left = `${x}px`
      div.style.opacity = '0'
      setTimeout(() => {
        div.style.top = '40px'
        div.style.right = '40px'
        div.style.bottom = '40px'
        div.style.left = '40px'
        div.style.opacity = '1'
      }, 1)
    }
  }, [])

  const handleEditorClose = useCallback(() => {
    if (currentWrapper && editorRef && editorRef.current) {
      const rect = currentWrapper.getBoundingClientRect()
      const { x, y, width, height } = rect
      const right = document.body.clientWidth - x - width
      const bottom = document.body.clientHeight - y - height
      const div = editorRef.current
      div.style.top = `${y}px`
      div.style.right = `${right}px`
      div.style.bottom = `${bottom}px`
      div.style.left = `${x}px`
      div.style.opacity = '0'
      setTimeout(() => {
        div.style.display = 'none'
      }, 500)
    }
  }, [currentWrapper])
  return (
    <>
      <div className="flex flex-wrap -mx-4">
        {defaultWatermarkList.map((watermark, index) => {
          const { id, type, src } = watermark
          return (
            <div
              key={index}
              className="mb-4 px-4 w-1/2 md:w-1/3 lg:w-1/5 select-none"
            >
              <div className="watermark-wrapper relative h-40 bg-grid overflow-hidden shadow-lg">
                <div>
                  {type === 'text' ? (
                    <span className="text-white">{src}</span>
                  ) : (
                    <img src={src} alt="img" />
                  )}
                </div>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 flex flex-col bg-black-500 bg-hazy-25 transition-all duration-200">
                  <div
                    className={`flex-grow flex justify-center items-center ${HOVER_CLASS} text-white text-sm`}
                    onClick={() => {}}
                  >
                    <span className="flex items-center">
                      <Icons.Tick size={20} />
                      <span className="ml-1">使用该水印</span>
                    </span>
                  </div>
                  <div className="border-t border-gray-800 flex justify-between items-center text-xs">
                    <div
                      className={`py-2 flex-grow flex justify-center ${HOVER_CLASS} text-white border-r border-gray-800`}
                      onClick={e => handleWatermarkEdit(e, id)}
                    >
                      <Icons.Edit />
                    </div>
                    <div
                      className={`py-2 flex-grow flex justify-center ${HOVER_CLASS} text-white border-r border-gray-800`}
                      onClick={() => {}}
                    >
                      <Icons.Duplicate />
                    </div>
                    <div
                      className={`py-2 flex-grow flex justify-center ${HOVER_CLASS} text-red-600`}
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
      <div
        ref={editorRef}
        className="watermark-editor hidden fixed z-20 bg-gray-500 shadow-lg"
        style={{
          transition: 'all 500ms ease-in-out',
        }}
      >
        <span onClick={() => handleEditorClose()}>保存</span>
      </div>
    </>
  )
}