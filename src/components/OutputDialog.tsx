import React, { useState, useCallback, useEffect } from 'react'
import { Modal, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectAll, TableSelectRow, Loading } from 'carbon-components-react'
import { IWatermark } from '../ts/type'
import Preview from './Preview'
import { range } from 'lodash'
import FileSaver from 'file-saver'

interface OutputDialogProps {
  open: boolean
  onClose: () => void
  watermarkList: IWatermark[]
}

export default function OutputDialog(props: OutputDialogProps) {
  const {
    open,
    onClose,
    watermarkList,
  } = props

  const [selectedIndex, setSelectedIndex] = useState<number[]>([])
  const [isOutputting, setIsOutputting] = useState(false)

  useEffect(() => {
    setSelectedIndex(range(watermarkList.length))
  }, [watermarkList])

  const handleSelectAll = useCallback(() => {
    setSelectedIndex(selectedIndex.length ? [] : range(watermarkList.length))
  }, [selectedIndex, watermarkList])

  const handleSelectRow = useCallback((index: number) => {
    const isIncluded = selectedIndex.includes(index)
    const list = isIncluded
      ? selectedIndex.filter(i => i !== index)
      : [...selectedIndex, index]
    setSelectedIndex(list)
  }, [selectedIndex])

  const handleOutput = useCallback(async () => {
    setIsOutputting(true)
    const json = JSON.stringify(watermarkList.filter((w, i) => selectedIndex.includes(i)))
    const blob = new Blob([json], { type: "text/plain;charset=utf-8" })
    await FileSaver.saveAs(blob, `${Date.now()}.kacha`)
    setIsOutputting(false)
    onClose()
  }, [onClose, selectedIndex, watermarkList])

  return (
    <>
      <Modal
        open={open}
        size="sm"
        className="export-modal"
        modalHeading="导出水印配置"
        primaryButtonText={`导出 ${selectedIndex.length} 枚水印`}
        primaryButtonDisabled={!selectedIndex.length}
        secondaryButtonText="取消"
        onRequestClose={onClose}
        onRequestSubmit={handleOutput}
      >
        <div className="bg-white">
          <DataTable rows={[]} headers={[]}>
            {() => {
              return (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableSelectAll
                          id="select-all-output"
                          name="select-all-output"
                          checked={selectedIndex.length === watermarkList.length}
                          onSelect={handleSelectAll}
                        />
                        <TableHeader>预览</TableHeader>
                        <TableHeader>标题</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {watermarkList.map((w, index) => (
                        <TableRow key={w.id} >
                          <TableSelectRow
                            id={`select-row-${index}-output`}
                            name={`select-row-${index}-output`}
                            ariaLabel=""
                            checked={selectedIndex.includes(index)}
                            onSelect={() => handleSelectRow(index)}
                          />
                          <TableCell>{<div className="w-20"><Preview watermark={w} /></div>}</TableCell>
                          <TableCell>{w.title}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            }}
          </DataTable>
        </div>
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