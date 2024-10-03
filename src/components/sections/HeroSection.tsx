"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon, PhoneCall} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

import MainButton from "../common/MainButton";
import {DialogClose} from "@radix-ui/react-dialog";
import {Textarea} from "../ui/textarea";
import {useToast} from "@/hooks/use-toast";
import {DateTimePicker} from "../ui/datetime-picker";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  firstName: z
    .string()
    .min(2, {message: "Firstname must be at least 2 characters."}),
  lastName: z
    .string()
    .min(2, {message: "Lastname must be at least 2 characters."}),
  message: z
    .string()
    .min(2, {message: "Message must be at least 2 characters."}),
  email: z.string().email({message: "Invalid email address."}),
  phoneNumber: z
    .string()
    .min(10, {message: "Phone number must be at least 10 digits."})
    .regex(/^\d+$/, {message: "Phone number must contain only digits."}),
});

function HeroSection() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [showType, setShowType] = useState("form");
  const {toast} = useToast();

  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface PaymentResult {
    success: boolean;
  }
  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      // Make API call to create a Razorpay order
      const formData = new FormData();
      formData.append("amount", "50000");
      formData.append("currency", "INR");
      formData.append("contact_id", "3");

      const response = await fetch(
        "https://landing.unfazed.co.in/api/create-payment/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data) {
        console.error("Failed to create order");
        return;
      }

      const res = await loadScript(
        "https:/checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Some error at razorpay screen loading");
        return;
      }

      // Razorpay options
      const options: any = {
        key: "rzp_test_7GPcqJ45CdVJHP", // Add Razorpay Key ID
        amount: data.amount, // Amount in paise
        currency: data.currency,
        name: "Unfazed",
        description: "Test Transaction",
        order_id: data.id, // Razorpay order ID returned from backend
        handler: async (response: RazorpayResponse) => {
          // On successful payment, save payment details in the backend
          const paymentResponse = await fetch("/api/save-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const paymentResult: PaymentResult = await paymentResponse.json();
          if (paymentResult.success) {
            alert(
              `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
            );
          } else {
            alert("Payment Failed");
          }
        },
        prefill: {
          name: "John Doe", // Replace with actual customer name
          email: "john.doe@example.com", // Replace with actual customer email
          contact: "9999999999", // Replace with actual customer contact
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
      // const paymentObject = new window.Razorpay(options);
      // paymentObject.open();
    } catch (error) {
      console.error("Error in processing payment:", error);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });

      const response = await fetch(
        "http://landing.unfazed.co.in/api/contact/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.error("Error submitting form:", error);
    }
  }

  return (
    <section className="flex justify-between flex-col md:flex-row gap-4 items-center">
      <div>
        <p className="font-[700] md:leading-[5.0625rem] text-2xl md:text-[3.375rem] text-darkBlue">
          India's Fastest Growing Mental Health Creator
        </p>
        <p className="text-[1.375rem] font-[500]">
          Presents to you, an opportunity like never before!
        </p>
        <p className="text-[1rem] font-[500]">
          Internship for Psychologists, that actually helps you become a better
          professional!
        </p>
        <p className="text-[1rem] font-[500]">Online Training with Unfazed</p>
        <div className="flex gap-[1.75rem] items-center mt-[2rem]">
          <Dialog>
            <DialogTrigger asChild>
              {/* <MainButton
                text="Enroll Now"
                classes="shadow-none w-[10.125rem]"
              /> */}
              <Button className=" bg-primary hover:opacity-90  hover:bg-secondary text-white shadow-none w-[10.125rem]">
                Enroll Now
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[800px] sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Enroll</DialogTitle>
                {/* <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription> */}
              </DialogHeader>
              {showType === "form" ? (
                <Form {...form}>
                  <form id="myForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4 grid-cols-2">
                      <div>
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your first name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your last name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 py-4 grid-cols-2">
                      <div>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="Enter your phone number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 py-4 grid-cols-2">
                      <div>
                        <FormField
                          control={form.control}
                          name="dob"
                          render={({field}) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="mb-2 mt-1">
                                Date of Birth
                              </FormLabel>
                              <DateTimePicker
                                granularity="day"
                                displayFormat={{hour24: "MMMM  dd, yyyy"}}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="What's your birthday?"
                              />
                              {/* <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    captionLayout="dropdown-buttons"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    fromYear={1960}
                                    toYear={2010}
                                  />

                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover> */}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Enter your message"
                                  className="w-full"
                                  rows={4}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div></div>
                  </form>
                </Form>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center p-8 mt-6 bg-white rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
                    <img
                      src="/images/enrollment.png"
                      alt="Planeeet Logo"
                      className="w-16 h-16 mb-4"
                    />

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                      Registered
                    </h1>
                    <p className="text-gray-500 mt-2 flex text-center">
                      Our team will contact you soon...
                      <PhoneCall color="#ff6600" className="ml-1" />
                    </p>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-6">
                      Enroll now, Book Your Slot!
                    </h2>
                    <p className="text-center text-gray-500 mt-2 text-sm sm:text-base lg:text-lg">
                      This feature is available for paid users only. Please, pay
                      now or book your seat to get full access to all our
                      course. Don’t miss out!
                    </p>

                    <Button
                      onClick={handlePayment}
                      className="mt-6 bg-primary hover:opacity-90 hover:bg-secondary text-white py-2 px-6 rounded-full shadow-none text-sm sm:text-base lg:text-lg"
                    >
                      PAY NOW
                    </Button>
                  </div>
                </>
              )}
              <DialogFooter>
                {showType === "form" && (
                  <Button
                    type="submit"
                    form="myForm"
                    className="bg-primary w-[8.125rem] hover:opacity-90  hover:bg-secondary text-white shadow-none"
                  >
                    Enroll Now
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex gap-[1.56rem] items-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex gap-[0.5rem]  items-center">
                  <img src="/images/fancy_play_icon.png" alt="play icon" />
                  <p className="font-bold text-normal">Learn More</p>
                </button>
              </DialogTrigger>

              <DialogContent className="w-full h-[90vh] bg-transparent sm:max-w-[800px] p-0 border-none">
                <DialogClose className="absolute right-4 top-4 rounded-sm bg-gray-500 text-white hover:bg-gray-600 p-2 transition-opacity opacity-70 hover:opacity-100"></DialogClose>
                <video
                  className="w-full h-[100%] object-cover"
                  autoPlay
                  controls
                >
                  <source src="/video.mp4" />
                </video>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <img
          src="/images/happy_guy.png"
          alt="guy with phone surrounded by action icons"
        />
      </div>
    </section>
  );
}

export default HeroSection;
