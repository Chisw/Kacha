import React, { useCallback } from 'react'
import { IWatermark } from '../../ts/type'
import { FormGroup, RadioButtonGroup, RadioButton, TextInput } from 'carbon-components-react'
import { FileUploader} from 'carbon-components-react'
import ToggleBox from '../ToggleBox'

interface WatermarkSettingProps {
  watermark: IWatermark,
  setWatermark: (watermark: IWatermark) => void
}

export default function WatermarkSetting(props: WatermarkSettingProps) {

  const {
    watermark,
    setWatermark,
  } = props

  const {
    type,
    text,
    position,
  } = watermark

  const _setWatermarkSetting = useCallback((key: string, value: any) => {
    setWatermark(Object.assign({}, watermark, { [key]: value }))
  }, [watermark, setWatermark])

  return (
    <>
      <div className="mt-4 flex">
        <div className="w-1/2 pr-8">
          <FormGroup legendText="水印类型">
            <RadioButtonGroup
              name="type"
              valueSelected={type}
              onChange={(value: string) => _setWatermarkSetting('type', value)}
            >
              <RadioButton
                id="image"
                labelText="图片"
                value="image"
              />
              <RadioButton
                id="text"
                labelText="文本"
                value="text"
              />
            </RadioButtonGroup>
          </FormGroup>
          
          <ToggleBox isOpen={type === 'image'}>
            <FormGroup legendText="图片">
              <FileUploader
                buttonLabel="选择图片"
                labelDescription="仅支持 1M 以下的 .jpg 或 .png"
                filenameStatus="complete"
              />
            </FormGroup>
          </ToggleBox>

          <ToggleBox isOpen={type === 'text'}>
            <FormGroup legendText="文本">
              <TextInput
                id="text"
                labelText=""
                placeholder="请输入文本内容"
                value={text}
                onChange={(e: any) => _setWatermarkSetting('text', e.target.value)}
              />
            </FormGroup>
          </ToggleBox>

          <FormGroup legendText="水印位置">
            <PositionSelector
              selected={position}
              onSelect={p => _setWatermarkSetting('position', p)}
            />
          </FormGroup>

        </div>
        <div className="w-1/2">
          预览
        </div>
      </div>
    </>
  )
}

const positionMap = {
  'top-left': '左上',
  'top': '上',
  'top-right': '右上',
  'left': '左',
  'center': '中',
  'right': '右',
  'bottom-left': '左下',
  'bottom': '下',
  'bottom-right': '右下',
}

function PositionSelector(props: { selected: string, onSelect: (p: string) => void }) {

  const {
    selected,
    onSelect,
  } = props

  return (
    <div className="mt-2 flex flex-wrap w-36 text-xs">
      {Object.entries(positionMap).map(([position, name]) => (
        <div
          key={position}
          className={`w-1/3 h-12 flex justify-center items-center bg-gray-200  select-none
            ${selected === position ? 'text-white bg-gray-900' : 'cursor-pointer hover:bg-gray-400'}
          `}
          onClick={() => onSelect(position)}
        >
          {name}
        </div>
      ))}
    </div>
  )
}