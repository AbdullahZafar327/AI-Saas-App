import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { checkApiCount } from '@/lib/apiLimit'
import { checkSubscription } from '@/lib/subscription'
import React from 'react'

const layout = async ({children}:{children:React.ReactNode}) => {
  let apiLimitCount: number = await checkApiCount()  || 0
  const isPro = await checkSubscription() || false
  
  return (
    <div className="h-full relative">
       <div className="hidden md:flex md:flex-col space-y-4 md:inset-y-0 z-[80] bg-gray-900 h-full md:w-72 md:fixed">
            <Sidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
       </div>
       <div className="md:pl-72">
          <Navbar/>
           {children}
       </div>
    </div>
  )
}

export default layout
