import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { Sparkles, Layers3, Rocket } from "lucide-react";

type BackendProject = {
  id: number;
  name: string;
  code: string;
  category: string | null;
  description: string | null;
  tech_stack: string | null;
  image_url: string | null;
  file_url: string | null;
  live_url: string | null;
  github_url: string | null;
  created_at?: string;
  updated_at?: string;
};

type ProjectCardItem = {
  id: string;
  slug: string;
  name: string;
  code: string;
  description: string;
  longDescription: string;
  image: string;
  file: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  category: string;
  featured: boolean;
};

async function getProjects(): Promise<ProjectCardItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!baseUrl) {
      return [];
    }

    const response = await fetch(`${baseUrl}/projects`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data: BackendProject[] = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((project) => ({
      id: String(project.id),
      slug: String(project.id),
      name: project.name,
      code: project.code,
      description: project.description || "No description available.",
      longDescription: project.description || "No description available.",
      image:
        project.image_url ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      file: project.file_url || "",
      liveUrl: project.live_url || "",
      githubUrl: project.github_url || "",
      techStack: project.tech_stack
        ? project.tech_stack
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      category: project.category || "Project",
      featured: false,
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_28%),radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_24%),linear-gradient(to_bottom,_#020617,_#0f172a)]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Creative Portfolio System
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              Showcase Your Projects With a{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Premium Modern Design
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              A polished frontend portfolio where admin can manage project data
              and visitors can explore your work through beautiful, modern and
              responsive layouts.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]"
              >
                View Projects
              </a>

              <a
                href="/admin"
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5"
              >
                Open Admin
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Sparkles,
                  title: "Elegant UI",
                  text: "Premium glassmorphism cards and modern layout",
                },
                {
                  icon: Layers3,
                  title: "Easy Manage",
                  text: "Project upload form connected with backend data",
                },
                {
                  icon: Rocket,
                  title: "Fast Frontend",
                  text: "Built with scalable Next.js app structure",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
                      <Icon size={20} />
                    </div>

                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="portfolio hero"
                className="h-[520px] w-full rounded-[28px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          badge="Featured Work"
          title={
            <>
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Projects That Reflect Strong UI, Structure & Scalability
              </span>{" "}
            </>
          }
          description="A curated selection of projects showcasing clean UI design, scalable architecture and practical development approach."
        />

        {projects.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white">
              No Projects Available
            </h3>
            <p className="mt-3 text-slate-400">
              No project has been added yet. Please add projects from the admin
              panel.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="mt-12 rounded-[32px] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-white/5 to-blue-500/10 p-8 backdrop-blur-xl">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                Let’s Build Something Impactful Together
              </h3>

              <p className="mt-3 max-w-2xl text-slate-300">
                Explore modern, scalable projects built with clean UI,
                responsive layouts and real-world development practices.
              </p>
            </div>

            <div className="flex md:justify-end">
              <a
                href="#projects"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]"
              >
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}