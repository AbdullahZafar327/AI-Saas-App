"use client"
import React from 'react'
import { MessageSquare , ArrowRight , Code , ImageIcon} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {useRouter} from 'next/navigation'

const tools = [
    {
        label:'Conversation',
        icon: MessageSquare,
        href:"/conversation",
        color:'text-violet-500',
        bgColor: 'bg-violet-500/10'
    },

    {
        label:'Image Generation',
        icon: ImageIcon,
        href:"/image",
        color:'text-pink-700',
        bgColor: 'bg-pink-700/10'
    },

    {
        label:'Code Generation',
        icon: Code,
        href:"/code",
        color:'text-green-700',
        bgColor: 'bg-green-700/10'
    },
]
const page = () => {
    const router = useRouter()
  return (
    <div>
     <div className="mb-8 space-y-4">
        <h2 className="font-bold text-2xl sm:text-4xl text-center ">
            Explore the power of AI
        </h2>
        <p className="font-light text-center text-muted-foreground text-sm md:text-lg ">
            Chat with smartest AI - Experience the power of AI
        </p>
     </div>

     <div className='px-4 md:px-20 lg:px-32 space-y-4'>
       {tools.map((tool)=>(
       <Card  onClick={()=> router.push(tool.href)} className="flex hover:shadow-md p-4 border-black/5 items-center justify-between cursor-pointer transition " key={tool.href}>
          <div className="flex items-center gap-x-4">
            <div className={cn("w-fit rounded-md" , tool.bgColor)}>
            <tool.icon className={cn("h-8 w-8", tool.color)}/>
            </div>
            <div className="font-semibold">
                 {tool.label}
            </div>
          </div>
          <ArrowRight/>
       </Card>
       ))}
     </div>
    </div>
  )
}

export default page

