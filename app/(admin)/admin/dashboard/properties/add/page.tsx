"use client";

import { useRouter } from "next/navigation";
import AdminPostPropertyForm from "./components/AdminPostPropertyForm";

export default function AdminAddPropertyPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/dashboard/properties");
    router.refresh();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header section removed */}

      {/* Form section */}
      <AdminPostPropertyForm onSuccess={handleSuccess} />
    </div>
  );
}
