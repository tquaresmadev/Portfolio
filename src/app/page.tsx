import SkillsBar from "@/components/SkillsBar";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg font-sans">
      <SkillsBar />
      <ProjectCarousel />
    </div>
  );
}
