import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminProjectForm from "@/components/AdminProjectForm";

export default function AdminProjectFormPage() {
  return (
    <AdminLayoutShell>
      <AdminHeader title="Project Form" />
      <AdminProjectForm />
    </AdminLayoutShell>
  );
}