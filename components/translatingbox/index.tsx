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

type TranslatingBoxProps = {
  translatingText: string;
  setTranslatingText: Dispatch<SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  onTranslate: () => void;
};

export default function TranslatingBox({
  translatingText,
  setTranslatingText,
  selectedLanguage,
  setSelectedLanguage,
  onTranslate,
}: TranslatingBoxProps) {
  const dropdownLanguages = ["Turkish", "German", "Spanish"];
  const topLanguages = ["English", "French"];

  return (
    <AnimatePresence>
      <motion.div
        key="translating-box"
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
              const isSelected = selectedLanguage === lang;
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
                    onClick={() => setSelectedLanguage(lang)}
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
                      className={`border-accent cursor-pointer hover:bg-accent text-xl shadow-none text-white ${dropdownLanguages.includes(selectedLanguage) ? "bg-accent" : "bg-secondary"}`}
                      size="sm"
                    >
                      {dropdownLanguages.includes(selectedLanguage)
                        ? selectedLanguage
                        : "Other"}
                      <Icon icon="mdi:chevron-down" width="20" height="20" className="ml-1" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {dropdownLanguages.map((lang) => {
                    const isSelected = selectedLanguage === lang;
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
                            onClick={() => setSelectedLanguage(lang)}
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
        </div>
        <Separator className="my-2 bg-accent" />
        <div className="h-full">
          <Textarea
            value={translatingText}
            onChange={(e) => setTranslatingText(e.target.value)}
            maxLength={500}
            className="font-bold !text-xl text-muted-foreground p-4 w-full h-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
          />
        </div>
        <div className="flex justify-end text-sm text-muted-foreground pr-2 pb-1">
          {translatingText.length} / 500
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-accent shadow-none">
            <Button variant="default" className="bg-transparent text-accent border-2 border-accent p-1 rounded-xl shadow-none" size="icon">
              <Image src={"/sound_max_fill.svg"} alt="ses iconu" width={70} height={70} />
            </Button>
            <Button
              variant="default"
              className="bg-transparent text-accent border-2 p-1 rounded-xl shadow-none"
              size="icon"
              onClick={() => {
                if (navigator && navigator.clipboard) {
                  navigator.clipboard.writeText(translatingText);
                  toast.success("Kopyalandı")
                }
              }}
            >
              <Image src={"/Copy.svg"} alt="kopyala iconu" width={70} height={70} />
            </Button>
          </div>
          <div className="flex justify-end items-center py-2 shadow-none">
            <Button
              className="bg-chart-2 border border-chart-1 text-white flex gap-4 items-center px-8 py-2 rounded-xl shadow-none"
              onClick={onTranslate}
            >
              <span className="underline text-2xl">A</span>
              <span className="font-bold">Translate</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}