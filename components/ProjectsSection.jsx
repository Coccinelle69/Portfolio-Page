"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import i18next from "@/locales/i18next";

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { t } = useTranslation();
  const language = useSelector((state) => state.language.value);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const projectsData = [
    {
      id: 1,
      title: "Hackatweet",
      description: t("project1description"),
      video: "/videos/Hackatweet.mp4",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/Coccinelle69/Hackatweet",
    },

    {
      id: 2,
      title: "Tickethack",
      description: t("project2description"),
      video: "/videos/Tickethack.mp4",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/Coccinelle69/Tickethack",
    },
    {
      id: 3,
      title: "Hangman",
      description: t("project3description"),
      video: "/videos/Hangman.mp4",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/Coccinelle69/Hangman",
    },
    {
      id: 4,
      title: "Pusher Chat",
      description: t("project4description"),
      video: "/videos/PusherChat.mp4",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/Coccinelle69/Pusher-Chat",
    },
    {
      id: 5,
      title: "Autocomplete",
      description: t("project5description"),
      video: "/videos/Autocomplete.mp4",
      tag: ["All", "Mobile"],
      gitUrl: "https://github.com/Coccinelle69/Autocomplete",
    },
  ];

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );
  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        {t("myProjectsTitle")}
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name={t("allProjects")}
          isSelected={tag === t("allProjects")}
        />
        <ProjectTag
          onClick={handleTagChange}
          name={t("webProjects")}
          isSelected={tag === t("webProjects")}
        />
        <ProjectTag
          onClick={handleTagChange}
          name={t("mobileProjects")}
          isSelected={tag === t("mobileProjects")}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              video={project.video}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
