import React, { useCallback, useState } from 'react'
import Icons from '../images/icons'
import { DEFAULT_WATERMARK_LIST, PREVIEW_WIDTH_SM, PREVIEW_HEIGHT_SM, EMPTY_WATERMARK } from '../ts/constant'
import { Button, Loading, Modal } from 'carbon-components-react'
import EditorDialog from './EditorDialog'
import Preview from './Preview'
import { Export16, Download16, Store16, Add16 } from '@carbon/icons-react'
import { useAsync } from 'react-use'
import { IWatermark } from '../ts/type'
import Local from '../ts/local'
import { getShortId } from '../ts/utils'

const HOVER_CLASS = 'flex justify-center items-center hover:bg-white-100 transition-all duration-300 active:duration-75 active:bg-transparent cursor-pointer'

interface WatermarkListProps {
  setActiveId: (id: string) => void
}

export default function WatermarkList(props: WatermarkListProps) {
  const {
    setActiveId,
  } = props

  const [loaded, setLoaded] = useState(false)
  const [watermarkList, setWatermarkList] = useState<IWatermark[]>([])
  const [operateWatermark, setOperateWatermark] = useState<IWatermark>(EMPTY_WATERMARK)
  const [editorOpen, setEditorOpen] = useState(false)
  const [copyOpen, setCopyOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useAsync(async () => {
    const list = await Local.getList()
    if (list) {
      setWatermarkList(list as IWatermark[])
      setLoaded(true)
    } else {
      await Local.setList(DEFAULT_WATERMARK_LIST)
      setWatermarkList(DEFAULT_WATERMARK_LIST)
      setLoaded(true)
    }
  }, [])

  const handleAdd = useCallback(() => {
    setOperateWatermark(EMPTY_WATERMARK)
    setEditorOpen(true)
  }, [])

  const handleWatermarkEdit = useCallback((watermark: IWatermark) => {
    setOperateWatermark(watermark)
    setEditorOpen(true)
  }, [])

  const handleEditorClose = useCallback(() => {
    setEditorOpen(false)
  }, [])

  const handleWatermarkCopy = useCallback((watermark: IWatermark) => {
    setOperateWatermark(watermark)
    setCopyOpen(true)
  }, [])

  const handleWatermarkDelete = useCallback((watermark: IWatermark) => {
    setOperateWatermark(watermark)
    setDeleteOpen(true)
  }, [])

  return (
    <>
      {!loaded && <Loading />}

      <div className="button-list pb-8">
        <Button size="small" renderIcon={Store16}>水印屋</Button>
        <Button size="small" renderIcon={Add16} kind="secondary" onClick={handleAdd}>创建水印</Button>
        <Button size="small" renderIcon={Download16} kind="secondary">导出水印</Button>
        <Button size="small" renderIcon={Export16} kind="secondary">导入水印</Button>
      </div>

      <div className="flex flex-wrap -mx-4">
        
        {watermarkList.map(watermark => {
          const { id, title } = watermark
          return (
            <div
              key={id}
              className="mb-6 px-4 w-1/2 md:w-1/3 lg:w-1/5"
            >
              <div className="watermark-wrapper relative h-40 overflow-hidden shadow-lg">
                <div className="absolute inset-0">
                  <Preview watermark={watermark} />
                </div>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 flex flex-col bg-black-500 bg-hazy-25 transition-all duration-200 border border-solid border-gray-800">
                  <div
                    className={`flex-grow ${HOVER_CLASS} text-white text-sm border-b border-solid border-gray-800`}
                    onClick={() => setActiveId(id)}
                  >
                    <span className="flex items-center">
                      <Icons.Tick size={20} />
                      <span className="ml-1">使用该水印</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div
                      className={`py-2 flex-grow ${HOVER_CLASS} text-white border-r border-solid border-gray-800`}
                      onClick={() => handleWatermarkEdit(watermark)}
                    >
                      <Icons.Edit />
                    </div>
                    <div
                      className={`py-2 flex-grow ${HOVER_CLASS} text-white border-r border-solid border-gray-800`}
                      onClick={() => handleWatermarkCopy(watermark)}
                    >
                      <Icons.Duplicate />
                    </div>
                    <div
                      className={`py-2 flex-grow ${HOVER_CLASS} text-red-600`}
                      onClick={() => handleWatermarkDelete(watermark)}
                    >
                      <Icons.Delete />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-white text-sm truncate text-gray-300">{title || <span className="text-gray-600">[未命名]</span>}</div>
            </div>
          )
        })}

        <div className="mb-8 px-4 w-1/2 md:w-1/3 lg:w-1/5">
          <div
            className={`h-40 bg-gray-900 border-2 border-dashed flex justify-center items-center text-white text-6xl cursor-pointer
              opacity-25 hover:opacity-75 transition-all duration-200 bg-hazy-100 active:duration-75 active:opacity-25`}
            onClick={handleAdd}
          >
            <Icons.Plus size={48} />
          </div>
        </div>

      </div>

      <EditorDialog
        open={editorOpen}
        watermark={operateWatermark}
        setWatermarkList={setWatermarkList}
        onClose={handleEditorClose}
      />

      <Modal
        open={copyOpen}
        className="copy-dialog"
        size="sm"
        modalHeading="复制该水印"
        primaryButtonText="确定"
        secondaryButtonText="取消"
        onRequestClose={() => setCopyOpen(false)}
        onRequestSubmit={async () => {
          const newWatermark = Object.assign({}, operateWatermark, { id: getShortId() })
          const list = await Local.updateList(newWatermark)
          setWatermarkList(list)
          setCopyOpen(false)
        }}
      >
        <div className="px-4 py-6">
          <div className="shadow-lg" style={{ width: PREVIEW_WIDTH_SM, height: PREVIEW_HEIGHT_SM }}>
            {operateWatermark && (
              <Preview watermark={operateWatermark} />
            )}
          </div>
        </div>
      </Modal>

      <Modal
        open={deleteOpen}
        className="delete-dialog"
        size="sm"
        modalHeading="删除该水印"
        primaryButtonText="确定"
        secondaryButtonText="取消"
        onRequestClose={() => setDeleteOpen(false)}
        onRequestSubmit={async () => {
          const list = await Local.updateList(undefined, operateWatermark.id)
          setWatermarkList(list)
          setDeleteOpen(false)
        }}
      >
        <div className="px-4 py-6">
          <div className="shadow-lg" style={{ width: PREVIEW_WIDTH_SM, height: PREVIEW_HEIGHT_SM }}>
            {operateWatermark && (
              <Preview watermark={operateWatermark} />
            )}
          </div>
        </div>
      </Modal>

      <style>
        {`
          .button-list button + button {
            margin-left: .5rem;
          }
        `}
      </style>
      
    </>
  )
}