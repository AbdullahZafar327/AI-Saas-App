"use client"
import React ,{useState , useEffect} from 'react'
import Sidebar, { apiCountProps } from './Sidebar'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from "lucide-react";

const MobileSidebar = ({apiLimitCount= 0 , isPro = false}:apiCountProps) => {
    const [isMounted , setIsMounted]= useState(false)

    useEffect(()=>{
      setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

  return (
    <Sheet>
        <SheetTrigger>
        <Button variant="ghost" className="md:hidden">
            <Menu/>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
