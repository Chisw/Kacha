import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Tabs, Tab, Loading } from 'carbon-components-react'
import WatermarkSetting from './WatermarkSetting'
import ExportSetting from './ExportSetting'
import { IWatermark } from '../../ts/type'
import { getShortId } from '../../ts/utils'
import Local from '../../ts/local'
import { EMPTY_WATERMARK } from '../../ts/constant'

interface EditorDialogProps {
  open: boolean
  watermark: IWatermark
  setWatermarkList: (list: IWatermark[]) => void
  onClose: () => void
}

export default function EditorDialog(props: EditorDialogProps) {

  const {
    open,
    watermark,
    setWatermarkList,
    onClose,
  } = props

  const [tabIndex, setTabIndex] = useState(0)
  const [watermarkCache, setWatermarkCache] = useState<IWatermark>(EMPTY_WATERMARK)
  const [submitting, setSubmitting] = useState(false)
  
  useEffect(() => {
    watermark && setWatermarkCache(Object.assign({}, watermark))
  }, [watermark])

  useEffect(() => {
    if (open) {
      setTabIndex(0)
      const wrapper = document.querySelector('.editor-dialog .bx--modal-content')
      wrapper && wrapper.scrollTo({ top: 0 })
    } else {
      setWatermarkCache(EMPTY_WATERMARK)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const closeButton = document.querySelector('.editor-dialog .bx--modal-close')
      if (closeButton) {
        closeButton.addEventListener('click', onClose)
      }
    }
  }, [open, onClose])

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    const id = watermarkCache!.id
    let list: IWatermark[] = []
    if (id) {  // update
      list = await Local.updateList(watermarkCache!, id)
    } else {  // create
      const newWatermark = Object.assign({}, watermarkCache, { id: getShortId() })
      list = await Local.updateList(newWatermark)
    }
    setWatermarkList(list)
    onClose()
    setSubmitting(false)
  }, [watermarkCache, onClose, setWatermarkList])

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
        onRequestSubmit={handleSubmit}
      >
        <div>
          <Tabs selected={tabIndex} onSelectionChange={index => setTabIndex(index)}>
            <Tab label="水印设置">
              <WatermarkSetting
                watermark={watermarkCache}
                setWatermark={setWatermarkCache}
              />
            </Tab>
            <Tab label="输出设置">
              <ExportSetting
                watermark={watermarkCache}
                setWatermark={setWatermarkCache}
              />
            </Tab>
          </Tabs>
        </div>
        {submitting && (
          <div className="absolute inset-0 z-20 bg-white-600 bg-hazy-25 flex justify-center items-center">
            <Loading withOverlay={false} />
          </div>
        )}
      </Modal>
      <style>
        {`
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
          .bx--btn--icon-only::before,
          .bx--btn--icon-only .bx--assistive-text {
            display: none !important;
          }
        `}
      </style>
    </>
  )
}
