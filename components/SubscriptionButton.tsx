"use client"
import React from 'react'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
import axios from 'axios'

interface subscriptionProps{
    isPro: boolean
}

const SubscriptionButton = ({isPro = false}: subscriptionProps) => {
    const SubscriptionHandler = async () =>{
      try {
        const response = await axios.get('/api/stripe')

        window.location.href = await response.data.url
      } catch (error) {
        console.log("BILLING_ERROR" , error)
      }
    }

  return (
      <Button variant={isPro ? "default" : "premium"} onClick={SubscriptionHandler}>
        {isPro ? "Manage subscription" : "Upgrade"}
        {!isPro && <Zap className='w-4 h-4 fill-white ml-2'/>}
      </Button>
  )
}

export default SubscriptionButton
