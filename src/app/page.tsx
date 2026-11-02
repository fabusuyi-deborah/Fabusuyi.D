import { Hero } from "@/components/sections/Hero";
import { Works } from "@/components/sections/Works";
import { Writing } from "@/components/sections/Writing";
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Works />
        <Writing />
      </main>
    </>
  );
}
