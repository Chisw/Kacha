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
        <div className="container mx-auto">
          <h2 className="text-white text-3xl font-bold">水印大师</h2>
        </div>
        <div className="container mx-auto mt-8 flex flex-grow">
          <div className="mr-8 w-64">
            <Manager />
          </div>
          <div className="flex-grow border-2 border-dashed rounded-lg">
            <div className="container h-128">
              <div className="w-full h-full flex flex-col">
                <div className="h-3/5 flex flex-row">
                  <div className="w-2/3 h-full bg-red-300"></div>
                  <div className="w-1/3 h-full bg-green-300"></div>
                </div>
                <div className="h-2/5 bg-blue-300"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto text-white text-xs">
          <p>https://watermark.jisuowei.com</p>
          <p>http://w.jsw.im</p>
        </div>
      </div>

    </>
  )
}

export default App
