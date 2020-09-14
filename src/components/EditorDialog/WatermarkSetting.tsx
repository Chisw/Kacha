import React, { useCallback, useRef } from 'react'
import { IWatermark } from '../../ts/type'
import { FormGroup, RadioButtonGroup, RadioButton, TextInput, NumberInput, Slider } from 'carbon-components-react'
import { FileUploader} from 'carbon-components-react'
import ToggleBox from '../ToggleBox'
import { get } from 'lodash'

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
    scaleType,
    scalePixel,
    scalePercent,
    offsetType,
    offsetPixelX,
    offsetPixelY,
    offsetPercentX,
    offsetPercentY,
    repeat,
    opacity,
    rotate,
  } = watermark

  const scaleInputRef = useRef<any>(null)
  const offsetXInputRef = useRef<any>(null)
  const offsetYInputRef = useRef<any>(null)

  const _setWatermarkSetting = useCallback((key: string, value: any) => {
    setWatermark(Object.assign({}, watermark, { [key]: value }))
  }, [watermark, setWatermark])

  return (
    <>
      <div className="mt-4 flex">
        <div className="w-1/2 pr-4">
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
                accept={['.jpeg', '.jpg', '.png']}
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

          <FormGroup legendText="位置偏移">
            <RadioButtonGroup
              name="watermark-offset"
              valueSelected={offsetType}
              onChange={(value: string) => _setWatermarkSetting('offsetType', value)}
            >
              <RadioButton
                id="watermark-offset-none"
                labelText="不偏移"
                value="none"
              />
              <RadioButton
                id="watermark-offset-pixel"
                labelText="固定像素"
                value="pixel"
              />
              <RadioButton
                id="watermark-offset-percent"
                labelText="相对百分比"
                value="percent"
              />
            </RadioButtonGroup>
          </FormGroup>

          <ToggleBox isOpen={offsetType !== 'none'}>
            <FormGroup legendText="横向偏移">
              <div className="flex items-center">
                <div className="mr-2">
                  <NumberInput
                    id="watermark-offset-value-x"
                    min={-25600}
                    max={25600}
                    step={1}
                    invalidText=""
                    ref={offsetXInputRef}
                    value={offsetType === 'pixel' ? offsetPixelX : offsetPercentX}
                    onChange={() => {
                      const value = Number(get(offsetXInputRef, 'current.value'))
                      if (!isNaN(value)) {
                        const key = offsetType === 'pixel' ? 'offsetPixelX' : 'offsetPercentX'
                        _setWatermarkSetting(key, value)
                      }
                    }}
                  />
                </div>
                <div className="pt-2">
                  {offsetType === 'pixel' ? 'px' : '%'}
                </div>
              </div>
            </FormGroup>
            <FormGroup legendText="纵向偏移">
              <div className="flex items-center">
                <div className="mr-2">
                  <NumberInput
                    id="watermark-offset-value-y"
                    min={-25600}
                    max={25600}
                    step={1}
                    invalidText=""
                    ref={offsetYInputRef}
                    value={offsetType === 'pixel' ? offsetPixelY : offsetPercentY}
                    onChange={() => {
                      const value = Number(get(offsetYInputRef, 'current.value'))
                      if (!isNaN(value)) {
                        const key = offsetType === 'pixel' ? 'offsetPixelY' : 'offsetPercentY'
                        _setWatermarkSetting(key, value)
                      }
                    }}
                  />
                </div>
                <div className="pt-2">
                  {offsetType === 'pixel' ? 'px' : '%'}
                </div>
              </div>
            </FormGroup>
          </ToggleBox>

          <FormGroup legendText="水印缩放">
            <RadioButtonGroup
              name="watermark-scale"
              valueSelected={scaleType}
              onChange={(value: string) => _setWatermarkSetting('scaleType', value)}
            >
              <RadioButton
                id="watermark-scale-none"
                labelText="不缩放"
                value="none"
              />
              <RadioButton
                id="watermark-scale-pixel"
                labelText="固定像素"
                value="pixel"
              />
              <RadioButton
                id="watermark-scale-percent"
                labelText="相对百分比"
                value="percent"
              />
            </RadioButtonGroup>
          </FormGroup>

          <ToggleBox isOpen={scaleType !== 'none'}>
            <FormGroup legendText="缩放至">
              <div className="flex items-center">
                <div className="mr-2">
                  <NumberInput
                    id="watermark-scale-value"
                    min={1}
                    max={25600}
                    step={1}
                    invalidText=""
                    ref={scaleInputRef}
                    value={scaleType === 'pixel' ? scalePixel : scalePercent}
                    onChange={() => {
                      const value = Number(get(scaleInputRef, 'current.value'))
                      if (!isNaN(value)) {
                        const key = scaleType === 'pixel' ? 'scalePixel' : 'scalePercent'
                        _setWatermarkSetting(key, value)
                      }
                    }}
                  />
                </div>
                <div className="pt-2">
                  {scaleType === 'pixel' ? 'px' : '%'}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 leading-relaxed">
                此为宽度调整，高度将按原宽高比进行相应缩放
              </div>
            </FormGroup>
          </ToggleBox>

          <FormGroup legendText="重复">
            <RadioButtonGroup
              name="watermark-repeat"
              valueSelected={repeat}
              onChange={(value: string) => _setWatermarkSetting('repeat', value)}
            >
              <RadioButton
                id="watermark-repeat-none"
                labelText="不重复"
                value="none"
              />
              <RadioButton
                id="watermark-repeat-x"
                labelText="横向"
                value="x"
              />
              <RadioButton
                id="watermark-repeat-y"
                labelText="纵向"
                value="y"
              />
              <RadioButton
                id="watermark-repeat-cover"
                labelText="覆盖"
                value="cover"
              />
            </RadioButtonGroup>
          </FormGroup>

          <FormGroup legendText="透明度">
            <div className="flex items-center">
              <div className="mr-2">
                <Slider
                  min={0}
                  max={100}
                  value={opacity}
                  onChange={({ value }) => _setWatermarkSetting('opacity', value)}
                />
              </div>
              <div className="pt-2">
                %
              </div>
            </div>
          </FormGroup>

          <FormGroup legendText="旋转">
            <div className="flex items-center">
              <div className="mr-2">
                <Slider
                  min={0}
                  max={360}
                  value={rotate}
                  onChange={({ value }) => _setWatermarkSetting('rotate', value)}
                />
              </div>
              <div className="pt-2">
                °
              </div>
            </div>
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