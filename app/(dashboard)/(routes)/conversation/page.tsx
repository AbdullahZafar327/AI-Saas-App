"use client";
import Heading from "@/components/Heading";
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { formSchema } from "./constants";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { useProModel } from "@/hooks/use-pro-model";
import { toast } from "react-hot-toast";

const ConversationPage = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const proModel = useProModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModel.onOpen();
      } else {
        toast.error("something went wrong");
      }
    } finally {
      router.refresh();
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Heading
        title="Conversation"
        description="our Most Advanced conversation Model."
        icon={MessageSquare}
        color="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-3 lg:px-8">
        <div>
          <Form {...form}>
            <form
              className="w-full rounded-lg grid grid-cols-12 gap-2 border p-4 px-3 focus-within:shadow-sm md:px-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full border-0"
                        {...field}
                        placeholder="How Do I calculate the radius of the circle?"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && <Loader />}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started yet." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
                key={message.content}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
