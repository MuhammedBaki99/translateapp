import TranslateCont from "@/components/translatecont";
import TranslatedBox from "@/components/translatedbox";
import TranslatingBox from "@/components/translatingbox";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-9/10 h-screen mx-auto flex flex-col items-center justify-center gap-20">
      <Image src={"/logo.svg"} width={200} height={20} alt="translate app logo" />
      <TranslateCont />
    </div>
  );
}
