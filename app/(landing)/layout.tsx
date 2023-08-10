import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="h-full bg-[#111827] overflow-auto">
      <div className="h-full max-w-screen-xl mx-auto w-full">
        {children}
      </div>
    </div>
  )
}

export default layout
