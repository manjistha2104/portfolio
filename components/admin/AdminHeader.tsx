"use client";

import { useEffect, useState } from "react";
import { handleApiResponse } from "@/lib/api";

type AdminUser = {
  first_name?: string;
  last_name?: string;
  email?: string;
};

export default function AdminHeader({ title }: { title: string }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await handleApiResponse(response);
        setAdmin(data);
      } catch {
        setAdmin(null);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your portfolio content with a clean admin workspace.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-sm font-semibold text-slate-900">
            {[admin?.first_name, admin?.last_name].filter(Boolean).join(" ") ||
              "Admin"}
          </p>
          <p className="text-xs text-slate-500">
            {admin?.email || "admin@example.com"}
          </p>
        </div>
      </div>
    </div>
  );
}