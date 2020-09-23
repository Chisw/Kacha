import React, { useState, useEffect } from 'react'
import { Modal, Tabs, Tab } from 'carbon-components-react'
import WatermarkSetting from './WatermarkSetting'
import ExportSetting from './ExportSetting'
import { IWatermark, IExportSetting } from '../../ts/type'
import { EMPTY_WATERMARK } from '../../ts/constant'

interface EditorDialogProps {
  open: boolean
  onClose: () => void
  watermark?: IWatermark
}

export default function EditorDialog(props: EditorDialogProps) {

  const {
    open,
    onClose,
    watermark = EMPTY_WATERMARK,
  } = props

  const [tabIndex, setTabIndex] = useState(0)
  const [watermarkCache, setWatermarkCache] = useState<IWatermark>(Object.assign({}, watermark))
  const [exportSetting, setExportSetting] = useState<IExportSetting>(Object.assign({}, watermark.exportSetting))

  console.log('watermark', watermark, watermarkCache)

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
        size="lg"
        className="editor-dialog"
        modalHeading={watermarkCache.id ? '编辑' : '创建'}
        primaryButtonText="保存"
        secondaryButtonText="取消"
        onSecondarySubmit={onClose}
      >
        <div>
          <Tabs selected={tabIndex} onSelectionChange={index => setTabIndex(index)}>
            <Tab label="水印设置">
              <WatermarkSetting
                watermark={watermarkCache}
                setWatermark={setWatermarkCache}
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