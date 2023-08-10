import { stripe } from "@/lib/stripe";
import ConnectedToDb from "@/lib/mongodb";
import UserSubscriptionModel from "@/models/UserSubscription";
import { auth , currentUser } from '@clerk/nextjs'
import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";

const settingUrl = absoluteUrl("/settings")

export const GET  = async (req:Request) =>{
   const {userId} = auth()
   const user = await currentUser()
   await ConnectedToDb()

   try {
    if(!userId || !user){
        return new NextResponse("UnAuthorized user" , {status: 401})
    }

    const UserSubscription = await UserSubscriptionModel.findOne({userId})
//  **if user is already subscribed to stripe **
    if(UserSubscription && UserSubscription.stripeCustomerId){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: UserSubscription.stripeCustomerId,
            return_url: settingUrl
        })

        return new NextResponse(JSON.stringify({url: stripeSession.url}))
    }
// ** if user is not subscribed to stripe **
 
const stripeSession = await stripe.checkout.sessions.create({
    success_url:settingUrl ,
    cancel_url: settingUrl,
    payment_method_types : ["card"],
    mode:"subscription",
    billing_address_collection:"auto",
    customer_email: user.emailAddresses[0].emailAddress,
    line_items:[
        {
            price_data:{
                currency:'USD',
                product_data:{
                    name: "AI GENIUS",
                    description:"unlimited AI Generation"
                },
                unit_amount:2000,
                recurring: {
                    interval:"month"
                }
            },
            quantity: 1 ,
        }
    ],
    metadata:{
        userId
    }
})

return new NextResponse(JSON.stringify({url: stripeSession.url}))

   } catch (error) {
    console.log("[STRIPE_ERROR]", error)
    return new NextResponse("internal Error", {status: 500})
   }
}