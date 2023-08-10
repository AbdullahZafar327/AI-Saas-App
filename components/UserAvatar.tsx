import React from 'react'
import { Avatar , AvatarImage } from './ui/avatar'
import { useUser } from '@clerk/nextjs'
import { AvatarFallback } from '@radix-ui/react-avatar'


const UserAvatar = () => {
    const { user } = useUser()
  return (
    <Avatar className="h-8 w-8">
       <AvatarImage src={user?.profileImageUrl} alt="user"/>
       <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
       </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
