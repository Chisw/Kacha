import React, { useState, useEffect } from 'react'
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

  const [tabIndex, setTabIndex] = useState(0)

  const [watermark, setWatermark] = useState<IWatermark>({
    id: '44m9a8',
    type: 'image',
    theme: 'light',
    src: '',
    text: 'jisuowei.com',
    position: 'bottom-right',
    scaleType: 'none',
    scalePixel: 200,
    scalePercent: 20,
    offsetType: 'none',
    offsetPixelX: 20,
    offsetPixelY: 20,
    offsetPercentX: 5,
    offsetPercentY: 5,
    repeat: 'no-repeat',
    opacity: 100,
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

  useEffect(() => {
    if (open) {
      setTabIndex(0)
      const wrapper = document.querySelector('.editor-dialog .bx--modal-content')
      wrapper && wrapper.scrollTo({ top: 0 })
    }
  }, [open])

  useEffect(() => {
    const closeButton = document.querySelector('.editor-dialog .bx--modal-close')
    if (closeButton) {
      closeButton.addEventListener('click', onClose)
    }
  }, [onClose])

  return (
    <>
      <Modal
        open={open}
        className="editor-dialog"
        modalHeading={watermarkId ? '编辑' : '创建'}
        primaryButtonText="保存"
        secondaryButtonText="取消"
        onSecondarySubmit={onClose}
      >
        <div>
          <Tabs selected={tabIndex} onSelectionChange={index => setTabIndex(index)}>
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
            padding-right: 0 !important;
            width: 100%;
          }
          .bx--modal-header .bx--modal-close {
            position: static;
          }
          .bx--modal-content {
            margin-bottom: 0;
            padding: 0 !important;
            width: 100%;
            background-color: #fff;
          }
          .bx--tabs {
            position: absolute;
            z-index: 1;
            top: 48px;
            left: 0;
            background: #f4f4f4;
          }
          .bx--tab-content {
            margin-top: 40px;
          }
        `}
      </style>
    </>
  )
}