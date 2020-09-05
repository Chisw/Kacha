import React from 'react'
import { Button } from 'element-react'
import blueprint from './images/blueprint.svg'
import 'element-theme-default'
import './App.css'

function App() {
  return (
    <>
      <div
        className="absolute inset-0 p-12 bg-center flex flex-col"
        style={{ backgroundImage: `url(${blueprint}), linear-gradient(0, rgba(10, 37, 110), rgba(5, 20, 55))` }}
      >
        <div>
          <h2 className="text-white text-3xl font-bold">水印大师</h2>
        </div>
        <div className="mt-8 flex flex-grow">
          <div className="mr-8 w-64">
            <Button type="primary" icon="plus" size="large">创建水印项</Button>
          </div>
          <div className="flex-grow border-2 border-dashed rounded-lg">

          </div>
        </div>
      </div>
    </>
  )
}

export default App
