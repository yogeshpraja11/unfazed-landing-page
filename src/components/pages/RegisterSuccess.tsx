import Link from "next/link";
import React from "react";

function RegisterSuccess() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-end"
      style={{backgroundImage: "url('/images/event.jpg')"}}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main container */}
      <div className="relative bg-white shadow-lg rounded-lg overflow-hidden max-w-xl w-full lg:max-w-xl mx-4">
        <div className="bg-green-500 text-white text-center py-3">
          <h2 className="text-xl font-bold">
            Congratulations... You've been registered!
          </h2>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-center text-[#FF6600] mb-3">
            Online Training with Unfazed
          </h3>
          <p className="text-center text-gray-700 mb-5">
            <span className="font-semibold">Hosted by</span>
            <span className="text-blue-600 font-semibold"> Jasneet Kaur</span>
          </p>

          <div className="bg-[#FF6600] text-white rounded-md text-center py-2 mb-3 shadow-md">
            <p className="font-bold">Tuesday, 10 October 2024, 11:00 AM</p>
            <p>Calcutta, Chennai, Mumbai, New Delhi GMT +5:30</p>
          </div>

          <div className="text-center mb-5">
            <a
              href="#"
              className="text-blue-600 underline hover:text-[#FF6600] transition duration-200"
            >
              Set reminder
            </a>
          </div>

          <p className="text-gray-600 text-center mb-5">
            Internship program and training designed to provide aspiring
            psychologists and therapy enthusiasts like you, with a deeply
            immersive and enjoyable learning experience.
          </p>

          <div className="bg-gray-50 border border-gray-300 p-4 rounded-md shadow-sm">
            <p className="text-gray-700 mb-2 font-semibold text-center">
              Your webinar link
            </p>
            <input
              type="text"
              className="w-full text-center bg-gray-200 p-2 rounded-md border border-gray-300"
              defaultValue="https://event.webinarjam.com/go/live/4/05p3pc0hyxsl9m67fzqop7"
              readOnly
            />
          </div>
        </div>

        <div className="text-center bg-gray-200 py-3 mt-3 text-sm">
          <Link
            href="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6600] transition duration-200 mr-4"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6600] transition duration-200 mr-4"
          >
            Privacy Policy
          </Link>
          <Link
            href="/refund-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6600] transition duration-200 mr-4"
          >
            Refund Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;
