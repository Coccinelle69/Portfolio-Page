import { useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import i18next from "@/locales/i18next";

const Footer = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.value);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 items-center">
        <p className="text-slate-400">{t("rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
