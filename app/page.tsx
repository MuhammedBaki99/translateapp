import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Image src={"/logo.svg"} width={200} height={20} alt="translate app logo" />
   </div>
  );
}
