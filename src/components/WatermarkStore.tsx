import React, { useState, useEffect } from 'react'
import { IWatermark } from '../ts/type'

export default function WatermarkStore() {

  const [storeList, setStoreList] = useState<IWatermark[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    window.fetch(`https://kacha.jisuowei.com/kacha.store.json`)
      .then(res => res.json())
      .then(data => {
        setStoreList(data)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className="relative">
         {loading && <span>loading</span> }
      </div>
    </>
  )
}
