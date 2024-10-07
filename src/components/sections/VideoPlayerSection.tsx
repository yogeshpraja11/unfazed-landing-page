"use client";
import React, {useEffect, useRef, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainButton from "../common/MainButton";
import VideoPlayerControls from "../common/VideoPlayerControls";
import {Button} from "../ui/button";
import Image from "next/image";
import {CalendarDays, Clock, GraduationCap, UserRound} from "lucide-react";

function VideoPlayerSection() {
  const coursesData = [
    {
      title: "How to Become a Better Psychologist with Jasneet Kaur (16 hours)",
      topics: [
        "Graphology",
        "Confidence building & communication",
        "Dream analysis",
        "Life coaching",
        "Couples therapy",
        "Feminine Energies",
        "Paranormal Psychology",
        "Relationship coaching",
      ],
    },
    {
      title: "Everything About Real World Practice with Agnieszka (16 hours)",
      topics: [
        "Graphology",
        "Confidence building & communication",
        "Dream analysis",
        "Life coaching",
        "Couples therapy",
        "Feminine Energies",
        "Paranormal Psychology",
        "Relationship coaching",
      ],
    },
    {
      title: "Art Therapy with Ashmita (16 hours)",
      topics: [
        "Graphology",
        "Confidence building & communication",
        "Dream analysis",
        "Life coaching",
        "Couples therapy",
        "Feminine Energies",
        "Paranormal Psychology",
        "Relationship coaching",
      ],
    },
    {
      title: "Human Behaviors with Fun Activities with Rincy (16 hours)",
      topics: [
        "Graphology",
        "Confidence building & communication",
        "Dream analysis",
        "Life coaching",
        "Couples therapy",
        "Feminine Energies",
        "Paranormal Psychology",
        "Relationship coaching",
      ],
    },
    {
      title: "Guest Lectures on (16 hours)",
      topics: [
        "Graphology",
        "Confidence building & communication",
        "Dream analysis",
        "Life coaching",
        "Couples therapy",
        "Feminine Energies",
        "Paranormal Psychology",
        "Relationship coaching",
      ],
    },
  ];

  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      let loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [videoProgress, videoDuration, isPaused]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-8 mt-[11.31rem]">
      <div>
        <p className="text-lightBlue font-bold text-2xl">Our Course Content</p>
        <p className="text-customLightGray text-[1.2rem] mt-4 mb-8">
          Online courses and training designed to provide you with a deeply
          immersive and enjoyable learning experience{" "}
        </p>
        <Dialog>
          <DialogTrigger asChild>
            {/* <MainButton
                text="Enroll Now"
                classes="shadow-none w-[10.125rem]"
              /> */}
            <Button className="!h-[3.01544rem] hover:bg-white w-[8.2925rem] text-lightBlue font-bold text-[1rem] rounded-[6.25rem] border-[4px] border-[#EBEAED] bg-white shadow-none">
              Explore
            </Button>
          </DialogTrigger>
          <DialogContent className="fixed left-[50%] top-[60%] w-full max-w-[800px] min-h-[90vh] sm:max-w-[800px] overflow-y-scroll max-h-screen ">
            <DialogHeader>
              <DialogTitle>More About Course</DialogTitle>
            </DialogHeader>
            <div className="p-6 mt-4 border rounded-lg shadow-sm space-y-6">
              <h2 className="text-2xl font-semibold">About the course</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <CalendarDays color="#ff6600" />
                  <div>
                    <p className="font-semibold">Start date</p>
                    <p>Starts 08 October 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock color="#ff6600" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p>16hrs | 6 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <UserRound color="#ff6600" />
                  <div>
                    <p className="font-semibold">Who this course is for</p>
                    <p>
                      For Mental Health Professionals, Health Professionals &
                      Coaches
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <GraduationCap color="#ff6600" />
                  <div>
                    <p className="font-semibold">Accreditation</p>
                    <p>16 CE/CME</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">
                This action-packed and interactive 6-week course allows you
                total flexibility to learn whenever it suits you and access a
                whole range of powerful resources that simply aren’t available
                anywhere else. Between 2 to 3 hours of new content will be
                released, week-by-week, over a 6-week period (16 hours in
                total). Plus, on top of that, you’ll have an extra 16 weeks of
                access to the whole course, so you can watch all your favorite
                videos again (and if you’ve fallen behind due to sickness, or
                taking a vacation, or work commitments etc, this will give you
                plenty of time to catch up again).
              </p>
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
              <h2 className="text-2xl font-semibold">What you'll learn</h2>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Course Goals</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Get versatile with values and dance around with defusion
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Discover five powerful tools to develop and strengthen
                      psychological acceptance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Create focus, flexibility and fulfillment through
                      contacting the present moment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Empower through acceptance and liberate through
                      self-as-context
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">—</span>
                    <span>
                      Ten powerful ways to rapidly reduce the believability of
                      negative thoughts (without ever challenging them)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="w-[77%] mt-8">
                <h2 className="text-xl font-bold mb-2">Course modules</h2>
                <Accordion type="single" collapsible>
                  {coursesData.map((course, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-[1rem] font-[600]">
                        {course.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul>
                          {course.topics.map((topic, topicIndex) => (
                            <li key={topicIndex}>{topic}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative w-[90%] max-w-4xl max-h-[28rem] mx-auto my-8 rounded-xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <VideoPlayerControls
            progress={videoProgress}
            isPaused={isPaused}
            onPlayPause={togglePlayPause}
          />
        </div>
        <video className="w-[60rem]" ref={videoRef}>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

export default VideoPlayerSection;
