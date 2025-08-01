import React from "react";
import HeroSection from "./components/HeroSection";
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <HeroSection></HeroSection>
    <div className="container mx-auto px-4 py-4 scroll-smooth">
      <MainSection></MainSection>
    </div>
    </>
  );
}
