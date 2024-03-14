"use client";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import Tab from "./Tab";
import { useTranslation } from "react-i18next";
import i18next from "@/locales/i18next";
import { useSelector } from "react-redux";

const AboutSection = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.value);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const TAB_DATA = [
    {
      title: t("skills"),
      id: "skills",
      content: (
        <ul className="list-disc pl-2">
          <li>JavaScript</li>
          <li>React</li>
          <li>NextJs</li>
          <li>React Native</li>
          <li>TypeScript</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>Mongoose</li>
          <li>TDD</li>
        </ul>
      ),
    },
    {
      title: t("education"),
      id: "education",
      content: (
        <ul className="list-disc pl-2">
          <li>{t("capsule")}</li>
          <li>{t("economy")}</li>
        </ul>
      ),
    },
    {
      title: t("certifications"),
      id: "certifications",
      content: (
        <ul className="list-disc pl-2">
          <li>{t("master")}</li>
          <li>{t("bachelor")}</li>
        </ul>
      ),
    },
  ];

  return (
    <section className="text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/assets/about.jpg" alt="about" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="font-bold text-white text-4xl mb-4">{t("about")}</h2>
          <p className="text-base lg:text-lg">
            {t("aboutMeText")}
            {/* I am a fullstack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Next12/14, Redux, React Native,
            Node.js, Express, Mongoose, HTML, CSS, and Git. I am a fast learner
            and I am always looking to expand my knowledge and skill set. I am a
            team player and love to work and exchange ideas with others. */}
          </p>
          <div className="flex flex-row mt-8">
            <Tab
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {t("skills")}
            </Tab>
            <Tab
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {t("education")}
            </Tab>
            <Tab
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {t("certifications")}
            </Tab>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((tabEl) => tabEl.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
