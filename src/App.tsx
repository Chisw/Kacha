import React, { useState } from 'react'
import './App.scss'
import Layout from './components/Layout'
import WatermarkList from './components/WatermarkList'
import WatermarkMaker from './components/WatermarkMaker'
import { IWatermark } from './ts/type'

export default function App() {

  const [activeWatermark, setActiveWatermark] = useState<IWatermark | null>(null)

  return (
    <Layout>
      <div className="container mx-auto mt-10 flex-grow">
        <div className={activeWatermark ? 'block' : 'hidden'}>
          {activeWatermark && (
            <WatermarkMaker
              activeWatermark={activeWatermark}
              setActiveWatermark={setActiveWatermark}
            />
          )}
        </div>
        <div className={activeWatermark ? 'hidden' : 'block'}>
          <WatermarkList
            setActiveWatermark={setActiveWatermark}
          />
        </div>
      </div>
    </Layout>
  )
}
