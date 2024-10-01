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
  const [showType, setShowType] = useState("formd");

  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface PaymentResult {
    success: boolean;
  }

  const handlePayment = async () => {
    try {
      // Make API call to create a Razorpay order
      const formData = new FormData();
      formData.append("amount", "50000"); // Amount in paise (₹500 = 50000 paise)
      formData.append("currency", "INR");
      formData.append("contact_id", "1"); // Replace with the actual contact_id

      // Make API call to create a Razorpay order using FormData
      const response = await fetch(
        "https://landing.unfazed.co.in/api/create-payment",
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

      // Razorpay options
      const options: any = {
        key: "rzp_test_7GPcqJ45CdVJHP", // Add Razorpay Key ID
        amount: data.amount, // Amount in paise
        currency: data.currency,
        name: "Your Company Name",
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
    } catch (error) {
      console.error("Error in processing payment:", error);
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
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
            <DialogContent className="w-full max-w-[800px] h-[90vh] sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Enroll</DialogTitle>
                {/* <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription> */}
              </DialogHeader>
              {showType === "form" ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
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
                              <FormLabel className="mb-2">
                                Date of birth
                              </FormLabel>
                              <Popover>
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
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>

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
                  <div className="flex flex-col items-center justify-center p-8 mt-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
                    <img
                      src="/images/enrollment.png"
                      alt="Planeeet Logo"
                      className="w-16 h-16 mb-4"
                    />

                    <h1 className="text-xl font-semibold">Registered</h1>
                    <p className="text-gray-500 mt-2 flex">
                      Our team will contact u soon...{" "}
                      <PhoneCall color="#ff6600" />
                    </p>

                    <h2 className="text-2xl font-bold mt-6">
                      Enroll now, Book Your Slot!
                    </h2>
                    <p className="text-center text-gray-500 mt-2">
                      This feature is available for paid users only. Please, pay
                      now or book your seat to get full access to all our
                      course. Don’t miss out!
                    </p>

                    {/* <button
                      onClick={handlePayment}
                      className="mt-6 bg-gradient-to-r from-red-400 to-red-500 hover:bg-primary text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
                    ></button> */}
                    <Button
                      onClick={handlePayment}
                      className="mt-6  bg-primary hover:opacity-90  hover:bg-secondary text-white py-2 px-6 rounded-full shadow-none"
                    >
                      PAY NOW
                    </Button>
                  </div>
                </>
              )}
              <DialogFooter>
                {showType === "form" && (
                  <MainButton
                    text="Submit"
                    classes="shadow-none w-[8.125rem]"
                  />
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
