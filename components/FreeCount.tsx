"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { MAX_FREE_LIMIT } from '@/constants'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
import { Progress } from './ui/progress'
import { apiCountProps } from './Sidebar'
import { useProModel } from '@/hooks/use-pro-model'


const FreeCount = ({apiLimitCount = 0 , isPro = false}:apiCountProps) => {
  const proModel = useProModel()
    const [mounted , setMounted] = useState(false)

    useEffect(()=>{
    setMounted(true)
    },[])

    if(!mounted){
        return
    }

    if(isPro){
      return null
    }

  return (
    <div className="px-3">
       <Card className="bg-white/10 w-full border-0">
           <CardContent className='py-6'>
              <div className="text-center space-y-2 text-sm text-white mb-4">
                <p>
                 {apiLimitCount} / {MAX_FREE_LIMIT} Free Generations
                </p>
                <Progress className="h-3" value={(apiLimitCount/MAX_FREE_LIMIT)*100}/>
              </div>
              <Button onClick={proModel.onOpen} className="w-full" variant="premium">
                    Upgrade
                    <Zap className="h-4 w-4 ml-2 fill-white"/>
                </Button>
           </CardContent>
       </Card>
    </div>
  )
}

export default FreeCount
