"use client";

import { useRouter } from "next/navigation";
import PostPropertyForm from "./components/PostPropertyForm";
import { getMyProperties } from "@/services/properties.service";

export default function AddPropertyPage() {
  const router = useRouter();

  const handleSuccess = async () => {
    // Redirect to properties table after adding
    router.push("/user/dashboard/properties");
    router.refresh();
    await getMyProperties()
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header section removed */}

      {/* Form section */}
      <PostPropertyForm onSuccess={handleSuccess} />
    </div>
  );
}
