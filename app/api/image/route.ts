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
  const { prompt, amount = 1, resolution = "512x512" } = body;

  try {
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!configuration.apiKey)
      return new NextResponse("Open AI key is not configured", { status: 500 });

    if (!prompt)
      return new NextResponse("Prompt is Required for processing", {
        status: 400,
      });
    if (!amount)
      return new NextResponse("amount is Required for processing", {
        status: 400,
      });
    if (!resolution)
      return new NextResponse("resolution is Required for processing", {
        status: 400,
      });

    const freeTrial = await checkApiLimit();

    const isPro = await checkSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse("your free trial has expired", {
        status: 403,
      });
    }

    const response = await openai.createImage({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
