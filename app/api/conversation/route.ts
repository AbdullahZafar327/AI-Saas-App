import { Configuration, OpenAIApi } from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const POST = async (req: Request) => {
  const { userId } = auth();
  const body = await req.json();
  const { messages } = body;

  try {
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!configuration.apiKey)
      return new NextResponse("Open AI key is not configured", { status: 500 });

    if (!messages)
      return new NextResponse("Messages are Required for processing", {
        status: 400,
      });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription()
    
    if (!freeTrial && !isPro) {
      return new NextResponse("your free trial has expired", {
        status: 403,
      });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    if(!isPro){
      await increaseApiLimit();
    }
   
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
