import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle , DialogContent, DialogDescription, DialogFooter  } from './ui/dialog'
import { useProModel } from '@/hooks/use-pro-model'
import { Badge } from './ui/badge'
import { MessageSquare , Code , ImageIcon, Check, Zap} from 'lucide-react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import axios from 'axios'

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
const ProModel = () => {
    const proModel = useProModel()
    const [loading , setLoading] = useState(false)

    const onSubscribe = async () =>{
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')
            window.location.href = await response.data.url
        } catch (error) {
            console.log(error , "[STRIPE_CLIENT_ERROR]")
        }finally{
            setLoading(false)
        }
    }
  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
        <DialogContent >
            <DialogHeader>
                <DialogTitle className='flex justify-center items-center flex-col gap-y-4 mb-2'>
                     <div className="flex items-center gap-x-2 py-1 font-bold ">
                     Upgrade to Premium
                        <Badge variant="premium" className="text-sm uppercase py-1">
                            Pro
                        </Badge>
                     </div>
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-900 font-medium pt-2 space-y-2">
                   {tools.map((tool)=>(
                    <Card key={tool.label} className="bg-black/5 p-3 flex items-center justify-between">
                         <div className="flex items-center gap-x-4">
                           <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                             <tool.icon className={cn("h-6 w-6", tool.color)} />
                           </div>
                           <div className="font-semibold text-sm">
                            {tool.label}
                           </div>
                         </div>
                         <Check className="text-sm h-4 w-4"/>
                    </Card>
                   ))}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={onSubscribe} size="lg" variant="premium" className="w-full ">
                    Upgrade 
                    <Zap className="h-4 w-4 ml-2 fill-white"/>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ProModel
