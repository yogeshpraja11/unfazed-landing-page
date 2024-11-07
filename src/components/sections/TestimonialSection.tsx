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
        "This book offers a perfect blend of theory and practical exercises, making it easy to understand and apply. The somatic practices and mindfulness exercises are transformative!",
    },
    {
      id: 1,
      imageUrl: "/images/kayley.jpg",
      reviewerName: "Kayley Frame",
      review:
        "Filled with helpful insights and real-life examples, this book provides powerful strategies for overcoming feelings of being ‘stuck’ and reconnecting with oneself.",
    },
    {
      id: 2,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Gene Whitfield",
      review:
        "The book breaks down complex concepts into manageable sections, making it easy to follow. It offers clear steps for moving beyond immobilization in daily life.",
    },
    {
      id: 3,
      imageUrl: "/images/alan.jpg",
      reviewerName: "Allan Kim",
      review:
        "Practical and accessible, this book demystifies the freeze response and gives me the confidence to apply these techniques in my own healing journey.",
    },
  ];

  return (
    <section className="mt-[9rem]">
      <Header subtitle="What people are saying about our book" />
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
