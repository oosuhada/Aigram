'use client';

import React, { useState, useEffect } from "react";
import { translations } from "../data/translations";
import { LanguageContext } from "./contexts";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ko");
  const [location, setLocation] = useState("South Korea");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    const savedLoc = localStorage.getItem("location");
    if (savedLang) setLanguage(savedLang);
    if (savedLoc) setLocation(savedLoc);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    localStorage.setItem("location", location);
  }, [language, location]);

  const changeLocation = (loc) => {
    setLocation(loc);
    if (loc !== "South Korea") {
      setLanguage("en");
    } else {
      setLanguage("ko");
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, location, changeLocation, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
