import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import ConnectedToDb from "@/lib/mongodb";
import UserSubscriptionModel from "@/models/UserSubscription";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req:Request) =>{
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string;
    await ConnectedToDb()
    let event : Stripe.Event;

   try {
     event = stripe.webhooks.constructEvent(body , signature , process.env.STRIPE_WEBHOOK_SECRET!)

   } catch (error:any) {
     return new NextResponse(`webhook Error:${error.message}` ,{status:500})
   }

   const session = event.data.object as Stripe.Checkout.Session;


   //new user session
   if(event.type === "checkout.session.completed"){
    const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
    )

    if(!session?.metadata?.userId){
       return new NextResponse("user id is required",{status:400})
    }

    const newUserSubscription = new UserSubscriptionModel({
        userId: session?.metadata?.userId,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId : subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
        )
    })

    await newUserSubscription.save()
   }

  //existed user session
   if(event.type === 'invoice.payment_succeeded'){

    if(!session?.metadata?.userId){
      return new NextResponse("session id is required",{status:400})
    }
   
      
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    await UserSubscriptionModel.findByIdAndUpdate(
        { stripeSubscriptionId: subscription.id },
        {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        }
      );
   }


  return new NextResponse(null , {status:200})
}
