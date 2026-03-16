"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimateIn({
  children,
  className,
  delay = 0,
}: AnimateInProps) {
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: prefersReduced
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
