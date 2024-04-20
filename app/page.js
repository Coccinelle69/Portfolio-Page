"use client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import language from "@/reducers/language";
import AboutSection from "@/components/AboutSection";
import EmailSection from "@/components/EmailSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import ProjectsSection from "@/components/ProjectsSection";
import AnimCursor from "@/components/AnimCursor";
import { useState, useEffect } from "react";

const store = configureStore({
  reducer: { language },
});

export default function Home() {
  const [mobileWidth, setMobileWidth] = useState();

  let windowWidth;
  if (typeof window !== "undefined") {
    windowWidth = window.innerWidth;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMobileWidth(true);
      } else {
        setMobileWidth(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [windowWidth]);
  return (
    <Provider store={store}>
      {!mobileWidth && <AnimCursor />}
      <main className="flex min-h-screen flex-col bg-[#221c25] ">
        <NavBar />
        <div className="container mt-24 mx-auto px-12 py-4">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <EmailSection />
          <Footer />
        </div>
      </main>
    </Provider>
  );
}
