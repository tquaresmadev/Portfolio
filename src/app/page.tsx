import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg font-sans text-fg">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsGrid />
      <ContactSection />
      <Footer />
    </div>
  );
}
