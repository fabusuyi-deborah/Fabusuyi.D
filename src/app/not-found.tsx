import Link from "next/link";
import { CONSOLE_PATH } from "@/lib/theme";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col justify-center gap-6 py-20">
      <p className="label">Error 404 · signal lost</p>
      <h1 className="display m-0 text-[clamp(96px,22vw,320px)] leading-[0.8]">404</h1>
      <p className="max-w-[46ch] text-lg text-muted">This page drifted off the grid. Head back home, or find it from the console.</p>
      <div className="flex flex-wrap gap-2.5">
        <Link href="/" className="btn btn-solid no-underline">Back home</Link>
        <Link href={CONSOLE_PATH} className="btn no-underline">Open console</Link>
      </div>
    </main>
  );
}
