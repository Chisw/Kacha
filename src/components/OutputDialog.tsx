import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Loading } from 'carbon-components-react'
import { IWatermark } from '../ts/type'
import { range } from 'lodash'
import FileSaver from 'file-saver'
import IOTable from './IOTable'
import { getBytesSize } from '../ts/utils'
import { DateTime } from 'luxon'

interface OutputDialogProps {
  version: number,
  open: boolean
  onClose: () => void
  watermarkList: IWatermark[]
}

export default function OutputDialog(props: OutputDialogProps) {
  const {
    version,
    open,
    onClose,
    watermarkList,
  } = props

  const [selectedIndex, setSelectedIndex] = useState<number[]>([])
  const [selectedJSON, setSelectedJSON] = useState('')
  const [isOutputting, setIsOutputting] = useState(false)

  useEffect(() => {
    const json = JSON.stringify(watermarkList.filter((w, i) => selectedIndex.includes(i)))
    setSelectedJSON(json)
  }, [selectedIndex, watermarkList])

  useEffect(() => {
    setSelectedIndex(range(watermarkList.length))
  }, [watermarkList])

  const handleOutput = useCallback(async () => {
    setIsOutputting(true)
    const blob = new Blob([selectedJSON], { type: "text/plain;charset=utf-8" })
    await FileSaver.saveAs(blob, `kacha.jisuowei.com_v${version}_${DateTime.fromMillis(Date.now()).toFormat('yyyyMMdd_HHmmss')}.kacha`)
    setIsOutputting(false)
    onClose()
  }, [onClose, selectedJSON, version])

  return (
    <>
      <Modal
        open={open}
        size="sm"
        className="export-modal"
        modalHeading="导出水印配置"
        primaryButtonText={`导出 ${selectedIndex.length} 枚水印（${selectedIndex.length ? getBytesSize(selectedJSON.length) : '0'}）`}
        primaryButtonDisabled={!selectedIndex.length}
        secondaryButtonText="取消"
        onRequestClose={onClose}
        onRequestSubmit={handleOutput}
      >
        <IOTable
          name="output"
          watermarkList={watermarkList}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        {isOutputting && (
          <div className="absolute inset-0 z-20 bg-white-600 bg-hazy-25 flex justify-center items-center">
            <Loading withOverlay={false} />
          </div>
        )}
      </Modal>

      <style>
        {`
          .export-modal .bx--data-table-container {
            padding-top: 0;
          }
          .export-modal .bx--data-table thead tr th:nth-child(2) {
            width: 120px;
          }
        `}
      </style>
    </>
  )
}