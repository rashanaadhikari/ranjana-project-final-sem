"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Eye, Trash2, BookOpen, Calendar, X } from "lucide-react";
import Link from "next/link";
import { getMyBlogs, deleteBlog } from "@/services/blogs.service";
import Toast from "@/app/components/ui/Toast";

export default function UserBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const fetchBlogs = async () => {
    try {
      const data = await getMyBlogs();
      setBlogs(data || []);
    } catch (err: unknown) {
      console.error(err);
      setActiveToast({ message: "Failed to fetch your blogs", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      setActiveToast({ message: "Blog deleted successfully", type: "success" });
      fetchBlogs();
    } catch (err: any) {
      setActiveToast({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">My Blogs</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Manage and track your blogs</p>
        </div>
        <Link
          href="/user/dashboard/blogs/add"
          className="bg-[#0D9488] hover:bg-[#0D9488] text-white px-6 py-3.5 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 group"
        >
          <Plus className="w-5 h-5 transition-transform" />
          <span>Add Blog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Total Articles</p>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">{blogs.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Published</p>
          <h4 className="text-2xl font-bold text-green-600 mt-1">{blogs.filter(b => b.is_published).length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Drafts</p>
          <h4 className="text-2xl font-bold text-orange-600 mt-1">{blogs.filter(b => !b.is_published).length}</h4>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/20">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0D9488] transition-colors" />
            <input
              type="text"
              placeholder="Search my blogs..."
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#0D9488]/5 focus:border-[#0D9488] transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">
                <th className="px-8 py-5">Article Info</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Date Created</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest leading-loose">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-[#0D9488]/20 border-t-[#0D9488] rounded-full animate-spin" />
                      Loading your blogs...
                    </div>
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-400">
                      <BookOpen className="w-12 h-12 opacity-20" />
                      <div className="space-y-1">
                        <p className="font-bold uppercase text-xs tracking-widest">No blogs found</p>
                        <p className="text-xs font-medium">Click &quot;Add Blog&quot; to write your first article</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 ring-1 ring-gray-100 group-hover:ring-[#0D9488]/20 transition-all group-hover:shadow-lg relative">
                        {blog.blog_image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={blog.blog_image} alt="Blog cover" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <BookOpen className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-gray-900 group-hover:text-[#0D9488] transition-colors line-clamp-1">{blog.title}</div>
                        <div className="text-[10px] text-gray-500 line-clamp-1 font-medium mt-1">{blog.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${blog.is_published
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                      }`}>
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-xs text-gray-600 font-bold uppercase tracking-tighter">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-[#222]">
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        title="View"
                        className="p-3 bg-gray-50 text-gray-400 hover:text-brand hover:bg-brand/5 rounded-xl transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        title="Delete"
                        className="p-3 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeToast && (
        <Toast
          message={activeToast.message}
          type={activeToast.type}
          onClose={() => setActiveToast(null)}
        />
      )}

      {/* Blog Preview Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Close Button top right */}
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 p-2 bg-black/40 text-white hover:bg-black/60 rounded-full transition-colors z-20 shadow-md backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Full Image Container - ensure full image is visible, no cut off */}
            <div className="w-full h-64 sm:h-80 relative bg-gray-900 flex items-center justify-center overflow-hidden">
              {selectedBlog.blog_image ? (
                <img 
                  src={selectedBlog.blog_image} 
                  alt={selectedBlog.title} 
                  className="w-full h-full object-contain" 
                  style={{ backdropFilter: 'blur(10px)' }}
                />
              ) : (
                <BookOpen className="w-16 h-16 text-gray-700" />
              )}
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="space-y-4">
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${selectedBlog.is_published ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                   {selectedBlog.is_published ? "Published" : "Draft"}
                 </span>
                 <h2 className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">{selectedBlog.title}</h2>
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                   <Calendar className="w-4 h-4 text-brand" />
                   {new Date(selectedBlog.created_at).toLocaleDateString()}
                 </div>
              </div>
              
              {selectedBlog.excerpt && (
                 <div className="p-5 bg-gray-50 border-l-4 border-brand rounded-r-2xl shadow-sm">
                   <p className="text-sm font-semibold text-gray-700 leading-relaxed italic">
                     &quot;{selectedBlog.excerpt}&quot;
                   </p>
                 </div>
              )}

              {/* Rich Text area */}
              <div 
                className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed mt-6 pb-6 border-b border-gray-100" 
                dangerouslySetInnerHTML={{ __html: selectedBlog.content || "<p>No content to show...</p>" }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
