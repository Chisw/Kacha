import React from 'react'
import blueprint from './images/blueprint.svg'
import 'element-theme-default'
import './App.css'
import Manager from './components/Manager'
import Icons from './images/icons'

export default function App() {
  return (
    <>
      <div
        className="min-h-screen pt-12 px-4 bg-center flex flex-col"
        style={{ backgroundImage: `url(${blueprint}), linear-gradient(0, rgba(74, 85, 104), rgba(0, 0, 0))` }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-white text-4xl font-bold">水印大师</h2>
          <div className="text-white">
            <a href="https://github.com/Chisw/Watermark" target="_blank" className="opacity-25 hover:opacity-75 transition-all duration-200" rel="noopener noreferrer">
              <Icons.Github size={24} />
            </a>
          </div>
        </div>
        <div className="container mx-auto mt-8 flex-grow">
          <Manager />
        </div>
        <div className="container mx-auto py-4 text-white text-xs opacity-50">
          <p>https://watermark.jisuowei.com</p>
          <p>http://w.jsw.im</p>
        </div>
      </div>
    </>
  )
}
