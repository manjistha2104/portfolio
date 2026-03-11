"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink, Github, Eye, X, FileText } from "lucide-react";

type Project = {
  id: string;
  slug: string;
  name: string;
  code: string;
  description: string;
  longDescription?: string;
  image: string;
  file?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  category: string;
  featured?: boolean;
};

export default function ProjectCard({ project }: { project: Project }) {
  const [showPreview, setShowPreview] = useState(false);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );

  const previewDescription = useMemo(() => {
    return project.longDescription || project.description;
  }, [project.longDescription, project.description]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return (
    <>
      <div
        className="group relative transition-transform duration-200"
        style={{ transform, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 rounded-[28px] bg-cyan-400/10 blur-2xl opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-2xl shadow-black/20 transition duration-300 group-hover:-translate-y-1">
          <div className="relative h-64 overflow-hidden bg-slate-100">
            <img
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

            <div className="absolute inset-x-0 bottom-0 flex translate-y-8 flex-wrap items-center justify-center gap-2 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:scale-105"
              >
                <Eye size={16} />
                Preview
              </button>

              

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
                >
                  <ExternalLink size={16} />
                  Live
                </a>
              )}
            </div>

            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
              {project.category}
            </span>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Code: {project.code}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              >
                <Eye size={18} />
              </button>
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
              {project.description}
            </p>

            {project.techStack.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Details
              </Link>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink size={15} />
                  Live
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Github size={15} />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950 text-white shadow-2xl shadow-black/50">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={20} />
            </button>

            <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[320px] bg-slate-900">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8">
                <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  {project.category}
                </span>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {project.name}
                </h2>

                <p className="mt-2 text-sm font-medium text-slate-400">
                  Project Code: {project.code}
                </p>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    Project Overview
                  </h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">
                    {previewDescription}
                  </p>
                </div>

                {project.techStack.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-lg font-semibold text-white">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
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
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900"
                    onClick={() => setShowPreview(false)}
                  >
                    <Eye size={16} />
                    Open Details Page
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white"
                    >
                      <ExternalLink size={16} />
                      Visit Live
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-white/5"
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
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-white/5"
                    >
                      <FileText size={16} />
                      Open File
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close preview"
            className="absolute inset-0 -z-10"
            onClick={() => setShowPreview(false)}
          />
        </div>
      )}
    </>
  );
}