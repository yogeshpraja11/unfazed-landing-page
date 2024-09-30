"use client";

import {useState} from "react";
import {X} from "lucide-react";
import MainButton from "./MainButton";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  // Function to handle scrolling to specific pixel positions
  const scrollToSection = (position: number) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
    setMenu(false);
  };

  return (
    <div className="md:sticky md:top-0 md:shadow-none z-20">
      {/* DESKTOP */}
      <div className="hidden lg:block animate-in fade-in zoom-in bg-white p-4">
        <div className="flex justify-between md:mx-[9rem] items-center">
          <div>
            <img
              className="h-[2.5rem] w-[10rem]"
              src="/images/logo.png"
              alt="logo"
            />
          </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            <p
              onClick={() => scrollToSection(0)}
              className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
            >
              Home
            </p>
            <p
              onClick={() => scrollToSection(450)}
              className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
            >
              About
            </p>
            <p
              onClick={() => scrollToSection(2300)}
              className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
            >
              Q&A
            </p>
            <p
              onClick={() => scrollToSection(2800)}
              className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
            >
              Contact
            </p>
          </div>
          <div className="flex items-center gap-[40px] select-none">
            <MainButton text="Sign up" classes="shadow-none" />
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={`block lg:hidden shadow-sm fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in ${
          menu ? " bg-primary py-2" : ""
        }`}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <img
              className="h-[2.5rem] w-[10rem]"
              src="/images/logo.png"
              alt="logo"
            />
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <img
                src="/svgs/hamburger.svg"
                alt="menu"
                className="cursor-pointer animate-in fade-in zoom-in"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              <p
                onClick={() => scrollToSection(0)} // Scroll to the top for "Home"
                className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
              >
                Home
              </p>
              <p
                onClick={() => scrollToSection(450)} // Adjust this value for "About"
                className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
              >
                About
              </p>
              <p
                onClick={() => scrollToSection(2300)} // Adjust this value for "Q&A"
                className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
              >
                Q&A
              </p>
              <p
                onClick={() => scrollToSection(2800)} // Adjust this value for "Contact"
                className="hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray"
              >
                Contact
              </p>
              <div className="flex flex-col gap-[40px] select-none">
                <MainButton text="Sign up" classes="shadow-none" />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
