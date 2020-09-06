import React from 'react'
import blueprint from './images/blueprint.svg'
import 'element-theme-default'
import './App.css'
import Manager from './components/Manager'

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
            <Manager />
          </div>
          <div className="flex-grow border-2 border-dashed rounded-lg">

          </div>
        </div>
        <div className="text-white text-xs">
          <p>https://watermark.jisuowei.com</p>
          <p>http://w.jsw.im</p>
        </div>
      </div>
    </>
  )
}

export default App
