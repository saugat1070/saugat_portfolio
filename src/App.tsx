import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SectionIndex } from "./components/SectionIndex";
import { AboutSection } from "./components/AboutSection";
import { WorkSection } from "./components/WorkSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { TeachingSection } from "./components/TeachingSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div
      id="top"
      className="min-h-screen overflow-x-clip bg-bg pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-10 text-ink transition-colors duration-300"
    >
      <Navbar />
      <Hero />

      <main className="mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionIndex />
        <AboutSection />
        <WorkSection />
        <ProjectsSection />
        <TeachingSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
