import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Milestones from "@/components/sections/Milestones";
import TeacherExperience from "@/components/sections/TeacherExperience";
import StudentExperience from "@/components/sections/StudentExperience";
import ParentExperience from "@/components/sections/ParentExperience";
import LearningAreas from "@/components/sections/LearningAreas";
import ResearchStats from "@/components/sections/ResearchStats";
import ForProviders from "@/components/sections/ForProviders";
import FooterCTA from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <Milestones />
        <TeacherExperience />
        <StudentExperience />
        <ParentExperience />
        <LearningAreas />
        <ResearchStats />
        <ForProviders />
      </main>
      <FooterCTA />
    </>
  );
}
