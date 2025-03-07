"use client";
import { useEffect, useRef, useState } from "react";
import HeadingTextContainer from "@/atoms/HeadingTextContainer";
import { splitTextAnimation } from "@/Utills/commonUtills";
import { useAppContext } from "@/context/AppContext";
import { color } from "three/tsl";

const expText1 = ["MERN Stack Developer Intern."];

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const isCursorAnimation = useRef(false);
  const [count, setCount] = useState(0); // Counter for cycling through texts

  useEffect(() => {
    if (!isCursorAnimation.current) {
      initiateCursorAnimation();
      isCursorAnimation.current = true;
    }
  }, []);

  const initiateCursorAnimation = () => {
    addCssClass("title", "cursor-animation");
    setTimeout(() => {
      removeCssClass("title", "cursor-animation");
      beginExperienceAnimation();
    }, 1800);
  };

  const beginExperienceAnimation = () => {
    animateText(); // Kick off the initial animation
  };

  const animateText = () => {
    removeCssClass("proffession", "reverse-cursor-animation");
    addCssClass("proffession", "cursor-animation");
    setCurrentText(expText1[0]); // Use expText1[0] directly

    setTimeout(() => {
      removeCssClass("proffession", "cursor-animation");
      addCssClass("proffession", "reverse-cursor-animation");

      setTimeout(() => {
        animateText(); // Call itself to repeat
      }, 2000);  // Delay after the reverse animation
    }, 6000); // Duration of the typing/cursor animation
  };

  const addCssClass = (id: string, className: string) => {
    const element = document.getElementById(id) as HTMLElement;
    element.classList.add(className);
  };

  const removeCssClass = (id: string, className: string) => {
    const element = document.getElementById(id) as HTMLElement;
    element.classList.remove(className);
  };

  return (
    <div className="flex  h-screen  w-full relative z-10 overflow-hidden bg-black ">
      <video
        src="/video/bgVideoMain.webm"
        poster="/images/poster.webp"
        autoPlay
        muted
        playsInline
        loop
        className="absolute top-[30%] left-0 w-full h-full object-cover z-[-1px]"
        preload="auto"
      />
      <div className=" mx-auto md:max-w-[80%] max-w-[90%]  w-full ">
        <div className="text-white absolute top-[30%] md:top-[30%] ">
          <div
            className="flex gap-2 max-w-fit justify-left h-fit max-h-[40px]"
            id="title"
          >
            <h1 className="md:text-4xl w-fit text-2xl">Hi, I'm <b className="text-orange-500">Akshat Shettigar</b></h1>
          </div>
          <div className="max-w-fit md:mt-4 mt-2 md:text-6xl text-3xl min-h-[60px] md:min-h-[80px]">
            <h1 id="proffession" className="font-extrabold ">
              {currentText?.split(" ")[0]}{" "}
              <span className="text-orange-500">
                {currentText?.split(" ").slice(1).join(" ")}
              </span>
            </h1>
          </div>
          <p className="text-white text-sm md:text-base md:mt-4 md:max-w-[600px] max-w-[250px] md:font-semibold ">
          Passionate MERN Stack Developer with hands-on experience in building
            dynamic web applications. Successfully completed a 4-month
            internship at WebCreta Technologies Pvt Ltd, where I honed my skills
            in MongoDB, Express.js, React.js, and Node.js. Always eager to learn
            and contribute to innovative projects in the web development space.
          </p>
        </div>
      </div>
    </div>
  );
}