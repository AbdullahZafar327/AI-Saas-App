"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHero = () => {
    const {isSignedIn} = useAuth()
  return (
    <div className="font-bold text-white py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl nmd:text-6xl lg:text-7xl font-extrabold space-y-5">
        <h1>The best AI Tool for</h1>
        <div className="bg-clip-text text-transparent bg-gradient-to-tr from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: ["chatbot.", "Image Generation", "Code Generation"],
              autoStart:true,
              loop:true
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
         create content using AI 10x faster
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up" }>
           <Button variant="premium" className="font-semibold  text-white p-4 lg:p-6 rounded-full md:text-xl">
             Start Generating for free
           </Button>
        </Link>
      </div>
      <div className="text-xs md:text-sm font-normal text-zinc-400">
          No Credit card is required.
      </div>
    
    </div>
  );
};

export default LandingHero;
