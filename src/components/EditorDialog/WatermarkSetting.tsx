import React, { useCallback, useRef, useState } from 'react'
import { IWatermark, AlignType, WeightType, StyleType } from '../../ts/type'
import { FormGroup, RadioButtonGroup, RadioButton, TextInput, NumberInput, Slider, InlineNotification, Checkbox, Button } from 'carbon-components-react'
import { FileUploaderButton} from 'carbon-components-react'
import ToggleBox from '../ToggleBox'
import { get } from 'lodash'
import Preview from '../Preview'
import { getImageByDataURL } from '../../ts/utils'
import PositionSelector from './PositionSelector'
import {
  AlignHorizontalLeft16,
  AlignHorizontalCenter16,
  AlignHorizontalRight16,
  AlignVerticalTop16,
  AlignVerticalCenter16,
  AlignVerticalBottom16,
  TextBold16,
  TextItalic16,
  CarbonIconType,
} from '@carbon/icons-react'

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
    paddingType,
    paddingPixelX,
    paddingPixelY,
    paddingPercentX,
    paddingPercentY,
    repeat,
    opacity,
    rotate,
    fontSize,
    fontColor,
    fontFamily,
    fontAlignX,
    fontAlignY,
    fontWeight,
    fontStyle,
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

  const getAlignButtonProps = useCallback((align: 'X' | 'Y', alignType: AlignType) => {
    const { key, icons } = {
      X: { key: 'fontAlignX', icons: [AlignHorizontalLeft16, AlignHorizontalCenter16, AlignHorizontalRight16] },
      Y: { key: 'fontAlignY', icons: [AlignVerticalTop16, AlignVerticalCenter16, AlignVerticalBottom16] },
    }[align] as { key: 'fontAlignX' | 'fontAlignY', icons: CarbonIconType[]}
    return {
      hasIconOnly: true,
      iconDescription: ' ',
      size: 'small',
      kind: (align === 'X' ? fontAlignX : fontAlignY) === alignType ? 'primary' : 'secondary',
      renderIcon: icons[['flex-start', 'center', 'flex-end'].indexOf(alignType)],
      onClick: () => _set(key, alignType),
    }
  }, [_set, fontAlignX, fontAlignY])

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
          <div style={{ maxWidth: 480 }}>

            <FormGroup legendText="水印标题">
              <TextInput
                id="title"
                labelText=""
                placeholder="给水印起个名字吧"
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
                labelText="显示水印占据的区域轮廓线"
                checked={showOutline}
                onChange={(checked) => _set('showOutline', checked)}
              />
              <div className="mt-1 text-xs text-gray-500 leading-relaxed">
                仅供辅助参考，在输出时不会显示
              </div>
            </FormGroup>

            <FormGroup legendText="区域宽、高">
              <div className="flex items-center">
                <div className="flex items-center mr-8">
                  <div>宽</div>
                  <div className="mx-2">
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
                  <div>px</div>
                </div>
                <div className="flex items-center">
                  <div>高</div>
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
                  <div>px</div>
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500 leading-relaxed">
                当类型为图片时，区域宽高默认为图片宽高，如想调整大小，请使用下方缩放功能
              </div>
            </FormGroup>

            <FormGroup legendText="区域位置">
              <PositionSelector
                selected={position}
                onSelect={p => _set('position', p)}
              />
            </FormGroup>

            <FormGroup legendText="区域填充">
              <RadioButtonGroup
                name="watermark-offset"
                valueSelected={paddingType}
                onChange={(value: string) => _set('paddingType', value)}
              >
                <RadioButton
                  id="watermark-offset-none"
                  labelText="不填充"
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

            <ToggleBox isOpen={paddingType !== 'none'}>
              <FormGroup legendText="填充大小">
                <div className="flex items-center">
                  <div className="flex items-center mr-8">
                    <div>水平</div>
                    <div className="mx-2">
                      <NumberInput
                        id="watermark-offset-value-x"
                        min={-25600}
                        max={25600}
                        step={1}
                        invalidText=""
                        ref={offsetXInputRef}
                        value={paddingType === 'pixel' ? paddingPixelX : paddingPercentX}
                        onChange={() => {
                          const value = Number(get(offsetXInputRef, 'current.value'))
                          if (!isNaN(value)) {
                            const key = paddingType === 'pixel' ? 'paddingPixelX' : 'paddingPercentX'
                            _set(key, value)
                          }
                        }}
                      />
                    </div>
                    <div>{paddingType === 'pixel' ? 'px' : '%'}</div>
                  </div>
                  <div className="flex items-center">
                    <div>垂直</div>
                    <div className="mx-2">
                      <NumberInput
                        id="watermark-offset-value-y"
                        min={-25600}
                        max={25600}
                        step={1}
                        invalidText=""
                        ref={offsetYInputRef}
                        value={paddingType === 'pixel' ? paddingPixelY : paddingPercentY}
                        onChange={() => {
                          const value = Number(get(offsetYInputRef, 'current.value'))
                          if (!isNaN(value)) {
                            const key = paddingType === 'pixel' ? 'paddingPixelY' : 'paddingPercentY'
                            _set(key, value)
                          }
                        }}
                      />
                    </div>
                    <div>{paddingType === 'pixel' ? 'px' : '%'}</div>
                  </div>
                </div>
              </FormGroup>
            </ToggleBox>

            <FormGroup legendText="水印类型">
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
                  accept={['.jpeg', '.jpg', '.png', '.svg']}
                  onChange={handleFileChange}
                />
                <div className="mt-1 text-xs text-gray-500 leading-relaxed">
                  支持 1M 以内的 JPG, PNG, SVG
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

            <ToggleBox isOpen={type === 'text'} maxHeight={500}>
              <FormGroup legendText="文本">
                <TextInput
                  id="text"
                  labelText=""
                  placeholder="请输入文本内容"
                  value={text}
                  onChange={(e: any) => _set('text', e.target.value)}
                />
              </FormGroup>
              <FormGroup legendText="本地字体及字体大小">
                <div className="flex items-center">
                  <div className="mr-4">
                    <TextInput
                      id="font-family"
                      labelText=""
                      placeholder="请输入本地字体名称"
                      value={fontFamily}
                      onChange={(e: any) => _set('fontFamily', e.target.value)}
                    />
                  </div>
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
                  <div>px</div>
                </div>
              </FormGroup>
              <FormGroup legendText="字体对齐、风格及颜色">
                <div className="flex items-center">
                  <div className="mr-2">
                    <Button {...getAlignButtonProps('X', 'flex-start')} />
                    <Button {...getAlignButtonProps('X', 'center')} />
                    <Button {...getAlignButtonProps('X', 'flex-end')} />
                  </div>
                  <div className="mr-2">
                    <Button {...getAlignButtonProps('Y', 'flex-start')} />
                    <Button {...getAlignButtonProps('Y', 'center')} />
                    <Button {...getAlignButtonProps('Y', 'flex-end')} />
                  </div>
                  <div className="mr-2">
                    <Button
                      hasIconOnly
                      iconDescription=" "
                      renderIcon={TextBold16}
                      size="small"
                      className="mr-2"
                      kind={fontWeight === 'bold' ? 'primary' : 'tertiary'}
                      onClick={() => _set('fontWeight', ['normal', 'bold'].find(w => w !== fontWeight) as WeightType)}
                    />
                  </div>
                  <div className="mr-2">
                    <Button
                      hasIconOnly
                      iconDescription=" "
                      renderIcon={TextItalic16}
                      size="small"
                      className="mr-2"
                      kind={fontStyle === 'italic' ? 'primary' : 'tertiary'}
                      onClick={() => _set('fontStyle', ['normal', 'italic'].find(w => w !== fontStyle) as StyleType)}
                    />
                  </div>
                  <div className="mr-2">
                    <input
                      type="color"
                      id="font-color"
                      name="font-color"
                      value={fontColor || '#000000'}
                      onChange={handleColorChange}
                    >
                    </input>
                  </div>
                  <div className="mr-2">
                    <span>
                      {fontColor || '#000000'}
                    </span>
                  </div>
                </div>
              </FormGroup>
            </ToggleBox>

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
                <div className="flex items-center">
                  <div>将水印</div>
                  <div className="mx-4 pb-1">
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
                  </div>
                  <div>缩放至</div>
                  <div className="mx-2">
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
                  <div>{scaleType === 'pixel' ? 'px' : '%'}</div>
                </div>
                <div className="mt-1 text-xs text-gray-500 leading-relaxed">
                  不包含区域填充的部分
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
                  labelText="水平"
                  value="repeat-x"
                />
                <RadioButton
                  id="watermark-repeat-y"
                  labelText="垂直"
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
                <div>
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
                <div>
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
