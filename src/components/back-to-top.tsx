"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { FRAMER_FADE_IN_OUT } from "@/lib/constants";

import { Button } from "./ui/button";

export function BackToTop() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const currentPosition = window.scrollY;

    const scrollPercentage =
      (currentPosition / (fullHeight - windowHeight)) * 100;

    setScrollPercentage(scrollPercentage);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {scrollPercentage > 15 && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-20 mx-auto flex w-full justify-center bg-gradient-to-b from-transparent to-zinc-950"
          {...FRAMER_FADE_IN_OUT}
        >
          <Button
            className="mb-4 w-fit rounded-full"
            variant="secondary"
            size="sm"
            onClick={() =>
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            <ArrowUpIcon className="mr-1 inline-flex" size={14} /> Back to Top
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
