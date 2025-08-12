"use client";
import { useEffect, useRef, useState } from "react";
import HeadingTextContainer from "@/atoms/HeadingTextContainer";
import { splitTextAnimation } from "@/Utills/commonUtills";
import { useAppContext } from "@/context/AppContext";

const PROFESSION_TEXTS = ["MERN Stack Developer Intern."];
const TYPING_DELAY = 100; // Delay between each character typing
const DISPLAY_DURATION = 6000; // How long text stays before erasing
const ERASING_DELAY = 2000; // Delay after erasing before retyping

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const animationRef = useRef<NodeJS.Timeout>();
  const isAnimating = useRef(false);

  useEffect(() => {
    startAnimationCycle();
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  const startAnimationCycle = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    animateCursor("title", () => {
      typeText(PROFESSION_TEXTS[0]);
    });
  };

  const animateCursor = (elementId: string, callback: () => void) => {
    toggleClass(elementId, "cursor-animation", true);
    setTimeout(() => {
      toggleClass(elementId, "cursor-animation", false);
      callback();
    }, 1800);
  };

  const typeText = (text: string) => {
    toggleClass("profession", "cursor-animation", true);
    toggleClass("profession", "reverse-cursor-animation", false);
    
    let currentIndex = 0;
    const typeCharacter = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
        animationRef.current = setTimeout(typeCharacter, TYPING_DELAY);
      } else {
        animationRef.current = setTimeout(() => {
          eraseText(text);
        }, DISPLAY_DURATION);
      }
    };
    typeCharacter();
  };

  const eraseText = (text: string) => {
    toggleClass("profession", "cursor-animation", false);
    toggleClass("profession", "reverse-cursor-animation", true);
    
    let currentIndex = text.length;
    const eraseCharacter = () => {
      if (currentIndex >= 0) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex--;
        animationRef.current = setTimeout(eraseCharacter, TYPING_DELAY / 2);
      } else {
        animationRef.current = setTimeout(() => {
          typeText(text); // Restart the animation cycle
        }, ERASING_DELAY);
      }
    };
    eraseCharacter();
  };

  const toggleClass = (elementId: string, className: string, add: boolean) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList[add ? "add" : "remove"](className);
    }
  };

  const renderProfessionText = () => {
    const words = displayedText.split(" ");
    const firstWord = words[0] || "";
    const remainingWords = words.slice(1).join(" ");

    return (
      <>
        {firstWord}{" "}
        {remainingWords && (
          <span className="text-orange-500">{remainingWords}</span>
        )}
      </>
    );
  };

  return (
    <div className="flex h-screen w-full relative z-10 overflow-hidden bg-black">
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
      <div className="mx-auto md:max-w-[80%] max-w-[90%] w-full">
        <div className="text-white absolute top-[30%] md:top-[30%]">
          <div
            className="flex gap-2 max-w-fit justify-left h-fit max-h-[40px]"
            id="title"
          >
            <h1 className="md:text-4xl w-fit text-2xl">
              Hi, I'm <b className="text-orange-500">Akshat Shettigar</b>
            </h1>
          </div>
          <div className="max-w-fit md:mt-4 mt-2 md:text-6xl text-3xl min-h-[60px] md:min-h-[80px]">
            <h1 id="profession" className="font-extrabold">
              {renderProfessionText()}
            </h1>
          </div>
          <p className="text-white text-sm md:text-base md:mt-4 md:max-w-[600px] max-w-[250px] md:font-semibold">
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