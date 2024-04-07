"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/image-slider";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Landing() {
  const images = [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBpenphfGVufDB8fDB8fHww",
  ];
  return (
    <ImagesSlider className="h-screen" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold font-Anta text-xl md:text-4xl lg:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-400 to-neutral-50 py-4">
          You deserve the best Pizza around you
          <div className="font-extrabold text-3xl tracking-tight md:text-5xl lg:text-7xl font-ProtestRevolution text-primary">
            Pizza Theatre
          </div>
        </motion.p>
        <Link href="/menu">
          <Button className="px-4 py-2 backdrop-blur-sm border bg-primary text-primary-content mx-auto text-center rounded-full relative mt-4 font-Annapura">
            <div>Let&apos;s Have a Taste →</div>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />
          </Button>
        </Link>
      </motion.div>
    </ImagesSlider>
  );
}
