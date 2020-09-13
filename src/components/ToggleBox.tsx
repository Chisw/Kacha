import React from 'react'

interface ToggleBoxProps {
  isOpen: boolean
  children: React.ReactNode,
  maxHeight?: number,
  className?: string
}

export default function ToggleBox(props: ToggleBoxProps) {

  const {
    isOpen,
    children,
    maxHeight = 360,
    className = '',
  } = props
  
  return (
    <div
      className={`${className} overflow-hidden transition-all duration-500 ease-in-out`}
      style={{ maxHeight: isOpen ? maxHeight : 0 }}
    >
      {children}
    </div>
  )

}