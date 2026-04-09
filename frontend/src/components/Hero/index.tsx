"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMobile } from "@/context/MobileContext";

const FULL_TITLE = "Hi, I'm Akshat Shettigar";
const NAME_START = "Hi, I'm ".length;
const PROFESSIONS = [
  "React & Next.js Developer.",
  "Full Stack Developer.",
  "MERN Stack Developer.",
];

export default function Hero() {
  const [titleText, setTitleText] = useState("");
  const [profText, setProfText] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [longestProf] = useState(() =>
    PROFESSIONS.reduce((a, b) => (a.length > b.length ? a : b))
  );
  const { isMobile } = useMobile();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const profIndex = useRef(0);
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (blinkRef.current) {
      clearInterval(blinkRef.current);
      blinkRef.current = null;
    }
  };

  const addTimer = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timers.current.push(id);
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const startBlink = () => {
      if (blinkRef.current) clearInterval(blinkRef.current);
      blinkRef.current = setInterval(() => setCursorOn((p) => !p), 500);
    };

    const typeTitle = (i = 0) => {
      setTitleText(FULL_TITLE.slice(0, i));
      if (i < FULL_TITLE.length) {
        addTimer(() => typeTitle(i + 1), 70);
      }
    };

    const typeProf = (i = 0) => {
      const prof = PROFESSIONS[profIndex.current];
      setProfText(prof.slice(0, i));
      if (i < prof.length) {
        addTimer(() => typeProf(i + 1), 70);
      }
    };

    const deleteTitle = (i: number) => {
      setTitleText(FULL_TITLE.slice(0, i));
      if (i > 0) {
        addTimer(() => deleteTitle(i - 1), 100);
      }
    };

    const deleteProf = (i: number) => {
      const prof = PROFESSIONS[profIndex.current];
      setProfText(prof.slice(0, i));
      if (i > 0) {
        addTimer(() => deleteProf(i - 1), 80);
      } else {
        profIndex.current = (profIndex.current + 1) % PROFESSIONS.length;
      }
    };

    const startLoop = () => {
      typeTitle(0);
      typeProf(0);

      const typingDuration =
        Math.max(FULL_TITLE.length, PROFESSIONS[profIndex.current].length) * 70;

      addTimer(() => {
        deleteTitle(FULL_TITLE.length);
        deleteProf(PROFESSIONS[profIndex.current].length);

        const deletingDuration =
          Math.max(FULL_TITLE.length, PROFESSIONS[profIndex.current].length) * 100;

        addTimer(startLoop, deletingDuration + 600);
      }, typingDuration + 2500);
    };

    // ✅ Reset everything cleanly and restart from scratch
    const resetAndStart = () => {
      clearAllTimers();
      setTitleText("");
      setProfText("");
      setCursorOn(true);
      startBlink();
      startLoop();
    };

    // ✅ Page Visibility API — restart animation when tab becomes active again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetAndStart();
      } else {
        // Tab hidden — clear everything to prevent timer pileup
        clearAllTimers();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    resetAndStart();

    return () => {
      clearAllTimers();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isHydrated]);

  const plainPart = titleText.slice(0, Math.min(titleText.length, NAME_START));
  const namePart = titleText.length > NAME_START ? titleText.slice(NAME_START) : "";

  const [firstWord, ...rest] = profText.split(" ");
  const restWords = rest.join(" ");

  const [longestFirst, ...longestRest] = longestProf.split(" ");
  const longestRestWords = longestRest.join(" ");

  const cursor = <span style={{ opacity: cursorOn ? 1 : 0 }}>|</span>;

  return (
    <div className="flex h-screen w-full relative z-10 overflow-hidden bg-black">
      {!isMobile && (
        <video
          src="/video/bgVideoMain.webm"
          poster="/images/poster.webp"
          autoPlay muted playsInline loop
          className="absolute top-[30%] left-0 w-full h-full object-cover z-[-1px]"
          preload="metadata"
        />
      )}
      {isMobile && (
        <Image
          src="/images/poster.webp"
          alt="Background"
          fill priority sizes="100vw"
          className="absolute top-[30%] left-0 w-full h-full object-cover z-[-1px]"
        />
      )}

      <div className="mx-auto md:max-w-[80%] max-w-[90%] w-full">
        <div className="text-white absolute top-[30%] md:top-[30%]">

          {/* Title line */}
          <h1 className="md:text-4xl text-2xl w-fit">
            {plainPart}
            <b className="text-orange-500">{namePart}</b>
            {cursor}
          </h1>

          {/* Profession line */}
          <div className="md:mt-4 mt-2 md:text-6xl text-3xl min-h-[60px] md:min-h-[80px]">
            <h1 className="font-extrabold relative w-fit">
              <span className="invisible whitespace-nowrap">
                {longestFirst}{" "}
                <span>{longestRestWords}</span>
              </span>
              <span className="absolute left-0 top-0 whitespace-nowrap">
                {firstWord}{restWords && " "}
                <span className="text-orange-500">{restWords}</span>
                {cursor}
              </span>
            </h1>
          </div>

          <p className="w-full max-w-[600px] text-justify text-white text-sm md:text-base md:mt-4 md:font-semibold">
            Full-Stack Developer skilled in React.js, Next.js, Node.js, TypeScript, and GraphQL,
            building high-performance, scalable web applications. Gained hands-on experience through
            internships at Codage Habitation and Webcreta Technologies, delivering real-world projects
            using the MERN stack and modern tools like Prisma ORM and PostgreSQL.
          </p>

        </div>
      </div>
    </div>
  );
}