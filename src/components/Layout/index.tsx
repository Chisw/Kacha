import React from 'react'
import Header from './Header'
import Footer from './Footer'
import blueprint from '../../images/blueprint.svg'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <div
        className="min-h-screen pt-12 px-4 bg-center flex flex-col"
        style={{ backgroundImage: `url(${blueprint}), linear-gradient(0, rgba(74, 85, 104), rgba(0, 0, 0))` }}
      >
        <Header />
        {props.children}
        <Footer />
      </div>
    </>
  )
}