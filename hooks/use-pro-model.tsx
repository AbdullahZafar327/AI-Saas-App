import { create } from 'zustand'

interface ProModeStore {
    isOpen: boolean,
    onOpen: ()=> void,
    onClose: () => void
}

export const useProModel = create<ProModeStore>((set)=> ({
   isOpen: false,
   onOpen : () => set({isOpen: true}),
   onClose: () => set({isOpen:false})
}))