import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import TeacherExperience from "@/components/sections/TeacherExperience";
import StudentExperience from "@/components/sections/StudentExperience";
import ParentExperience from "@/components/sections/ParentExperience";
import Milestones from "@/components/sections/Milestones";
import ResearchStats from "@/components/sections/ResearchStats";
import ForProviders from "@/components/sections/ForProviders";
import PersonaFooter from "@/components/persona/PersonaFooter";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <TeacherExperience />
        <StudentExperience />
        <ParentExperience />
        <Milestones />
        <ResearchStats />
        <ForProviders />
      </main>
      <PersonaFooter />
    </>
  );
}
