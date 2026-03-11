"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Pencil,
  Trash2,
  ExternalLink,
  FileText,
  Search,
  FolderOpen,
} from "lucide-react";
import { handleApiResponse } from "@/lib/api";

type Project = {
  id: number;
  name: string;
  code: string;
  live_url: string | null;
  github_url: string | null;
  category: string | null;
  description: string | null;
  tech_stack: string | null;
  image_url: string | null;
  file_url: string | null;
};

export default function AdminProjectViewPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects", { cache: "no-store" });
      const data = await handleApiResponse(response);
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((project) => {
      return (
        project.name.toLowerCase().includes(q) ||
        project.code.toLowerCase().includes(q) ||
        (project.category || "").toLowerCase().includes(q) ||
        (project.tech_stack || "").toLowerCase().includes(q)
      );
    });
  }, [projects, search]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const data = await handleApiResponse(response);
      alert(data?.message || "Project deleted successfully.");
      await loadProjects();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  return (
    <AdminLayoutShell>
      <AdminHeader title="Project View" />

      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Manage Portfolio Projects
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View, edit, and delete saved projects.
            </p>
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <div className="relative w-full md:w-[320px]">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-400"
              />
            </div>

            <Link
              href="/admin/project-form"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Add New
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-slate-500">Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-600">
            <FolderOpen size={28} />
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900">
            No projects found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Add a project from the project form page to see it here.
          </p>
          <Link
            href="/admin/project-form"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => {
            const techs = (project.tech_stack || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);

            return (
              <div
                key={project.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
               <div className="h-56 overflow-hidden bg-slate-100">
  {project.image_url ? (
    <>
      <img
        src={project.image_url}
        alt={project.name}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
          if (fallback) {
            fallback.style.display = "grid";
          }
        }}
      />

      <div className="hidden h-full place-items-center text-slate-500">
        Failed to load image
      </div>
    </>
  ) : (
    <div className="grid h-full place-items-center text-slate-500">
      No image uploaded
    </div>
  )}
</div>


                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {project.category || "Project"}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Code: {project.code}
                    </p>
                  </div>

                  <div
                    className="line-clamp-4 text-sm leading-6 text-slate-600"
                    dangerouslySetInnerHTML={{
                      __html: project.description || "",
                    }}
                  />

                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-slate-500">
                    {project.file_url && (
                      <a
                        href={project.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-slate-700 hover:underline"
                      >
                        <FileText size={16} />
                        Open File
                      </a>
                    )}

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sky-700 hover:underline"
                      >
                        <ExternalLink size={16} />
                        Visit Live URL
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={`/admin/project-form?id=${project.id}`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayoutShell>
  );
}