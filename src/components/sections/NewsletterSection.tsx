import React from "react";
import Header from "../common/Header";
import {Input} from "../ui/input";
import MainButton from "../common/MainButton";

function NewsletterSection() {
  return (
    <section className="mt-[9rem]">
      <Header subtitle="Join our mailing list" />
      <div className="flex flex-col md:flex-row  items-center mt-8 md:mt-[3.31rem]">
        <div>
          <img
            src="/images/newsletter_large_icon.png"
            alt="large envelop image"
            className="w-[8rem] md:w-[16rem]"
          />
        </div>
        <div>
          <p className="mb-[1.44rem] text-normal font-semibold">
            Sign up now to receive the latest news and exclusive offers on a
            wide range of online courses and learning opportunities designed to
            help you grow professionally and personally.
          </p>
          <div className="flex items-center gap-4">
            <Input
              type="email"
              placeholder="Your E-mail here..."
              className="h-[2.8125rem] rounded-[2.0625rem] newsletter-box-shadow w-[70%]"
            />
            <MainButton text="Subscribe Our Newsletter" width="w-[30%]" />
          </div>

          {/* <div className="mt-[3.12rem]">
         
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
