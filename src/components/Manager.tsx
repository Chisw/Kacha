import React, { useRef, useCallback, useState } from 'react'
import { IWatermark } from '../ts/type'
import Icons from '../images/icons'
import { Button, FormGroup, RadioButtonGroup, RadioButton, Slider  } from 'carbon-components-react'

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
    font: '',
    setting: {
      format: 'jpeg',
      quality: .92,
      scaleType: 'none',
      scaleValue: 1,
      saveEXIF: false,
    }
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
    font: '',
    setting: {
      format: 'jpeg',
      quality: .92,
      scaleType: 'none',
      scaleValue: 1,
      saveEXIF: false,
    }
  },
]

const HOVER_CLASS = 'hover:bg-white-100 transition-all duration-300 active:duration-75 active:bg-transparent cursor-pointer'

export default function Manager() {

  const [mode, setMode] = useState<'edit'|'create'>()
  const [currentWrapper, setCurrentWrapper] = useState<HTMLDivElement>()

  const [settingFormat, setSettingFormat] = useState('origin')
  const [settingQuality, setSettingQuality] = useState(92)

  const editorRef = useRef<HTMLDivElement>(null)

  const handleWatermarkEdit = useCallback((e: any, watermarkId: string) => {
    setMode('edit')
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
    console.log(settingFormat)
  }, [currentWrapper, settingFormat])

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
                <div className="absolute inset-0 opacity-0 hover:opacity-100 flex flex-col bg-black-500 bg-hazy-25 transition-all duration-200 border border-solid border-gray-700">
                  <div
                    className={`flex-grow flex justify-center items-center ${HOVER_CLASS} text-white text-sm border-b border-solid border-gray-700`}
                    onClick={() => {}}
                  >
                    <span className="flex items-center">
                      <Icons.Tick size={20} />
                      <span className="ml-1">使用该水印</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div
                      className={`py-2 flex-grow flex justify-center ${HOVER_CLASS} text-white border-r border-solid border-gray-700`}
                      onClick={e => handleWatermarkEdit(e, id)}
                    >
                      <Icons.Edit />
                    </div>
                    <div
                      className={`py-2 flex-grow flex justify-center ${HOVER_CLASS} text-white border-r border-solid border-gray-700`}
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
            className="h-40 bg-gray-900 border-2 border-dashed flex justify-center items-center text-white text-6xl cursor-pointer opacity-25 hover:opacity-75 transition-all duration-200 bg-hazy-100"
          >
            <Icons.Plus size={48} />
          </div>
        </div>
      </div>
      <div
        ref={editorRef}
        className="watermark-editor hidden fixed z-20 bg-white shadow-lg select-none transition-all duration-500"
      >
        <div className="p-4">
          <h2 className="text-3xl">{mode === 'edit' ? '编辑' : '创建'}水印</h2>
          <h4 className="mt-6 mb-4 text-2xl text-gray-600">水印参数</h4>
          
          <h4 className="mt-6 mb-4 text-2xl text-gray-600">导出参数</h4>
          <div>

            <FormGroup legendText="导出格式">
              <RadioButtonGroup
                name="radio-button-group"
                valueSelected={settingFormat}
                onChange={(val: string) => setSettingFormat(val)}
              >
                <RadioButton
                  id="origin"
                  labelText="原格式"
                  value="origin"
                />
                <RadioButton
                  id="jpeg"
                  labelText=".jpg"
                  value="jpeg"
                />
                <RadioButton
                  id="png"
                  labelText=".png"
                  value="png"
                />
                <RadioButton
                  id="webp"
                  labelText=".webp"
                  value="webp"
                />
              </RadioButtonGroup>
            </FormGroup>

            <FormGroup legendText="图像品质">
              <Slider
                max={100}
                min={0}
                value={settingQuality}
                onChange={({ value }) => setSettingQuality(value)}
              />
            </FormGroup>

          </div>
        </div>
        <Button onClick={() => handleEditorClose()}>保存</Button>
        <Button kind="ghost" onClick={() => handleEditorClose()}>取消</Button>
      </div>
    </>
  )
}