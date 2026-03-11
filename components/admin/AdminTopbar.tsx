"use client";

import { Menu, PanelLeftClose, Search, Bell } from "lucide-react";

export default function AdminTopbar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-gradient-to-r from-cyan-600 via-sky-600 to-emerald-600 px-4 py-3 text-white shadow-md md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
          >
            {collapsed ? <Menu size={18} /> : <PanelLeftClose size={18} />}
          </button>

          <div>
            <h1 className="text-sm font-semibold md:text-base">
              Portfolio Admin Panel
            </h1>
            <p className="text-xs text-white/80">
              Manage projects, profile, and portfolio settings
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-xl border border-white/15 bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/70 outline-none"
            />
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
          >
            <Bell size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}