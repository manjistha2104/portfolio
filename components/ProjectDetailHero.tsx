import { ExternalLink, FileText, Github } from "lucide-react";
import { ProjectItem } from "@/types/project";

type Props = {
  project: ProjectItem;
};

export default function ProjectDetailHero({ project }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            {project.category}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
            {project.name}
          </h1>

          <p className="mt-3 text-base text-slate-400">
            Project Code: {project.code}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            {project.longDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-100"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]"
              >
                <ExternalLink size={16} />
                Visit Project
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5"
              >
                <Github size={16} />
                Source Code
              </a>
            )}

            {project.file && (
              <a
                href={project.file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/15"
              >
                <FileText size={16} />
                Open File
              </a>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/50">
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}