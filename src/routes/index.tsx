import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { MarqueeBand } from "@/components/MarqueeBand";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollToTop } from "@/components/ScrollToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krish Mishra — Full Stack Web Developer & UI Engineer" },
      { name: "description", content: "Krish Mishra is a freelance full-stack developer & UI engineer crafting premium, high-converting web products for founders worldwide." },
      { property: "og:title", content: "Krish Mishra — Full Stack Developer & UI Engineer" },
      { property: "og:description", content: "Premium freelance web development, UI engineering, and motion design." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <MarqueeBand />
      <About />
      <Skills />
      <Services />
      <Process />
      <Projects />
      <Testimonials />
      <FAQ />
      <Contact />
      <ScrollToTop />
    </main>
  );
}

