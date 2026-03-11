"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderPlus,
  Eye,
  UserRoundCog,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Project Form", href: "/admin/project-form", icon: FolderPlus },
  { label: "Project View", href: "/admin/project-view", icon: Eye },
  { label: "Edit Profile", href: "/admin/edit-profile", icon: UserRoundCog },
];

export default function AdminSidebar({
  collapsed,
}: {
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className={`flex h-screen flex-col bg-gradient-to-b from-cyan-600 via-sky-600 to-emerald-600 text-white transition-all duration-300 ${
        collapsed ? "w-[90px]" : "w-[260px]"
      }`}
    >
      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-sky-700">
            P
          </div>

          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold">Portfolio</p>
              <p className="text-xs text-white/80">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex-1 space-y-2 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-white font-semibold text-sky-700"
                  : "hover:bg-white/20"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}