import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Github,
  Layers3,
} from "lucide-react";

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

async function getProject(slug: string): Promise<BackendProject | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!baseUrl) return null;

    const response = await fetch(`${baseUrl}/projects/${slug}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const techStack = project.tech_stack
    ? project.tech_stack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_28%),radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_24%),linear-gradient(to_bottom,_#020617,_#0f172a)]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <img
                src={
                  project.image_url ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                }
                alt={project.name}
                className="h-[420px] w-full rounded-[24px] object-cover"
              />
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              {project.category || "Project"}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              {project.name}
            </h1>

            <p className="mt-3 text-sm font-medium text-slate-400">
              Project Code: {project.code}
            </p>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
                  <Layers3 size={20} />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Project Overview
                </h2>
              </div>

              <div
                className="prose prose-invert max-w-none text-slate-300"
                dangerouslySetInnerHTML={{
                  __html: project.description || "No description available.",
                }}
              />
            </div>

            {techStack.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]"
                >
                  <ExternalLink size={16} />
                  Visit Live Project
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}

              {project.file_url && (
                <a
                  href={project.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5"
                >
                  <FileText size={16} />
                  Open File
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}