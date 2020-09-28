import React, { useCallback, useState } from 'react'
import Icons from '../images/icons'
import { DEFAULT_WATERMARK_LIST, PREVIEW_WIDTH_SM, PREVIEW_HEIGHT_SM, EMPTY_WATERMARK } from '../ts/constant'
import { Button, Loading, Modal } from 'carbon-components-react'
import EditorDialog from './EditorDialog'
import Preview from './Preview'
import { Export16, Download16, Home16, Add16 } from '@carbon/icons-react'
import { useAsync } from 'react-use'
import { IWatermark } from '../ts/type'
import Local from '../ts/local'
import { getShortId } from '../ts/utils'
import OutputDialog from './OutputDialog'
import InputDialog from './InputDialog'

const HOVER_CLASS = 'flex justify-center items-center hover:bg-white-300 transition-all duration-300 active:duration-75 active:bg-transparent cursor-pointer'

interface WatermarkListProps {
  setActiveWatermark: (watermark: IWatermark) => void
}

type operateType = 'copy' | 'delete'

export default function WatermarkList(props: WatermarkListProps) {
  const {
    setActiveWatermark,
  } = props

  const [loaded, setLoaded] = useState(false)
  const [watermarkList, setWatermarkList] = useState<IWatermark[]>([])
  const [operateWatermark, setOperateWatermark] = useState<IWatermark>(EMPTY_WATERMARK)
  const [editorOpen, setEditorOpen] = useState(false)
  const [operateType, setOperateType] = useState<operateType>('copy')
  const [operateOpen, setOperateOpen] = useState(false)
  const [outputOpen, setOutputOpen] = useState(false)
  const [inputOpen, setInputOpen] = useState(false)
  const [operating, setOperating] = useState(false)

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

  const handleOperate = useCallback((watermark: IWatermark, type: operateType) => {
    setOperateWatermark(watermark)
    setOperateType(type)
    setOperateOpen(true)
  }, [])

  return (
    <>
      {!loaded && <Loading />}

      <div className="pb-8 flex justify-between items-center">
        <div className="button-list">
          <Button size="small" renderIcon={Home16}>水印屋</Button>
          <Button size="small" renderIcon={Add16} kind="secondary" onClick={handleAdd}>创建水印</Button>
          <Button size="small" renderIcon={Download16} kind="secondary" onClick={() => setOutputOpen(true)}>导出水印配置</Button>
          <Button size="small" renderIcon={Export16} kind="secondary" onClick={() => setInputOpen(true)}>导入水印配置</Button>
        </div>
        <div className="text-gray-400">
          &times;{watermarkList.length}
        </div>
      </div>

      <div className="flex flex-wrap -mx-4">
        
        {watermarkList.map(watermark => {
          const { id, title } = watermark
          return (
            <div
              key={id}
              className="mb-8 px-4 w-1/2 md:w-1/3 lg:w-1/5"
            >
              <div className="watermark-wrapper relative h-40 overflow-hidden shadow-lg">
                <div className="absolute inset-0">
                  <Preview watermark={watermark} />
                </div>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 flex flex-col bg-black-800 bg-hazy-50 transition-all duration-200 border border-solid border-gray-800">
                  <div
                    className={`flex-grow ${HOVER_CLASS} text-white text-sm border-b border-solid border-gray-800`}
                    onClick={() => setActiveWatermark(watermark)}
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
                      onClick={() => handleOperate(watermark, 'copy')}
                    >
                      <Icons.Duplicate />
                    </div>
                    <div
                      className={`py-2 flex-grow ${HOVER_CLASS} text-red-600`}
                      onClick={() => handleOperate(watermark, 'delete')}
                    >
                      <Icons.Delete />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-white text-sm text-center truncate text-gray-300 font-bold">
                {title || <span className="text-gray-600">[未命名]</span>}
              </div>
            </div>
          )
        })}

        <div className="mb-8 px-4 w-1/2 md:w-1/3 lg:w-1/5">
          <div
            className={`h-40 bg-gray-900 border-2 border-dashed flex justify-center items-center text-white text-6xl cursor-pointer
              opacity-25 hover:opacity-50 transition-all duration-200 bg-hazy-100 active:duration-75 active:opacity-25`}
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
        open={operateOpen}
        className="operate-dialog"
        size="xs"
        modalHeading={`${operateType === 'copy' ? '拷贝' : '删除' }该水印`}
        danger={operateType === 'delete'}
        primaryButtonText="确定"
        secondaryButtonText="取消"
        onRequestClose={() => setOperateOpen(false)}
        onRequestSubmit={async () => {
          setOperating(true)
          let list: IWatermark[] = []
          if (operateType === 'copy') {
            const newWatermark = Object.assign({}, operateWatermark, { id: getShortId(), title: `${operateWatermark.title}-拷贝`.slice(-32) })
            list = await Local.updateList(newWatermark)
          } else if (operateType === 'delete') {
            list = await Local.updateList(undefined, operateWatermark.id)
          }
          setWatermarkList(list)
          setOperating(false)
          setOperateOpen(false)
        }}
      >
        <div className="px-4 py-6 flex justify-center">
          <div>
            <div className="shadow-lg" style={{ width: PREVIEW_WIDTH_SM, height: PREVIEW_HEIGHT_SM }}>
              {operateWatermark && <Preview watermark={operateWatermark} />}
            </div>
            <div className="mt-4 mx-auto w-48 text-center truncate font-bold">
              {operateWatermark.title || <span className="text-gray-600">[未命名]</span>}
            </div>
          </div>
        </div>
        {operating && (
          <div className="absolute inset-0 z-20 bg-white-600 bg-hazy-25 flex justify-center items-center">
            <Loading withOverlay={false} />
          </div>
        )}
      </Modal>

      <OutputDialog
        open={outputOpen}
        onClose={() => setOutputOpen(false)}
        watermarkList={watermarkList}
      />

      <InputDialog
        open={inputOpen}
        onClose={() => setInputOpen(false)}
        setWatermarkList={setWatermarkList}
      />

      <style>
        {`
          .button-list button {
            margin-right: 1px;
            margin-bottom: 1px;
          }
          .bx--inline-loading {
            display: inline-block;
            width: auto;
          }
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
          .bx--file-browse-btn {
            max-width: none;
          }
          .bx--file-browse-btn .bx--file__drop-container {
            min-height: 12rem;
          }
          .bx--file-browse-btn .bx--file__drop-container:hover {
            opacity: .75;
          }
        `}
      </style>
      
    </>
  )
}