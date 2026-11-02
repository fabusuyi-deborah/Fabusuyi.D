import type { Metadata } from "next";
import { Console } from "@/components/console/Console";

export const metadata: Metadata = {
  title: "Console",
  description: "Explore Deborah Fabusuyi's portfolio from an interactive terminal.",
};

export default function TerminalPage() {
  return (
    <main>
      <h1 className="sr-only">Portfolio console</h1>
      <Console />
    </main>
  );
}
