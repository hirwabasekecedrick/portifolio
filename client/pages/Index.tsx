import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import HostedWebsites from "@/components/portfolio/HostedWebsites";
import Contact from "@/components/portfolio/Contact";
import VisualFX from "@/components/effects/VisualFX";

export default function Index() {
  return (
    <div className="min-h-screen relative">
      <VisualFX />
      <div className="relative z-10">
        <section id="home">
          <Hero />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <HostedWebsites />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}
