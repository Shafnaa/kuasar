import React from "react";

import { z } from "zod";
import { marked } from "marked";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useAxios } from "@/providers/axios-provider";

const formSchema = z.object({
  prompt: z.string(),
});

function ChatPage() {
  const { publicAxios } = useAxios();
  const [response, setResponse] = React.useState<string>();
  const [countries, setCountries] = React.useState<string[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handlePrompt = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const response = await publicAxios.post("/chat", {
      prompt: `I will give you my preference, please give me a list of country recommendation according to my preferences. ${data.prompt}. In the end, give me a list of country id separated by comma like this format [ID,AD,AE] inside a square bracket, no space, and no other text afterwards.`,
    });

    setCountries(
      response.data.response
        .match(/\[([^\]]+)\]/g)[0]
        .replace(/\[|\]/g, "")
        .split(",")
    );

    setResponse(response.data.response.replace(/\[([^\]]+)\]/g, ""));

    setLoading(false);

    form.reset();
  };

  return (
    <div className="w-full flex flex-1 flex-col items-center md:mt-8">
      <ScrollArea className="mb-10 w-full flex-1">
        <div className="mb-6 md:mb-8 text-center flex flex-col items-center">
          <p className="text-xl md:text-2xl font-medium mb-1 md:mb-2">
            Uncertain of places to go? 🔎
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-1 md:m-2">
            Tell me your preference & I'll help!
          </h2>
        </div>
        <Card>
          {loading ? (
            <>
              <CardHeader>
                <CardDescription className="flex flex-col gap-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-4/5 h-4" />
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-2">
                <Skeleton className="w-12 h-6" />
                <Skeleton className="w-12 h-6" />
                <Skeleton className="w-12 h-6" />
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <CardDescription
                  dangerouslySetInnerHTML={{
                    __html: marked(
                      response
                        ? response
                        : "Tell me about your preference and I'll help you!"
                    ),
                  }}
                />
              </CardHeader>
              {countries && (
                <CardFooter className="flex flex-wrap gap-2">
                  {countries.map((country) => (
                    <NavLink to={`/chat/${country}`} key={country}>
                      <Badge>{country}</Badge>
                    </NavLink>
                  ))}
                </CardFooter>
              )}
            </>
          )}
        </Card>
      </ScrollArea>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePrompt)} className="w-full">
          <Card>
            <CardHeader className="p-2">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me your preference"
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "border-0"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="rounded-full ml-auto"
              >
                <SendIcon className="w-6 h-6" />
              </Button>
            </CardHeader>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default ChatPage;
