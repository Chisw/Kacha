import React, { useState } from 'react'
import { Modal, Tabs, Tab } from 'carbon-components-react'
import WatermarkSetting from './WatermarkSetting'
import ExportSetting from './ExportSetting'
import { IWatermark, IExportSetting } from '../../ts/type'

interface EditorDialogProps {
  open: boolean
  onClose: () => void
  watermarkId?: string
}

export default function EditorDialog(props: EditorDialogProps) {

  const {
    open,
    onClose,
    watermarkId = '',
  } = props

  const [watermark, setWatermark] = useState<IWatermark>({
    id: '44m9a8',
    type: 'image',
    src: 'jisuowei.com',
    text: '',
    position: 'bottom-right',
    scaleType: 'none',
    scalePixel: 200,
    scalePercent: 20,
    offsetType: 'none',
    offsetPixelX: 20,
    offsetPixelY: 20,
    offsetPercentX: 5,
    offsetPercentY: 5,
    repeat: 'none',
    opacity: 1,
    rotate: 0,
    font: '',
  })
  const [exportSetting, setExportSetting] = useState<IExportSetting>({
    format: 'origin',
    quality: 92,
    scaleType: 'none',
    scalePixel: 1080,
    scalePercent: 80,
    saveEXIF: false,
  })

  return (
    <>
      <Modal
        open={open}
        size="lg"
        modalHeading={watermarkId ? '编辑' : '创建'}
        primaryButtonText="保存"
        secondaryButtonText="取消"
        onRequestClose={onClose}
      >
        <div className="pt-4">
          <Tabs>
            <Tab label="水印设置">
              <WatermarkSetting
                watermark={watermark}
                setWatermark={setWatermark}
              />
            </Tab>
            <Tab label="导出设置">
              <ExportSetting
                exportSetting={exportSetting}
                setExportSetting={setExportSetting}
              />
            </Tab>
          </Tabs>
        </div>
      </Modal>
      <style>
        {`
          .bx--modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0;
            padding-top: 0;
            width: 100%;
          }
          .bx--modal-header .bx--modal-close {
            position: static;
          }
          .bx--modal-content {
            margin-bottom: 0;
            padding: 0 1rem;
            width: 100%;
            background-color: #fff;
          }
        `}
      </style>
    </>
  )
}