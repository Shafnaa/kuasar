import { z } from "zod";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useCountries } from "@/lib/actions/countries";

import { hardRegEx } from "@/lib/utils";

const formSchema = z.object({
  search: z.string(),
});

function HomePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const { data, loading, error, refetch } = useCountries({
    name: "",
  });

  const handleSearch = async (data: z.infer<typeof formSchema>) => {
    refetch({ name: hardRegEx(data.search) });
  };

  return (
    <div className="w-full mt-8 flex flex-1 flex-col items-center">
      <div className="mb-10 w-full">
        <div className="mb-6 md:mb-8 text-center flex flex-col items-center">
          <p className="text-xl md:text-2xl font-medium mb-1 md:mb-2">
            Planning a holiday abroad? 🔎
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-1 md:m-2">
            Discover the perfect travel plan here!
          </h2>
        </div>

        <Form {...form}>
          <form
            className="flex justify-center items-start gap-2"
            onSubmit={form.handleSubmit(handleSearch)}
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full max-w-64 md:max-w-96 flex flex-col space-y-2">
                  <FormControl>
                    <Input placeholder="Type country name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </div>

      <ScrollArea className="px-4">
        {error && <p>Error: {error.message}</p>}
        {loading && <p>Loading...</p>}
        {data && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-4">
            {data.countries.map(
              (country: { code: string; emoji: string; name: string }) => (
                <NavLink
                  to={`/chat/${country.code}`}
                  className="flex flex-1"
                  key={country.code}
                >
                  <Card key={country.code} className="flex flex-1">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-center text-4xl md:text-6xl mb-2 mx-auto">
                        {country.emoji}
                      </CardTitle>
                      <CardTitle>{country.name}</CardTitle>
                      <CardDescription>{country.code}</CardDescription>
                    </CardHeader>
                  </Card>
                </NavLink>
              )
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default HomePage;
