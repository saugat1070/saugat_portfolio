import { motion, useScroll, useSpring } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      id="top"
      className="min-h-screen overflow-x-clip bg-bg pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-10 text-ink transition-colors duration-300"
    >
      {/* Smooth scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-[100] origin-left opacity-70"
        style={{ scaleX }}
      />

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
