import Image from 'next/image'
import React from 'react'

interface EmptyProps{
    label:string
}

const Empty = ({label}:EmptyProps) => {
  return (
    <div className="h-full flex p-20 flex-col items-center justify-center">
        <div className="h-72 w-72 relative">
              <Image
              fill
              alt='empty'
              src="/empty.png"
              />
        </div>
        <p className="text-muted-foreground text-sm">
            {label}
        </p>
    </div>
  )
}

export default Empty
