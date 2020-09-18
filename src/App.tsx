import React, { useState } from 'react'
import './App.scss'
import Layout from './components/Layout'
import WatermarkList from './components/WatermarkList'
import WatermarkMaker from './components/WatermarkMaker'

export default function App() {

  const [activeId, setActiveId] = useState('')

  return (
    <Layout>
      <div className="container mx-auto mt-10 flex-grow">
        {activeId ? (
          <WatermarkMaker
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ) : (
          <WatermarkList
            setActiveId={setActiveId}
          />
        )}
      </div>
    </Layout>
  )
}
