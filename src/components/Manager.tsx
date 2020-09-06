import React from 'react'
import { Button } from 'element-react'
import { IMark } from '../ts/type'

const defaultMarkList: IMark[] = []

export default function Manager() {

  return (
    <>
      {defaultMarkList.map(mark => {
        return (
          <>
          </>
        )
      })}

      <Button type="primary" icon="plus" size="large">创建水印项</Button>
    </>
  )
}