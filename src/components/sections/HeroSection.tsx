"use client";
import React from "react";
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
import {CalendarIcon} from "lucide-react";
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
  username: z
    .string()
    .min(2, {message: "Username must be at least 2 characters."}),
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
          Your Path to Mental Wellness Starts Here!
        </p>
        <p className="text-[1.375rem] font-[500]">
          Explore customised therapy services to guide you through life's
          challenges and enhance your mental health.
        </p>
        <div className="flex gap-[1.75rem] items-center mt-[3rem]">
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
            <DialogContent className="w-full max-w-[800px] h-[80vh] sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Enroll</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid gap-4 py-4 grid-cols-2">
                    <div>
                      <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your username"
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
                  </div>
                  <div className="grid gap-4 py-4 grid-cols-2">
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
                  <div>
                    
                  </div>

                  <DialogFooter>
                    {/* <Button type="submit">Submit</Button> */}
                  </DialogFooter>
                </form>
              </Form>

              {/* <div className="grid gap-4 py-4 grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div>
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="grid gap-4 py-4 grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="name"
                    type="email"
                    placeholder="harsh@gmail.com"
                    className="col-span-3"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-right">
                    Phone Number
                  </Label>
                  <Input id="phone" type="tel" className="col-span-3" />
                </div>
              </div> */}
              <DialogFooter>
                <MainButton text="Save" classes="shadow-none w-[8.125rem]" />
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex gap-[1.56rem] items-center">
            <Dialog>
              <DialogTrigger asChild>
                <button>
                  <img src="/images/fancy_play_icon.png" alt="play icon" />
                </button>
              </DialogTrigger>

              <DialogContent className="w-full h-[90vh] bg-transparent sm:max-w-[800px] p-0 border-none">
                <DialogClose className="absolute right-4 top-4 rounded-sm bg-gray-500 text-white hover:bg-gray-600 p-2 transition-opacity opacity-70 hover:opacity-100"></DialogClose>
                <video
                  className="w-full h-full object-cover"
                  loop
                  muted
                  autoPlay
                >
                  <source src="/video.mp4" />
                </video>
              </DialogContent>
            </Dialog>

            <p className="font-bold text-normal">Learn More</p>
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
