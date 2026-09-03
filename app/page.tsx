import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import BeyondResume from "@/components/BeyondResume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Aurora from "@/components/Aurora";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f3f0fa] overflow-x-hidden text-white">
      {/* Coloured light behind everything — what the glass surfaces blur */}
      <Aurora />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#17112f08_1px,transparent_1px),linear-gradient(to_bottom,#17112f08_1px,transparent_1px)] bg-[size:40px_40px]" />

      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Education />
        <BeyondResume />
        <Contact />
        <Footer />
        <Gallery />
      </div>
    </div>
  );
}