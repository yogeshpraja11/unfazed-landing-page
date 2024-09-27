import React from "react";
import Header from "../common/Header";
import TestimonialCard from "../cards/TestimonialCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQSection() {
  const faqsData = [
    {
      id: 0,
      question: "What is therapy, and how can it help me?",
      answer:
        "Therapy is a collaborative process where you work with a trained mental health professional to explore your thoughts, feelings, and behaviors. It helps you understand and manage your emotions, resolve personal challenges, and improve your overall well-being.",
    },
    {
      id: 1,
      question: "Is therapy confidential?",
      answer:
        "Yes, therapy sessions are confidential. Your therapist will explain the exceptions to confidentiality during your first session.",
    },
    {
      id: 2,
      question: "How do I know if I need therapy?",
      answer:
        "If you're experiencing emotional, mental, or behavioral challenges that impact your daily life, therapy can provide support and strategies for coping and improving your well-being.",
    },
    {
      id: 3,
      question: "How do I choose the right therapist for me?",
      answer:
        "Choosing the right therapist involves finding someone who you feel comfortable with and who has experience in addressing your specific concerns. You may want to have an initial consultation to see if the therapist is a good fit.",
    },
  ];

  return (
    <section className="mt-[8rem]">
      <Header subtitle="Frequently asked questions" />
      <div className="p-[4rem]">
        <Accordion type="single" collapsible>
          {faqsData.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQSection;
