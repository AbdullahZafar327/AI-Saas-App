"use client";
import Heading from "@/components/Heading";
import React, { useState } from "react";
import { Download, ImageIcon, MessageSquare } from "lucide-react";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModel } from "@/hooks/use-pro-model";
import { toast } from "react-hot-toast";

const ConversationPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });
  const router = useRouter();
  const proModel = useProModel();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);

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
        title="Generate Images"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        color="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full border-0"
                        {...field}
                        placeholder="A picture of a horse in swiss alps"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
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
          {images.length === 0 && !isLoading && (
            <Empty label="No Images are generated yet." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-lg mt-8 xl:grid-cols-4">
            {images.map((src) => (
              <Card key={src} className="">
                <div className="relative aspect-square">
                  <Image fill alt="prompt Image" src={src} />
                </div>
                <CardFooter className="p-2" onClick={() => window.open(src)}>
                  <Button variant="secondary" className="w-full">
                    <Download className="h-5 w-5 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
