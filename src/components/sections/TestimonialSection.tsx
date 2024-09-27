import React from "react";
import Header from "../common/Header";
import TestimonialCard from "../cards/TestimonialCard";

function TestimonialSection() {
  const appReviewData = [
    {
      id: 0,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Rayhan Curran",
      review:
        "I find the way the course is taught a balance of theory and practice an excellent way to learn, and love the videos and mindfulness exercises that are great for clients",
    },

    {
      id: 1,
      imageUrl: "/images/kayley.jpg",
      reviewerName: "Kayley Frame",
      review:
        "Because it is filled with many handy pointers for this type of work and excellent video examples to really see these tips and strategies in action.",
    },
    {
      id: 2,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Gene Whitfield",
      review:
        "It is broken down really well to understand each element in easily manageable chunks so you can really see how the model comes together and how to apply it in your day to day practice. ",
    },
    {
      id: 3,
      imageUrl: "/images/alan.jpg",
      reviewerName: "Allan Kim",
      review:
        "It makes ACT very practical and easy to understand. The demos also help me learn and give me confidence that I can work this in to short term therapy.",
    },
  ];
  return (
    <section className="mt-[9rem]">
      <Header subtitle="What people are saying about our courses" />
      <div className="grid grid-cols-1 gap-16  md:grid-cols-2 mt-8 md:mt-[6.75rem]">
        {appReviewData.map((review) => (
          <TestimonialCard
            key={review.id}
            imageUrl={review.imageUrl}
            review={review.review}
            reviewerName={review.reviewerName}
          />
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;
