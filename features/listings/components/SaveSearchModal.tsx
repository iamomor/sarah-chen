"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { formatPrice } from "@/lib/utils";
import type { SaveSearchData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { sendNewsletterSignup } from "@/lib/emailjs";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().optional(),
  frequency: z.enum(["Instant", "Daily", "Weekly"], {
    message: "Please select an alert frequency.",
  }),
});

interface SaveSearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchParams: URLSearchParams;
}

export default function SaveSearchModal({
  isOpen,
  onOpenChange,
  searchParams,
}: SaveSearchModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      frequency: "Daily",
    },
  });

  const buildSummary = () => {
    const location = searchParams.get("location") || agentConfig.markets[0];
    const beds = searchParams.get("beds");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let summary = "";
    if (beds && beds !== "any") {
      summary += `${beds}+ bed homes `;
    } else {
      summary += "Homes ";
    }

    summary += `in ${location}`;

    if (minPrice || maxPrice) {
      summary += ", ";
      if (minPrice && maxPrice) {
        summary += `${formatPrice(Number(minPrice), region.currency, region.language)}–${formatPrice(Number(maxPrice), region.currency, region.language)}`;
      } else if (minPrice) {
        summary += `from ${formatPrice(Number(minPrice), region.currency, region.language)}`;
      } else if (maxPrice) {
        summary += `up to ${formatPrice(Number(maxPrice), region.currency, region.language)}`;
      }
    }

    return summary;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    try {
      const data: SaveSearchData = {
        email: values.email,
        firstName: values.firstName || "",
        frequency: values.frequency,
        searchQuery: searchParams.toString(),
      };
      await sendNewsletterSignup(values.email, values.firstName || "Valued Buyer");
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setError(null);
        form.reset();
      }, 300);
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-8">
          {isSubmitted ? (
            <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                You&apos;re all set
                {form.getValues("firstName")
                  ? `, ${form.getValues("firstName")}`
                  : ""}
                !
              </h2>
              <p className="text-muted-foreground mb-8">
                We&apos;ll email you at{" "}
                <span className="font-semibold text-foreground">
                  {form.getValues("email")}
                </span>{" "}
                when new homes match your search.
              </p>
              <Button
                onClick={() => onOpenChange(false)}
                className="w-full h-12 rounded-full font-bold uppercase tracking-widest text-xs"
                style={{
                  backgroundColor: agentConfig.colors.accent,
                  color: agentConfig.colors.primary,
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader className="mb-8">
                <DialogTitle className="text-3xl font-bold tracking-tight mb-2">
                  Save This Search
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground/80">
                  Get notified when new homes match your criteria
                </DialogDescription>
              </DialogHeader>

              <div className="bg-accent/5 border border-accent/10 rounded-lg p-5 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">
                  Your Current Criteria
                </p>
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  {buildSummary()}
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email@example.com"
                            {...field}
                            className="h-12 border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent px-0 bg-transparent placeholder:text-muted-foreground/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          First Name (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="h-12 border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent px-0 bg-transparent placeholder:text-muted-foreground/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Alert Frequency
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3"
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem
                                value="Instant"
                                id="f-instant"
                                className="border-border data-[state=checked]:border-accent data-[state=checked]:text-accent"
                              />
                              <label
                                htmlFor="f-instant"
                                className="font-normal text-sm cursor-pointer flex-1"
                              >
                                Instant{" "}
                                <span className="text-muted-foreground text-xs ml-1">
                                  (as soon as a match is listed)
                                </span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem
                                value="Daily"
                                id="f-daily"
                                className="border-border data-[state=checked]:border-accent data-[state=checked]:text-accent"
                              />
                              <label
                                htmlFor="f-daily"
                                className="font-normal text-sm cursor-pointer flex-1"
                              >
                                Daily digest
                              </label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem
                                value="Weekly"
                                id="f-weekly"
                                className="border-border data-[state=checked]:border-accent data-[state=checked]:text-accent"
                              />
                              <label
                                htmlFor="f-weekly"
                                className="font-normal text-sm cursor-pointer flex-1"
                              >
                                Weekly summary
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-14 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        backgroundColor: agentConfig.colors.accent,
                        color: agentConfig.colors.primary,
                      }}
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Creating Alert..."
                        : "Create My Search Alert"}
                    </Button>

                    {error && (
                      <p className="text-red-500 text-xs font-medium text-center mt-4">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-6 border-t border-border/50">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                    <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                      <Lock className="w-3.5 h-3.5" />
                      Your info is private and secure
                    </div>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
