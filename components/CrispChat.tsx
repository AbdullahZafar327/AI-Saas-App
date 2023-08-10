"use client"
import React, { useEffect } from 'react'
import {Crisp} from 'crisp-sdk-web'

const CrispChat = () => {
    useEffect(()=>{
    Crisp.configure("0adfd9cd-f70e-4c82-b94f-e99205ea690b")
    },[])
    
  return null
}

export default CrispChat
