import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className="relative h-8 w-8 animate-spin">
          <Image
          fill
          alt="spinner"
          src="/logo.png"
          />
        </div>
        <p className="text-muted-foreground text-sm">
            Genius is Thinking...
        </p>
    </div>
  )
}

export default Loader
