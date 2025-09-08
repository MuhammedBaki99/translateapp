"use client"

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";

type TranslatedBoxProps = {
  translatedText: string;
  translatedLanguage: string;
  setTranslatedLanguage: Dispatch<SetStateAction<string>>;
};

export default function TranslatedBox({
  translatedText,
  translatedLanguage,
  setTranslatedLanguage,
}: TranslatedBoxProps) {
  const dropdownLanguages = ["Turkish", "German", "Spanish"];
  const topLanguages = ["English", "French"];

  return (
    <AnimatePresence>
      <motion.div
        key="translated-box"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80, damping: 18 }}
        className="h-fit md:h-100 flex flex-col justify-between bg-secondary p-1 md:p-5 rounded-2xl border-2 border-accent shadow-none"
      >
        <Toaster />
        <div className="flex items-center flex-wrap justify-between gap-4 p-1 md:p-4 text-muted-foreground text-2xl shadow-none">
          <div className="flex items-center flex-wrap md:gap-4">
            {topLanguages.map((lang) => {
              const isSelected = translatedLanguage === lang;
              return (
                <motion.div
                  key={lang}
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <Button
                    variant="default"
                    className={`border-accent cursor-pointer hover:bg-accent text-xl shadow-none text-white ${isSelected ? "bg-accent" : "bg-secondary"}`}
                    size="sm"
                    onClick={() => setTranslatedLanguage(lang)}
                    style={{
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                  >
                    {lang}
                  </Button>
                </motion.div>
              );
            })}
            <div className="inline-block shadow-none">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Button
                      variant="outline"
                      className={`border-accent cursor-pointer hover:bg-accent text-xl shadow-none text-white ${dropdownLanguages.includes(translatedLanguage) ? "bg-accent" : "bg-secondary"}`}
                      size="sm"
                    >
                      {dropdownLanguages.includes(translatedLanguage)
                        ? translatedLanguage
                        : "Other"}
                      <Icon icon="mdi:chevron-down" width="20" height="20" className="ml-1" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {dropdownLanguages.map((lang) => {
                    const isSelected = translatedLanguage === lang;
                    return (
                      <AnimatePresence key={lang}>
                        <motion.div
                          layout
                          initial={{ backgroundColor: "var(--secondary)" }}
                          animate={{
                            backgroundColor: `${isSelected ? "bg-accent" : "bg-secondary"}`,
                            color: `${isSelected ? "white" : ""}`,
                          }}
                          exit={{ backgroundColor: "var(--secondary)" }}
                          transition={{ duration: 0.3 }}
                        >
                          <DropdownMenuItem
                            onClick={() => setTranslatedLanguage(lang)}
                            className={isSelected ? "bg-accent text-white" : "bg-secondary"}
                            style={{
                              transition: "background-color 0.3s, color 0.3s",
                            }}
                          >
                            {lang}
                          </DropdownMenuItem>
                        </motion.div>
                      </AnimatePresence>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Button variant={"default"} className="w-fit bg-transparent shadow-none border-3 border-accent">
            <Image src={"/Horizontal_top_left_main.svg"} width={20} height={10} alt="değiştirme ikonu" />
          </Button>
        </div>
        <Separator className="my-2 bg-accent" />
        <div className="h-full">
          <h1
            className="font-bold !text-xl text-muted-foreground p-4 w-full h-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none">
            {translatedText || ""}
          </h1>
        </div>
        <div className="flex gap-4 text-accent shadow-none">
          <Button variant="default" className="bg-transparent text-accent border-2 border-accent p-1 rounded-xl shadow-none" size="icon">
            <Image src={"/sound_max_fill.svg"} alt="ses iconu" width={70} height={70} />
          </Button>
          <Button variant="default" className="bg-transparent text-accent border-2 p-1 rounded-xl shadow-none" size="icon"
            // Kopyala butonuna tıklandığında çalışır
            onClick={() => {
              // Eğer çeviri metni boş değilse kopyala
              if (translatedText !== "") {
                if (navigator && navigator.clipboard) {
                  navigator.clipboard.writeText(translatedText);
                  toast.success("Kopyalandı"); // Başarılı kopyalama bildirimi
                }
              } else {
                // Çeviri metni boş olduğu için kopyalanamadı uyarısı
                toast.warning("Kopyalanamadı: Çeviri metni boş");
              }
            }}>
            <Image src={"/Copy.svg"} alt="ses iconu" width={70} height={70} />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}