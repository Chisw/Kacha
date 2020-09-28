import React, { useCallback, useRef, useState } from 'react'
import { IWatermark } from '../../ts/type'
import { FormGroup, RadioButtonGroup, RadioButton, TextInput, NumberInput, Slider, InlineNotification, Checkbox } from 'carbon-components-react'
import { FileUploaderButton} from 'carbon-components-react'
import ToggleBox from '../ToggleBox'
import { get } from 'lodash'
import Preview from '../Preview'
import { getImageByDataURL } from '../../ts/utils'

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
    title,
    theme,
    showOutline,
    type,
    text,
    width,
    height,
    scaleType,
    scaleBase,
    scalePixel,
    scalePercent,
    position,
    offsetType,
    offsetPixelX,
    offsetPixelY,
    offsetPercentX,
    offsetPercentY,
    repeat,
    opacity,
    rotate,
    fontSize,
    fontColor,
    fontFamily,
    fontAlignX,
    fontAlignY,
  } = watermark

  const widthInputRef = useRef<any>(null)
  const heightInputRef = useRef<any>(null)
  const scaleInputRef = useRef<any>(null)
  const offsetXInputRef = useRef<any>(null)
  const offsetYInputRef = useRef<any>(null)
  const fontSizeInputRef = useRef<any>(null)

  const [isImgLarge, setIsImgLarge] = useState(false)
  const [timestamp, setTimestamp] = useState(Date.now())

  const _set = useCallback((key: string, value: any) => {
    setWatermark(Object.assign({}, watermark, { [key]: value }))
  }, [watermark, setWatermark])

  const getDataByFile = useCallback<{ dataURL: string, width: number, height: number} | any>(async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e: any) => {
        const dataURL = e.target.result
        const { width, height } = await getImageByDataURL(dataURL)
        resolve({ dataURL, width, height })
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }, [])

  const handleFileChange = useCallback(async (e: any) => {
    const file = get(e, 'target.files[0]', null)
    if (file) {
      if (file.size < 1024 * 1024) {
        const { dataURL, width, height } = await getDataByFile(file)
        setWatermark(Object.assign({}, watermark, { dataURL, width, height }))
        setIsImgLarge(false)
      } else {
        setWatermark(Object.assign({}, watermark, { dataURL: '', width: 0, height: 0 }))
        setIsImgLarge(true)
      }
    }
  }, [getDataByFile, watermark, setWatermark])

  const handleColorChange = useCallback((e: any) => {
    const now = Date.now()
    if (now - timestamp > 500) {
      _set('fontColor', e.target.value)
      setTimestamp(now)
    }
  }, [_set, timestamp])

  return (
    <>
      <div className="mt-4 flex">
        <div className="w-1/2 pr-4">
          <div style={{ maxWidth: 400 }}>
            <FormGroup legendText="标题">
              <TextInput
                id="title"
                labelText=""
                placeholder="请输入标题"
                maxLength={32}
                value={title}
                onChange={(e: any) => _set('title', e.target.value)}
              />
            </FormGroup>

            <FormGroup legendText="预览背景风格">
              <RadioButtonGroup
                name="theme"
                valueSelected={theme}
                onChange={(value: string) => _set('theme', value)}
              >
                <RadioButton
                  id="dark"
                  labelText="深色"
                  value="dark"
                />
                <RadioButton
                  id="light"
                  labelText="浅色"
                  value="light"
                />
              </RadioButtonGroup>
            </FormGroup>

            <FormGroup legendText="预览轮廓线">
              <Checkbox
                id="show-outline"
                name="show-outline"
                labelText="显示水印占据的空间轮廓虚线"
                checked={showOutline}
                onChange={(checked) => _set('showOutline', checked)}
              />
              <div className="mt-2 text-xs text-gray-500 leading-relaxed">
                仅供辅助参考，在输出时不会显示
              </div>
            </FormGroup>

            <FormGroup legendText="类型">
              <RadioButtonGroup
                name="type"
                valueSelected={type}
                onChange={(value: string) => _set('type', value)}
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
                <FileUploaderButton
                  labelText="选择图片"
                  accept={['.jpeg', '.jpg', '.png']}
                  onChange={handleFileChange}
                />
                <div className="mt-2 text-xs text-gray-500 leading-relaxed">
                  仅支持 1M 以下的 .jpg 或 .png
                </div>
                {isImgLarge && (
                  <InlineNotification
                    lowContrast
                    title="图片过大"
                    kind="warning"
                    onCloseButtonClick={() => setIsImgLarge(false)}
                  />
                )}
              </FormGroup>
            </ToggleBox>

            <ToggleBox isOpen={type === 'text'} maxHeight={800}>
              <FormGroup legendText="文本">
                <TextInput
                  id="text"
                  labelText=""
                  placeholder="请输入文本内容"
                  value={text}
                  onChange={(e: any) => _set('text', e.target.value)}
                />
              </FormGroup>
              <FormGroup legendText="字体大小">
                <div className="flex items-center">
                  <div className="mr-2">
                    <NumberInput
                      id="watermark-font-size"
                      min={0}
                      max={500}
                      step={1}
                      invalidText=""
                      ref={fontSizeInputRef}
                      value={fontSize}
                      onChange={() => {
                        const value = Number(get(fontSizeInputRef, 'current.value'))
                        if (!isNaN(value)) _set('fontSize', value)
                      }}
                    />
                  </div>
                  <div className="pt-2">px</div>
                </div>
              </FormGroup>
              <FormGroup legendText="字体颜色">
                <div className="flex items-center">
                  <input
                    type="color"
                    id="font-color"
                    name="font-color"
                    value={fontColor || '#000000'}
                    onChange={handleColorChange}
                  >
                  </input>
                  <span className="ml-2">
                    {fontColor || '#000000'}
                  </span>
                </div>
              </FormGroup>
              <FormGroup legendText="字体水平对齐">
                <RadioButtonGroup
                  name="fontAlignX"
                  valueSelected={fontAlignX}
                  onChange={(value: string) => _set('fontAlignX', value)}
                >
                  <RadioButton
                    id="align-x-flex-start"
                    labelText="居左"
                    value="flex-start"
                  />
                  <RadioButton
                    id="align-x-center"
                    labelText="居中"
                    value="center"
                  />
                  <RadioButton
                    id="align-x-flex-end"
                    labelText="居右"
                    value="flex-end"
                  />
                </RadioButtonGroup>
              </FormGroup>
              <FormGroup legendText="字体垂直对齐">
                <RadioButtonGroup
                  name="fontAlignY"
                  valueSelected={fontAlignY}
                  onChange={(value: string) => _set('fontAlignY', value)}
                >
                  <RadioButton
                    id="align-y-flex-start"
                    labelText="居顶"
                    value="flex-start"
                  />
                  <RadioButton
                    id="align-y-center"
                    labelText="居中"
                    value="center"
                  />
                  <RadioButton
                    id="align-y-flex-end"
                    labelText="居底"
                    value="flex-end"
                  />
                </RadioButtonGroup>
              </FormGroup>
            </ToggleBox>

            <FormGroup legendText="宽度">
              <div className="flex items-center">
                <div className="mr-2">
                  <NumberInput
                    id="watermark-width-value"
                    min={1}
                    max={25600}
                    step={1}
                    invalidText=""
                    disabled={type === 'image'}
                    ref={widthInputRef}
                    value={width}
                    onChange={() => {
                      const value = Number(get(widthInputRef, 'current.value'))
                      if (!isNaN(value)) _set('width', value)
                    }}
                  />
                </div>
                <div className="pt-2">px</div>
              </div>
            </FormGroup>

            <FormGroup legendText="高度">
              <div className="flex items-center">
                <div className="mr-2">
                  <NumberInput
                    id="watermark-height-value"
                    min={1}
                    max={25600}
                    step={1}
                    invalidText=""
                    disabled={type === 'image'}
                    ref={heightInputRef}
                    value={height}
                    onChange={() => {
                      const value = Number(get(heightInputRef, 'current.value'))
                      if (!isNaN(value)) _set('height', value)
                    }}
                  />
                </div>
                <div className="pt-2">px</div>
              </div>
            </FormGroup>

            <FormGroup legendText="缩放">
              <RadioButtonGroup
                name="watermark-scale-type"
                valueSelected={scaleType}
                onChange={(value: string) => _set('scaleType', value)}
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
              <FormGroup legendText="缩放基准">
                <RadioButtonGroup
                  name="watermark-scale-base"
                  valueSelected={scaleBase}
                  onChange={(value: string) => _set('scaleBase', value)}
                >
                  <RadioButton
                    id="watermark-scale-width"
                    labelText="宽度"
                    value="width"
                  />
                  <RadioButton
                    id="watermark-scale-height"
                    labelText="高度"
                    value="height"
                  />
                </RadioButtonGroup>
              </FormGroup>
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
                          _set(key, value)
                        }
                      }}
                    />
                  </div>
                  <div className="pt-2">
                    {scaleType === 'pixel' ? 'px' : '%'}
                  </div>
                </div>
              </FormGroup>
            </ToggleBox>

            <FormGroup legendText="位置">
              <PositionSelector
                selected={position}
                onSelect={p => _set('position', p)}
              />
            </FormGroup>

            <FormGroup legendText="位置偏移">
              <RadioButtonGroup
                name="watermark-offset"
                valueSelected={offsetType}
                onChange={(value: string) => _set('offsetType', value)}
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
              <FormGroup legendText="水平偏移">
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
                          _set(key, value)
                        }
                      }}
                    />
                  </div>
                  <div className="pt-2">
                    {offsetType === 'pixel' ? 'px' : '%'}
                  </div>
                </div>
              </FormGroup>
              <FormGroup legendText="垂直偏移">
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
                          _set(key, value)
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

            <FormGroup legendText="重复">
              <RadioButtonGroup
                name="watermark-repeat"
                valueSelected={repeat}
                onChange={(value: string) => _set('repeat', value)}
              >
                <RadioButton
                  id="watermark-repeat-no"
                  labelText="不重复"
                  value="no-repeat"
                />
                <RadioButton
                  id="watermark-repeat-x"
                  labelText="横向"
                  value="repeat-x"
                />
                <RadioButton
                  id="watermark-repeat-y"
                  labelText="纵向"
                  value="repeat-y"
                />
                <RadioButton
                  id="watermark-repeat-repeat"
                  labelText="覆盖"
                  value="repeat"
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
                    onChange={({ value }) => _set('opacity', value)}
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
                    onChange={({ value }) => _set('rotate', value)}
                  />
                </div>
                <div className="pt-2">
                  °
                </div>
              </div>
            </FormGroup>
          </div>
        </div>
        <div className="w-1/2">
          <div className="sticky" style={{ top: 48 }}>
            <Preview resizable watermark={watermark} />
          </div>
        </div>
      </div>
    </>
  )
}

const positionMap = {
  'left-top': '左上', 'center-top': '上', 'right-top': '右上',
  'left-center': '左', 'center-center': '中', 'right-center': '右',
  'left-bottom': '左下', 'center-bottom': '下', 'right-bottom': '右下',
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
          className={`w-1/3 h-12 flex justify-center items-center bg-gray-200
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