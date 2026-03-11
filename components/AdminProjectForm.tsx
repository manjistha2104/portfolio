"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  X,
  FileText,
  Globe,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Undo2,
  Code2,
  Upload,
  Paperclip,
  Save,
} from "lucide-react";
import { handleApiResponse } from "@/lib/api";

type Project = {
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
};

type FormState = {
  name: string;
  code: string;
  liveUrl: string;
  githubUrl: string;
  category: string;
  techstack: string;
  description: string;
  imageFile: File | null;
  imagePreview: string;
  imageName: string;
  fileUpload: File | null;
  fileName: string;
};

const initialState: FormState = {
  name: "",
  code: "",
  liveUrl: "",
  githubUrl: "",
  category: "",
  techstack: "",
  description: "",
  imageFile: null,
  imagePreview: "",
  imageName: "",
  fileUpload: null,
  fileName: "",
};

export default function AdminProjectForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [form, setForm] = useState<FormState>(initialState);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [loading, setLoading] = useState(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isEditMode = Boolean(editId);

  useEffect(() => {
    const loadProject = async () => {
      if (!editId) return;

      try {
        const response = await fetch(`/api/projects/${editId}`, {
          cache: "no-store",
        });
        const project: Project = await handleApiResponse(response);

        setForm({
          name: project.name || "",
          code: project.code || "",
          liveUrl: project.live_url || "",
          githubUrl: project.github_url || "",
          category: project.category || "",
          techstack: project.tech_stack || "",
          description: project.description || "",
          imageFile: null,
          imagePreview: project.image_url || "",
          imageName: "",
          fileUpload: null,
          fileName: "",
        });

        if (editorRef.current) {
          editorRef.current.innerHTML = project.description || "";
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to load project.");
      }
    };

    loadProject();
  }, [editId]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: imageUrl,
      imageName: file.name,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      fileUpload: file,
      fileName: file.name,
    }));
  };

  const formatDoc = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);

    setForm((prev) => ({
      ...prev,
      description: editorRef.current?.innerHTML || "",
    }));
  };

  const handleEditorInput = () => {
    setForm((prev) => ({
      ...prev,
      description: editorRef.current?.innerHTML || "",
    }));
  };

  const clearForm = () => {
    setForm(initialState);

    if (editorRef.current) editorRef.current.innerHTML = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (isEditMode) {
      router.push("/admin/project-form");
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.code.trim() || !form.description.trim()) {
      alert("Project name, code, and description are required.");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("code", form.code);
      payload.append("category", form.category);
      payload.append("description", form.description);
      payload.append("tech_stack", form.techstack);
      payload.append("live_url", form.liveUrl);
      payload.append("github_url", form.githubUrl);
      payload.append("is_featured", "false");

      if (form.imageFile) {
        payload.append("image", form.imageFile);
      }

      if (form.fileUpload) {
        payload.append("file", form.fileUpload);
      }

      const url = isEditMode ? `/api/projects/${editId}` : "/api/projects";

      const response = await fetch(url, {
        method: "POST",
        body: payload,
      });

      const data = await handleApiResponse(response);

      alert(data?.message || "Project saved successfully.");
      router.push("/admin/project-view");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit();
  };

  const techItems = form.techstack
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <form
        onSubmit={onFormSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {isEditMode ? "Edit Project" : "Create New Project"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {isEditMode
                ? "Update project information below."
                : "Add complete project information from the form below."}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Project Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Enter project name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Project Code
            </label>
            <input
              name="code"
              value={form.code}
              onChange={onChange}
              placeholder="Enter project code"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={onChange}
              placeholder="Portfolio, Dashboard"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Live URL
            </label>
            <input
              name="liveUrl"
              value={form.liveUrl}
              onChange={onChange}
              placeholder="https://example.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              GitHub / Source URL
            </label>
            <input
              name="githubUrl"
              value={form.githubUrl}
              onChange={onChange}
              placeholder="https://github.com/project"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Upload Project Image
            </label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700"
            >
              <Upload size={18} />
              {form.imageName ? "Change Image" : "Upload Image"}
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Upload Project File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700"
            >
              <Paperclip size={18} />
              {form.fileName ? "Change File" : "Upload File"}
            </button>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Tech Stack
            </label>
            <textarea
              name="techstack"
              value={form.techstack}
              onChange={onChange}
              placeholder="Next.js, Laravel, PostgreSQL"
              rows={5}
              className="w-full rounded-2xl border border-slate-200 px-4 py-4 outline-none focus:border-sky-400"
            />
          </div>

          <div className="md:col-span-2">
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="block text-sm font-semibold text-slate-800">
                Project Description
              </label>

              <div className="inline-flex rounded-full bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("editor")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    activeTab === "editor"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600"
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    activeTab === "preview"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600"
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>

            {activeTab === "editor" ? (
              <div className="overflow-hidden rounded-3xl border border-slate-200">
                <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3">
                  <button
                    type="button"
                    onClick={() => formatDoc("bold")}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700"
                  >
                    <Bold size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => formatDoc("italic")}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700"
                  >
                    <Italic size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => formatDoc("formatBlock", "H2")}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700"
                  >
                    <Heading2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => formatDoc("insertUnorderedList")}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700"
                  >
                    <List size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => formatDoc("insertOrderedList")}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700"
                  >
                    <ListOrdered size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => formatDoc("undo")}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700"
                  >
                    <Undo2 size={16} />
                  </button>
                </div>

                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleEditorInput}
                  className="min-h-[220px] bg-white px-4 py-4 text-slate-900 outline-none"
                  style={{ whiteSpace: "pre-wrap" }}
                  data-placeholder="Write a rich project description..."
                />
              </div>
            ) : (
              <div className="min-h-[220px] rounded-3xl border border-slate-200 bg-slate-50 p-5">
                {form.description ? (
                  <div
                    className="prose max-w-none prose-slate"
                    dangerouslySetInnerHTML={{ __html: form.description }}
                  />
                ) : (
                  <p className="text-sm text-slate-500">
                    No description preview available yet.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isEditMode ? <Save size={18} /> : <Plus size={18} />}
            {loading
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
              ? "Update Project"
              : "Add Project"}
          </button>

          <button
            type="button"
            onClick={clearForm}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700"
          >
            <X size={18} />
            Clear Form
          </button>
        </div>
      </form>

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Live Preview</h3>
              <p className="mt-1 text-sm text-slate-500">
                Preview current project information
              </p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-700">
              <ImageIcon size={18} />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <div className="h-56 bg-slate-200">
              {form.imagePreview ? (
                <img
                  src={form.imagePreview}
                  alt={form.name || "Preview"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center text-slate-500">
                  No image selected
                </div>
              )}
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {form.category || "Project Category"}
                  </p>
                  <h4 className="mt-2 text-xl font-bold text-slate-900">
                    {form.name || "Project Name"}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    Code: {form.code || "PROJECT-001"}
                  </p>
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm">
                  <Code2 size={18} />
                </div>
              </div>

              {techItems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {techItems.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="rounded-2xl bg-white p-4">
                {form.description ? (
                  <div
                    className="prose max-w-none prose-sm prose-slate"
                    dangerouslySetInnerHTML={{ __html: form.description }}
                  />
                ) : (
                  <p className="text-sm text-slate-500">
                    Your project description preview will appear here.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {form.liveUrl && (
                  <a
                    href={form.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    <Globe size={16} />
                    Live URL
                  </a>
                )}

                {form.fileName && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                    <FileText size={16} />
                    {form.fileName}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block;
        }
      `}</style>
    </div>
  );
}