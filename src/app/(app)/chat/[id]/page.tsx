import React from "react";

import { z } from "zod";
import { marked } from "marked";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleXIcon, SendIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonVariants, Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

import { useCountry } from "@/lib/actions/countries";

import { cn } from "@/lib/utils";

import { useAxios } from "@/providers/axios-provider";

const formSchema = z.object({
  prompt: z.string(),
});

function CountryPage() {
  const { id } = useParams();
  const { publicAxios } = useAxios();
  const [response, setResponse] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  if (!id) {
    return null;
  }

  const country = useCountry({ code: id });

  const handlePrompt = async (formData: z.infer<typeof formSchema>) => {
    setLoading(true);

    const response = await publicAxios.post("/chat", {
      prompt: `All of the following question will be about ${country.data.country.name} as a country, place, and culture. Here is my question: ${formData.prompt}`,
    });

    setResponse(response.data.response);

    setLoading(false);

    form.reset();
  };

  return (
    <div className="w-full flex flex-1 flex-col items-center md:mt-8">
      <ScrollArea className="mb-10 w-full flex-1">
        <div className="mb-6 md:mb-8 text-center flex flex-col items-center">
          {country.loading && (
            <>
              <Skeleton className="h-9 md:h-10 w-9 md:w-10 mb-1 md:m-2" />
              <Skeleton className="h-7 md:h-8 w-28 md:w-32 mb-1 md:mb-2" />
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </>
          )}
          {country.error && (
            <>
              <CircleXIcon className="w-9 h-9 md:w-10 md:h-10 text-red-500" />
              <p>Error: {country.error.message}</p>
            </>
          )}
          {country.data && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-1 md:m-2">
                {country.data.country.emoji}
              </h2>
              <p className="text-xl md:text-2xl font-medium mb-1 md:mb-2">
                {country.data.country.name}
              </p>
              <p
                className="text-justify"
                dangerouslySetInnerHTML={{
                  __html: marked(
                    `**${
                      country.data.country.name
                    }**, represented by the flag emoji **${
                      country.data.country.emoji
                    }** is located in the continent of **${
                      country.data.country.continent.name
                    }**. Its capital city is **${
                      country.data.country.capital
                    }**, and its name in the local language(s) is **${
                      country.data.country.native
                    }**. The official languages spoken here include **${
                      country.data.country.languages.length < 1
                        ? "none"
                        : country.data.country.languages.length < 2
                        ? `${country.data.country.languages[0].name}${
                            country.data.country.languages[0].rtl
                              ? " (written right-to-left)"
                              : ""
                          }`
                        : country.data.country.languages
                            .map(
                              (language: { name: String; rtl: boolean }) =>
                                `${language.name}${
                                  language.rtl ? " (written right-to-left)" : ""
                                }`
                            )
                            .reduce((prev: String, curr: String, idx: number) =>
                              idx === country.data.country.languages.length - 1
                                ? prev + " and " + curr
                                : prev + ", " + curr
                            )
                    }**. The currency used here is **${country.data.country.currencies
                      .map((currency: String) => currency)
                      .reduce((prev: String, curr: String, idx: number) =>
                        idx === country.data.country.currencies.length - 1
                          ? prev + " and " + curr
                          : prev + ", " + curr
                      )}**. Give me any question about this country and I will try to answer it!`
                  ),
                }}
              />
            </>
          )}
        </div>
        <Card>
          {loading ? (
            <CardHeader className="flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-4/5 h-4" />
            </CardHeader>
          ) : (
            <CardHeader>
              <CardDescription
                dangerouslySetInnerHTML={{
                  __html: marked(
                    response
                      ? response
                      : "Ask me anything you want to know about this country!"
                  ),
                }}
              />
            </CardHeader>
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
                        placeholder="Give me any question about this country"
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

export default CountryPage;
