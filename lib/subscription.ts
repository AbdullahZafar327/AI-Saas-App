import { auth } from "@clerk/nextjs";
import ConnectedToDb from "./mongodb";
import UserSubscriptionModel from "@/models/UserSubscription";
import { NextResponse } from "next/server";

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () =>{
  const {userId} = auth()
  await ConnectedToDb()

  try {
    if(!userId){
        return false
    }

    const UserSubscription = await UserSubscriptionModel.findOne({userId},{
        stripeCustomerId:true,
        stripeCurrentPeriodEnd:true,
        stripePriceId:true,
        stripeSubscriptionId:true
    })

    if(!UserSubscription){
        return false
    }

    const isValid = UserSubscription.stripePriceId && UserSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    return !!isValid
  } catch (error) {
    console.log("[SUBSCRIPTION_ERROR]",error)
  }
}