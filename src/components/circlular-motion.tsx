"use client";

import { MotionStyle, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export function CircularMotion({
  className,
  radius,
  speed,
  children,
}: {
  className?: string;
  radius: number;
  speed: number;
  children: React.ReactNode;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isPageVisible = useRef(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isPageVisible.current = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const angle = (Date.now() * (speed / 1000)) % 360;
      const x = radius * Math.cos(angle * (Math.PI / 180));
      const y = radius * Math.sin(angle * (Math.PI / 180));
      setPosition({ x, y });
    };

    const updateInterval = setInterval(updatePosition, 16);

    return () => clearInterval(updateInterval);
  }, [radius, speed]);

  return (
    <motion.div
      className={className}
      initial={{ translateX: 0, translateY: 0 }}
      animate={{ translateX: position.x, translateY: position.y }}
    >
      {children}
    </motion.div>
  );
}
