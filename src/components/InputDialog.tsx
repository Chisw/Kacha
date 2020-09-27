import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Loading, FileUploaderDropContainer, Button, Tag } from 'carbon-components-react'
import { IWatermark } from '../ts/type'
import { range, get, isArray } from 'lodash'
import { Reset16 } from '@carbon/icons-react'
import { isWatermark, getShortId, getBytesSize } from '../ts/utils'
import Local from '../ts/local'
import IOTable from './IOTable'

interface InputDialogProps {
  open: boolean
  onClose: () => void
  setWatermarkList: (list: IWatermark[]) => void
}

export default function InputDialog(props: InputDialogProps) {

  const {
    open,
    onClose,
    setWatermarkList,
  } = props

  const [uploadFile, setUploadFile] = useState<any>(null)
  const [inputError, setInputError] = useState('')
  const [inputWatermarkList, setInputWatermarkList] = useState<IWatermark[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number[]>([])
  const [selectedJSON, setSelectedJSON] = useState('')
  const [isInputting, setIsInputting] = useState(false)

  useEffect(() => {
    setUploadFile(null)
  }, [open])

  useEffect(() => {
    const json = JSON.stringify(inputWatermarkList.filter((w, i) => selectedIndex.includes(i)))
    setSelectedJSON(json)
  }, [selectedIndex, inputWatermarkList])

  useEffect(() => {
    setSelectedIndex(range(inputWatermarkList.length))
  }, [inputWatermarkList])

  useEffect(() => {
    if (uploadFile) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        try {
          const data: IWatermark[] = JSON.parse(e.target.result)
          if (isArray(data) && data[0] && isWatermark(data[0])) {
            setInputWatermarkList(data)
          } else {
            setInputError('啊哦，出错了')
          }
        } catch(error) {
          setInputError('啊哦，出错了')
        }
      }
      reader.readAsText(uploadFile)
    } else {
      setInputWatermarkList([])
    }
  }, [uploadFile])

  const handleInput = useCallback(async () => {
    setIsInputting(true)
    const existList: IWatermark[] = await Local.getList() || []
    const newList: IWatermark[] = inputWatermarkList
      .filter((w, i) => selectedIndex.includes(i))
      .map(w => Object.assign(w, { id: getShortId(), title: `${w.title}-导入` }))
    const concatList = await Local.setList([...newList, ...existList])
    setWatermarkList(concatList)
    setIsInputting(false)
    setUploadFile(null)
    onClose()
  }, [inputWatermarkList, selectedIndex, onClose, setWatermarkList])

  return (
    <>
      <Modal
        open={open}
        size="sm"
        className="export-modal"
        modalHeading="导入水印配置"
        primaryButtonText={`导入 ${selectedIndex.length} 枚水印（${selectedIndex.length ? getBytesSize(selectedJSON.length) : '0'}）`}
        primaryButtonDisabled={!selectedIndex.length}
        secondaryButtonText="取消"
        onRequestClose={onClose}
        onRequestSubmit={handleInput}
      >
        {uploadFile ? (
          <div className="flex items-center">
            <div className="flex-grow px-4 truncate">
              <span className="mr-2">{uploadFile.name}</span>
              {inputError && <Tag type="red">{inputError}</Tag>}
            </div>
            <Button renderIcon={Reset16} onClick={() => setUploadFile(null)}>重选</Button>
          </div>
        ) : (
          <div className="p-4">
            <FileUploaderDropContainer
              labelText="选择水印配置文件（*.kacha），或拖拽至此"
              accept={['.kacha']}
              onAddFiles={(e, content) => {
                const file: any = get(content, 'addedFiles[0]', null)
                setUploadFile(file)
              }}
            />
          </div>
        )}
        {(uploadFile && !inputError) && (
          <IOTable
            name="input"
            watermarkList={inputWatermarkList}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
        {isInputting && (
          <div className="absolute inset-0 z-20 bg-white-600 bg-hazy-25 flex justify-center items-center">
            <Loading withOverlay={false} />
          </div>
        )}
      </Modal>
    </>
  )
}