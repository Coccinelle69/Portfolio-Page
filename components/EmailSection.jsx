"use client";
import React, { useState, useEffect } from "react";
import GithubIcon from "../public/assets/github-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import i18next from "@/locales/i18next";
import { RotatingLines } from "react-loader-spinner";

const EmailSection = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.value);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [inputFields, setInputFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailSubmitted(false);
    setError("");
    if (!EMAIL_REGEX.test(inputFields.email)) {
      setError(t("error"));
      return;
    }
    const data = {
      name: inputFields.name,
      emailClient: inputFields.email,
      subject: inputFields.subject,
      message: inputFields.message,
    };
    const JSONdata = JSON.stringify(data);

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    setIsPending(true);
    const response = await fetch(`http://localhost:3000/api/send`, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
    setIsPending(false);
    setInputFields({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setError("");
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          {t("connectTitle")}
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">{t("connectText")}</p>
        <div className="socials flex flex-row gap-2">
          <Link href="github.com">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
        </div>
      </div>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="text-white block mb-2 text-sm font-medium"
            >
              {t("name")}
            </label>
            <input
              name="name"
              type="text"
              id="name"
              required
              className="bg-[#18191E] border mb-4 border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="John Doe"
              value={inputFields.name}
              onChange={(e) =>
                setInputFields({ ...inputFields, name: e.target.value })
              }
            />
            <label
              htmlFor="email"
              className="text-white block mb-2 text-sm font-medium"
            >
              {t("email")}
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="john@google.com"
              value={inputFields.email}
              onChange={(e) =>
                setInputFields({ ...inputFields, email: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="text-white block text-sm mb-2 font-medium"
            >
              {t("subject")}
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder={t("sayingHi")}
              value={inputFields.subject}
              onChange={(e) =>
                setInputFields({ ...inputFields, subject: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="text-white block text-sm mb-2 font-medium"
            >
              {t("message")}
            </label>
            <textarea
              name="message"
              id="message"
              className="bg-[#18191E] resize-none border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder={t("talk")}
              value={inputFields.message}
              onChange={(e) =>
                setInputFields({ ...inputFields, message: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
          >
            {t("send")}
          </button>
        </form>
        {isPending && (
          <div className="flex justify-center mt-4">
            <RotatingLines
              visible={true}
              height="64"
              width="64"
              // color="grey"
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        )}
        {emailSubmitted && (
          <p className="text-green-500 text-sm mt-2">{t("success")}</p>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </section>
  );
};

export default EmailSection;
