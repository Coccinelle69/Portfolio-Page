"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { useTranslation } from "react-i18next";
import i18next from "@/locales/i18next";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.value);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);
  const navLinks = [
    {
      title: t("headerAbout"),
      path: "#about",
    },
    {
      title: t("headerProjects"),
      path: "#projects",
    },
    {
      title: t("headerContact"),
      path: "#contact",
    },
  ];

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10  bg-[#221c25] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2 bg-[#221c25] z-10 ">
        <Link
          href="/"
          className="text-2xl md:text-5xl text-white font-semibold "
        >
          {t("headerLogo")}
        </Link>
        <div className="mobile-menu md:hidden block " id="navbar">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => {
              return (
                <NavLink key={index} title={link.title} href={link.path} />
              );
            })}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default NavBar;
