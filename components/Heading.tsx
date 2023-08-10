import { cn } from '@/lib/utils'
import React from 'react'

interface HeadingProps {
    title: string , 
    description: string,
    icon : any , 
    color?:string,
    bgColor?:string
}
const Heading = ({title , description , icon : Icon , bgColor , color}: HeadingProps) => {
  return (
    <div className='px-3 lg:px-8 flex mb-8 gap-x-3 items-center'>
       <div className={cn("p-2 w-fit rounded-md" , bgColor)}>
        <Icon className={cn("h-8 w-8" , color)}/>
       </div>
       <div>
        <h2 className='text-3xl font-bold'>
               {title}
        </h2>
        <p className=" text-muted-foreground text-sm ">
            {description}
        </p>
       </div>
    </div>
  )
}

export default Heading
