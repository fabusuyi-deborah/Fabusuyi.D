import { Hero } from "@/components/sections/Hero";
import { Works } from "@/components/sections/Works";
import { Writing } from "@/components/sections/Writing";
import { About } from "@/components/sections/About";
import { Speaking } from "@/components/sections/Speaking";
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Works />
        <Writing />
        <About />
        <Speaking />
      </main>
    </>
  );
}
