"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Button } from './ui/button'

const font = Montserrat({
    weight:'600',
    subsets: ["latin"]
})

const LandingNavbar = () => {
    const { isSignedIn } = useAuth()
  return (
    <nav className="flex items-center justify-between bg-transparent p-4">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
           <Image src="/logo.png" fill alt="logo"/>
        </div>
        <h1 className={cn("font-bold text-2xl text-white", font.className)}>
            AI GENIUS
        </h1>
      </Link>
      <div className='flex items-center gap-x-2'>
       <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className='rounded-full'>
             {isSignedIn ? " Get Started" : "sign up"}
          </Button>
       </Link>
      </div>
    </nav>
  )
}

export default LandingNavbar
