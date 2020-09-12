import React, { useRef } from 'react'
import { ISetting } from '../../ts/type'
import { FormGroup, RadioButtonGroup, RadioButton, Slider, NumberInput } from 'carbon-components-react';
import ToggleBox from '../ToggleBox';

interface ExportSettingProps {
  setting: ISetting
  setSetting: (setting: ISetting) => void
}

export default function ExportSetting(props: ExportSettingProps) {

  const {
    setting,
    setSetting,
  } = props

  const inputRef = useRef<any>(null)

  return (
    <>
      <h4 className="mt-6 mb-4 text-xl text-gray-600">导出设置</h4>
      <div>
        <FormGroup legendText="图像格式">
          <RadioButtonGroup
            name="format"
            valueSelected={setting.format}
            onChange={(value: string) => setSetting(Object.assign({}, setting, { format: value }))}
          >
            <RadioButton
              id="origin"
              labelText="原格式"
              value="origin"
            />
            <RadioButton
              id="jpeg"
              labelText="JPG"
              value="jpeg"
            />
            <RadioButton
              id="png"
              labelText="PNG"
              value="png"
            />
            <RadioButton
              id="webp"
              labelText="WEBP"
              value="webp"
            />
          </RadioButtonGroup>
        </FormGroup>

        <ToggleBox isOpen={setting.format === 'jpeg'}>
          <FormGroup legendText="图像品质">
            <Slider
              max={100}
              min={0}
              value={setting.quality}
              onChange={({ value }) => setSetting(Object.assign({}, setting, { quality: value }))}
            />
          </FormGroup>
        </ToggleBox>

        <FormGroup legendText="图像缩放">
          <RadioButtonGroup
            name="scale"
            valueSelected={setting.scaleType}
            onChange={(value: string) => setSetting(Object.assign({}, setting, { scaleType: value }))}
          >
            <RadioButton
              id="none"
              labelText="不缩放"
              value="none"
            />
            <RadioButton
              id="pixel"
              labelText="按指定像素缩放"
              value="pixel"
            />
            <RadioButton
              id="percent"
              labelText="按相对百分比缩放"
              value="percent"
            />
          </RadioButtonGroup>
          <ToggleBox isOpen={setting.scaleType !== 'none'}>
            <>
              <div className="mt-2 flex items-center">
                <div className="pt-2">
                  缩放至
                </div>
                <div className="mx-2">
                  <NumberInput
                    id="scale"
                    min={0}
                    max={25600}
                    step={1}
                    ref={inputRef}
                    value={setting.scaleType === 'pixel' ? setting.scalePixel : setting.scalePercent}
                    onChange={() => {
                      const value = Number(inputRef!.current!.value!)
                      if (value) {
                        const key = setting.scaleType === 'pixel' ? 'scalePixel' : 'scalePercent'
                        setSetting(Object.assign({}, setting, { [key]: value }))
                      }
                    }}
                    invalidText=""
                  />
                </div>
                <div className="pt-2">
                  {setting.scaleType === 'pixel' ? 'px' : '%'}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 leading-relaxed">
                此为宽度调整，高度将按原宽高比进行相应缩放<br />
                最大仅支持缩放至 25600px
              </div>
            </>
          </ToggleBox>
        </FormGroup>
        
      </div>
    </>
  )
}