import { Sidebar } from "@/components/shared/Sidebar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <>
      {/* Skip to content — must be first focusable element in DOM */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-400 text-black px-4 py-2 rounded z-50 font-semibold"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main
          id="main-content"
          className="flex-1 lg:ml-60 min-w-0 pt-16 lg:pt-0"
        >
          <HeroSection />
          <AboutSection />
          <section
            id="portfolio"
            className="min-h-screen py-20 px-6 lg:px-12"
          />
          <section id="contact" className="min-h-screen py-20 px-6 lg:px-12" />
        </main>
      </div>
    </>
  );
}
