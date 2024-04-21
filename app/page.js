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
  // const [mobileWidth, setMobileWidth] = useState();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileDevices = [
      "iphone",
      "ipad",
      "android",
      "blackberry",
      "windows phone",
      "opera mini",
      "iemobile",
    ];

    // Check if the user agent string contains any known mobile device identifiers
    const isMobileDevice = mobileDevices.some((device) =>
      userAgent.includes(device)
    );
    setIsMobile(isMobileDevice);
  }, []);

  // let windowWidth;
  // if (typeof window !== "undefined") {
  //   windowWidth = window.innerWidth;
  // }

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 768) {
  //       setMobileWidth(true);
  //     } else {
  //       setMobileWidth(false);
  //     }
  //   };

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("resize", handleResize);
  //   }

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("resize", handleResize);
  //     }
  //   };
  // }, [windowWidth]);
  return (
    <Provider store={store}>
      {!isMobile && <AnimCursor />}
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
