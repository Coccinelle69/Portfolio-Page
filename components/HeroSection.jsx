"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion, useScroll } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18next from "@/locales/i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "@/reducers/language";
import Button from "./Button";

const HeroSection = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.value);
  const { t } = useTranslation();
  const [key, setKey] = useState(0);
  const changeLanguageHandler = (lang) => {
    i18next.changeLanguage(lang);
    dispatch(changeLanguage(lang));
    setKey((prevKey) => prevKey + 1);
  };

  const handleDownload = () => {
    let url = "/cvs/";
    if (language === "de") {
      url += "de.pdf";
    } else if (language === "fr") {
      url += "fr.pdf";
    } else {
      url += "en.pdf";
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = `CV_Marcela-Maria_Skrbin_${language}.pdf`; // Specify the filename here
    link.target = "_blank"; // Add target="_blank" to open in a new tab
    link.click();
  };

  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-7 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl sm:mb-8 lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-700">
              {t("introduction")}{" "}
            </span>
            <br />
            <TypeAnimation
              key={key}
              sequence={[
                "Marcela",
                1000,
                `${t("web")}`,

                1000,
                `${t("mobile")}`,
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>

          <div>
            <Button onChange={changeLanguageHandler} langAbr="en">
              {t("English")}
            </Button>
            <Button onChange={changeLanguageHandler} langAbr="fr">
              {t("French")}
            </Button>
            <Button onChange={changeLanguageHandler} langAbr="de">
              {t("German")}
            </Button>

            <div>
              <button
                onClick={handleDownload}
                className="px-1 py-1 w-full   sm:w-fit mt-3 rounded-full bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-800 text-white "
              >
                <span className="block bg-[#221c25] rounded-full hover:bg-slate-900 px-5 py-2">
                  {t("download")}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-5 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[330px] lg:h-[330px] relative">
            <Image
              src="/assets/hero-modified.png"
              alt="Cartoon hero"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={200}
              height={200}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
