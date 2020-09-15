import React from 'react'
import Icons from '../../images/icons'

export default function Header() {
  return (
    <div className="container mx-auto flex justify-between items-center">
      <h2 className="text-white text-4xl font-bold">Kacha 咔嚓水印 - 开发中</h2>
      <div>
        <a href="https://github.com/Chisw/Watermark" target="_blank" className="text-white opacity-75 hover:opacity-100 transition-all duration-200" rel="noopener noreferrer">
          <Icons.Github size={32} />
        </a>
      </div>
    </div>
  )
}