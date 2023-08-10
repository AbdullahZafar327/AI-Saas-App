import Heading from '@/components/Heading'
import SubscriptionButton from '@/components/SubscriptionButton'
import { checkSubscription } from '@/lib/subscription'
import { Settings } from 'lucide-react'
import React from 'react'

const page = async () => {
  const isPro = await checkSubscription() || false
  return (
    <div>
      <Heading title="Setting" description='manage your account settings' color="text-gray-700" icon={Settings} bgColor='bg-gray-700/10'/>
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "you are on Premium plan." : "you are on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro}/>
      </div>
    </div>
  )
}

export default page
