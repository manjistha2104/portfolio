"use client";

import { useEffect, useState } from "react";
import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
import AdminHeader from "@/components/admin/AdminHeader";
import { handleApiResponse } from "@/lib/api";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
    email: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await handleApiResponse(response);

        setForm((prev) => ({
          ...prev,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          date_of_birth: formatDateForInput(data.date_of_birth),
          email: data.email || "",
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile.");
      }
    };

    loadProfile();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          date_of_birth: form.date_of_birth,
          email: form.email,
        }),
      });

      const data = await handleApiResponse(response);
      setMessage(data?.message || "Profile updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile update failed.");
    }
  };


  function formatDateForInput(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 10);
}


  const handlePasswordChange = async () => {
    setMessage("");
    setError("");

    if (
      !form.current_password &&
      !form.new_password &&
      !form.new_password_confirmation
    ) {
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: form.current_password,
          new_password: form.new_password,
          new_password_confirmation: form.new_password_confirmation,
        }),
      });

      const data = await handleApiResponse(response);
      setMessage(data?.message || "Password changed successfully.");

      setForm((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password change failed.");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleProfileSave(e);
    await handlePasswordChange();
  };

  return (
    <AdminLayoutShell>
      <AdminHeader title="Edit Profile" />

      <div className="max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div className="md:col-span-2 mt-2">
            <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
            <p className="mt-1 text-sm text-slate-500">
              Leave blank if you do not want to change password.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              value={form.current_password}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              value={form.new_password}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm New Password
            </label>
            <input
              type="password"
              name="new_password_confirmation"
              value={form.new_password_confirmation}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <div className="md:col-span-2">
            {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
            {message ? (
              <p className="mb-3 text-sm text-green-600">{message}</p>
            ) : null}

            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </AdminLayoutShell>
  );
}