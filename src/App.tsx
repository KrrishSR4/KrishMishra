import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { Navbar } from "@/components/Navbar";
import { PageLoader } from "@/components/PageLoader";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { SmoothScroll } from "@/components/SmoothScroll";

const queryClient = new QueryClient();

function Portfolio() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="relative">
        <Hero />
        <MarqueeBand />
        <About />
        <Skills />
        <Services />
        <Process />
        <Projects />
        <FAQ />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      {!loaderDone && <PageLoader onComplete={() => setLoaderDone(true)} />}
      <Portfolio />
    </QueryClientProvider>
  );
}
