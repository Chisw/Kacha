import React from 'react'
import { Modal, CodeSnippet } from 'carbon-components-react'
import { copy } from '../ts/utils'

interface ShareDialogProps {
  open: boolean
  onClose: () => void
}

export default function ShareDialog(props: ShareDialogProps) {
  const {
    open,
    onClose,
  } = props
  return (
    <>
      <Modal
        open={open}
        className="operate-dialog"
        size="xs"
        modalHeading="分享"
        onRequestClose={onClose}
      >
        <div className="px-4 py-6 overflow-hidden">
          <CodeSnippet onClick={() => copy('http://k.jsw.im')}>
            http://k.jsw.im
          </CodeSnippet>
          <CodeSnippet onClick={() => copy('https://kacha.jisuowei.com')}>
            https://kacha.jisuowei.com
          </CodeSnippet>
        </div>
      </Modal>
    </>
  )
}