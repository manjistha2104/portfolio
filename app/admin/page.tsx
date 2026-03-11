import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/sample-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              Portfolio Platform
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Showcase your projects with a clean and modern portfolio.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              A minimal portfolio frontend where visitors can explore projects
              beautifully and the admin can manage everything from a simple
              dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white"
              >
                Explore Projects
              </a>
              <a
                href="/admin"
                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Open Admin
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
              alt="Portfolio hero"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <SectionHeading
          badge="Projects"
          title="Selected work and featured builds"
          description="Browse projects with clear details, technology tags, and quick actions."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}