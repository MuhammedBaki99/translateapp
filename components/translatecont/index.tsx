"use client";

import { useState } from "react";
import TranslatingBox from "../translatingbox";
import TranslatedBox from "../translatedbox";

export default function TranslateCont() {
  const [translatingText, setTranslatingText] = useState("Hello, how are you");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Spanish");
  const [translatedLanguage, setTranslatedLanguage] = useState("English");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    const langCode =
      selectedLanguage === "Detect Language"
        ? "auto"
        : selectedLanguage === "English"
        ? "en"
        : selectedLanguage === "French"
        ? "fr"
        : selectedLanguage === "Turkish"
        ? "tr"
        : selectedLanguage === "German"
        ? "de"
        : selectedLanguage === "Spanish"
        ? "es"
        : "en";
    const translatedlangCode =
      translatedLanguage === "Detect Language"
        ? "auto"
        : translatedLanguage === "English"
        ? "en"
        : translatedLanguage === "French"
        ? "fr"
        : translatedLanguage === "Turkish"
        ? "tr"
        : translatedLanguage === "German"
        ? "de"
        : translatedLanguage === "Spanish"
        ? "es"
        : "en";
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      translatingText
    )}&langpair=${langCode}|${translatedlangCode}`;

    setIsTranslating(true);
    setTranslatedText(""); // Optionally clear previous translation while loading

    try {
      const res = await fetch(url);
      const data = await res.json();

      setTranslatedText(data.responseData.translatedText || "");
    } catch (err) {
      console.error(err);
      setTranslatedText("Çeviri sırasında bir hata oluştu.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
      <TranslatingBox
        translatingText={translatingText}
        setTranslatingText={setTranslatingText}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onTranslate={handleTranslate}
      />
      <div className="relative">
        {isTranslating && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary bg-opacity-80 z-10 rounded-2xl">
            <span className="text-xl font-bold text-accent">Çeviriliyor...</span>
          </div>
        )}
        <TranslatedBox
          translatedText={translatedText}
          translatedLanguage={translatedLanguage}
          setTranslatedLanguage={setTranslatedLanguage}
        />
      </div>
    </div>
  );
}
