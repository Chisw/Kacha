import React from 'react'
import { Button, FileUploaderButton } from 'carbon-components-react'
import { Reset16 } from '@carbon/icons-react'
import { IWatermark } from '../ts/type'
import Preview from './Preview'

interface WatermarkMakerProps {
  activeWatermark: IWatermark
  setActiveWatermark: (watermark: IWatermark | null) => void
}

export default function WatermarkMaker(props: WatermarkMakerProps) {

  const {
    activeWatermark,
    setActiveWatermark,
  } = props

  return (
    <>
      <div className="flex items-start">
        <div className="w-64">
          <div className="pr-8 pb-4">
            <Preview watermark={activeWatermark} />
          </div>
          <Button
            size="small"
            renderIcon={Reset16}
            onClick={() => setActiveWatermark(null)}
          >
            重选
          </Button>
          <Button
            size="small"
            onClick={() => setActiveWatermark(null)}
          >
            开始运行
          </Button>
        </div>
        <div className="flex-grow">
          <FileUploaderButton
            labelText="选择文件夹"
            accept={['.jpeg', '.jpg', '.png']}
            onChange={() => { }}
          />
          <FileUploaderButton
            labelText="选择图片"
            accept={['.jpeg', '.jpg', '.png']}
            onChange={() => {}}
          />
        </div>
      </div>
    </>
  )
}