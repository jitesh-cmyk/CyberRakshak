
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    brand: "CyberRakshak",
    subtitle: "Digital Safety Assistant",
    heroTag: "YOUR CYBER SAFETY PARTNER",
    heroTitle: "Stay Safe. Act Fast. Recover Smart.",
    heroDescription:
      "Get simple guidance and organize your evidence when you face an online cyber incident.",
    incidentHeading: "What happened to you?",
    incidentDescription: "Select your problem to get step-by-step guidance.",
    quizTitle: "Cyber Safety Quiz",
    quizDescription: "Test your knowledge and learn how to stay safe online.",
    footer: "Educational assistance, not an official government service.",
    language: "हिन्दी"
  },

  hi: {
    brand: "साइबररक्षक",
    subtitle: "डिजिटल सुरक्षा सहायक",
    heroTag: "आपका साइबर सुरक्षा साथी",
    heroTitle: "सुरक्षित रहें। तुरंत कदम उठाएं।",
    heroDescription:
      "ऑनलाइन धोखाधड़ी होने पर सही जानकारी पाएं और अपने सबूत व्यवस्थित रखें।",
    incidentHeading: "आपके साथ क्या हुआ?",
    incidentDescription: "सही मार्गदर्शन पाने के लिए अपनी समस्या चुनें।",
    quizTitle: "साइबर सुरक्षा प्रश्नोत्तरी",
    quizDescription: "अपनी जानकारी जांचें और ऑनलाइन सुरक्षित रहना सीखें।",
    footer: "यह शैक्षिक सहायता है, कोई सरकारी सेवा नहीं।",
    language: "English"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  function toggleLanguage() {
    setLanguage((previous) => previous === "en" ? "hi" : "en");
  }

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
