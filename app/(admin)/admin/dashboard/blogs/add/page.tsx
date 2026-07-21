"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, ChevronRight, BookOpen, Type, FileText } from "lucide-react";
import Image from "next/image";
import Toast from "@/app/components/ui/Toast";
import { Loader } from "@/app/(user)/user/dashboard/components/Loader";

import { createBlog } from "@/services/blogs.service";

export default function AdminAddBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    is_published: "true",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /**
   * Handles the submission of the blog post form.
   * Collects form data and the cover image, then calls the createBlog service.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation to ensure required fields are not just whitespace
    if (!formData.title.trim() || !formData.content.trim()) {
      setActiveToast({ message: "Title and Content are required", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      // Append all text fields from formData
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      // Append image if selected
      if (image) data.append("image", image);

      // Call the server-side service to create the blog
      await createBlog(data);
      
      setActiveToast({ message: "Blog post created successfully!", type: "success" });
      
      // Redirect back to the blog list after a short delay
      setTimeout(() => {
        router.push("/admin/dashboard/blogs");
        router.refresh();
      }, 1500);
    } catch (error: any) {
      // console.error("Submission error:", error);
      setActiveToast({ message: error.message || "Failed to create blog", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-gray-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 flex items-center justify-center sm:justify-start gap-3">
             Write a New Article <BookOpen className="w-8 h-8 text-orange-500" />
          </h1>
          <p className="text-gray-300 max-w-xl text-lg leading-relaxed">
            Share news, updates, or helpful rental tips with the RoomHunt community.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100/80 space-y-8">
          
          {/* Title and Excerpt */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                <Type className="w-4 h-4 text-orange-500" /> Article Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Tips for Finding the Perfect Apartment"
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 transition-all font-bold text-lg"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" /> Short Excerpt
              </label>
              <textarea
                required
                rows={2}
                placeholder="A brief summary to entice readers..."
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 transition-all resize-none"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Cover Image</label>
            <div className="relative">
              {preview ? (
                <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-gray-100 group">
                  <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <label className="bg-white text-gray-700 px-6 py-3 rounded-2xl font-bold cursor-pointer hover:bg-gray-50 active:scale-95 transition-all">
                      Change Image
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-gray-100 bg-gray-50/30 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center group hover:border-orange-500/30 transition-all cursor-pointer aspect-video">
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 mb-4 shadow-sm group-hover:scale-110 group-hover:text-orange-500 transition-all">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <p className="font-bold text-gray-700">Upload a cover image</p>
                  <p className="text-xs text-gray-500 mt-1">Recommended: 1200 x 630px (Max 5MB)</p>
                </label>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Content</label>
            <textarea
              required
              rows={12}
              placeholder="Start writing your article here..."
              className="w-full px-6 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 transition-all resize-none leading-relaxed text-gray-700"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          {/* Status and Submission */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50">
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
               <button
                 type="button"
                 onClick={() => setFormData({...formData, is_published: "true"})}
                 className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${formData.is_published === "true" ? "bg-white text-orange-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
               >
                 Publish Immediately
               </button>
               <button
                 type="button"
                 onClick={() => setFormData({...formData, is_published: "false"})}
                 className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${formData.is_published === "false" ? "bg-white text-gray-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
               >
                 Save as Draft
               </button>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 sm:px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] sm:px-12 py-4 bg-[#0D9488] text-white rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0D9488]/20 active:scale-95 group"
              >
                <span>{formData.is_published === "true" ? "Publish Article" : "Save Draft"}</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {activeToast && <Toast message={activeToast.message} type={activeToast.type} onClose={() => setActiveToast(null)} />}
    </div>
  );
}
