// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Search, Plus, Trash2, MoreVertical, BookOpen, CheckCircle2, XCircle, User, Calendar, ExternalLink } from "lucide-react";
// import { getAllBlogs, deleteBlog, updateBlogStatus } from "@/services/blogs.service";
// import Link from "next/link";
// import Toast from "@/app/components/ui/Toast";

// export default function AdminBlogsPage() {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const fetchBlogs = async () => {
//     try {
//       const data = await getAllBlogs();
//       setBlogs(data || []);
//     } catch (err: any) {
//       setActiveToast({ message: err.message || "Failed to fetch blogs", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchBlogs(); }, []);

//   useEffect(() => {
//     const handle = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
//     };
//     document.addEventListener("mousedown", handle);
//     return () => document.removeEventListener("mousedown", handle);
//   }, []);

//   /**
//    * Updates the publication status (Published/Draft) of a blog post.
//    * After the update, the blog list is re-fetched to reflect the change.
//    */
//   const handleStatusUpdate = async (id: string, is_published: boolean) => {
//     setOpenMenuId(null);
//     try {
//       // Call the service to update the 'is_published' column in Supabase
//       await updateBlogStatus(id, is_published);
      
//       setActiveToast({ 
//         message: is_published ? "Blog Published ✓" : "Blog Unpublished", 
//         type: "success" 
//       });
      
//       // Refresh the list to show the new status
//       fetchBlogs();
//     } catch (error: any) {
//       console.error("Status toggle error:", error);
//       setActiveToast({ message: error.message, type: "error" });
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this blog permanently? This action cannot be undone.")) return;
//     setOpenMenuId(null);
//     try {
//       await deleteBlog(id);
//       setActiveToast({ message: "Blog Deleted Permanently", type: "success" });
//       fetchBlogs();
//     } catch (error: any) {
//       setActiveToast({ message: error.message, type: "error" });
//     }
//   };

//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 text-[#222]">

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight">Blog Management</h1>
//           <p className="text-gray-500 text-sm font-medium mt-1">Manage articles and updates on the platform</p>
//         </div>
//         <Link 
//           href="/admin/dashboard/blogs/add"
//           className="bg-[#0D9488] text-white p-3 rounded-2xl shadow-lg shadow-[#0D9488]/20 hover:bg-[#0D9488] transition-all active:scale-95 flex items-center justify-center border-2 border-white"
//           title="Add Blog"
//         >
//           <Plus className="w-6 h-6" />
//         </Link>
//       </div>

//       <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-gray-50 bg-gray-50/20">
//           <div className="relative w-full md:w-96 group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0D9488] transition-colors" />
//             <input
//               type="text"
//               placeholder="Search articles, authors..."
//               className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#0D9488]/5 focus:border-[#0D9488] transition-all"
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto" ref={menuRef}>
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">
//                 <th className="px-6 py-5 w-12 text-center">#</th>
//                 <th className="px-8 py-5">Article Info</th>
//                 <th className="px-8 py-5">Author & Date</th>
//                 <th className="px-8 py-5">Status</th>
//                 <th className="px-8 py-5 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {loading ? (
//                 <tr><td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">Loading blogs...</td></tr>
//               ) : blogs.length === 0 ? (
//                 <tr><td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">No blogs found</td></tr>
//               ) : blogs.map((blog, index) => (
//                 <tr key={blog.id} className="hover:bg-gray-50/40 transition-colors group">
//                   <td className="px-6 py-6 text-center text-xs font-bold text-gray-300">
//                     {(index + 1).toString().padStart(2, '0')}
//                   </td>

//                   <td className="px-8 py-6 max-w-md">
//                     <div className="flex items-start gap-4">
//                       <div className="w-16 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 ring-1 ring-gray-100 relative">
//                         {blog.blog_image ? (
//                           // eslint-disable-next-line @next/next/no-img-element
//                           <img src={blog.blog_image} alt="Blog cover" className="w-full h-full object-cover" />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center bg-gray-50">
//                             <BookOpen className="w-5 h-5 text-gray-300" />
//                           </div>
//                         )}
//                       </div>
//                       <div className="space-y-1">
//                         <div className="text-sm font-extrabold text-gray-900 line-clamp-1">{blog.title}</div>
//                         <div className="text-[10px] text-gray-500 line-clamp-1 font-medium">{blog.excerpt || "No excerpt..."}</div>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-2">
//                        <User className="w-3 h-3 text-[#0D9488]" />
//                        <span className="text-xs font-bold text-gray-700">{blog.users?.name || "RoomHunt"}</span>
//                     </div>
//                     <div className="flex items-center gap-2 mt-1">
//                       <Calendar className="w-3 h-3 text-gray-400" />
//                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
//                         {new Date(blog.created_at).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </td>

//                   <td className="px-8 py-6">
//                     <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${blog.is_published ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
//                       {blog.is_published ? "Published" : "Draft"}
//                     </span>
//                   </td>

//                   <td className="px-8 py-6 text-right">
//                     <div className="flex items-center justify-end gap-2 relative">
//                       <button
//                         onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
//                         className="p-3 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
//                         title="View Article"
//                       >
//                         <ExternalLink className="w-4 h-4" />
//                       </button>

//                       <div className="relative">
//                         <button
//                           onClick={() => setOpenMenuId(openMenuId === blog.id ? null : blog.id)}
//                           className="p-3 bg-gray-50 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
//                         >
//                           <MoreVertical className="w-4 h-4" />
//                         </button>

//                         {openMenuId === blog.id && (
//                           <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden text-left">
//                             <button
//                               onClick={() => handleStatusUpdate(blog.id, !blog.is_published)}
//                               className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors font-semibold ${blog.is_published ? "text-orange-500 hover:bg-orange-50" : "text-green-600 hover:bg-green-50"}`}
//                             >
//                               {blog.is_published ? <><XCircle className="w-4 h-4" /> Unpublish</> : <><CheckCircle2 className="w-4 h-4" /> Publish</>}
//                             </button>
//                             <div className="border-t border-gray-50" />
//                             <button
//                               onClick={() => handleDelete(blog.id)}
//                               className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
//                             >
//                               <Trash2 className="w-4 h-4" /> Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {activeToast && (
//         <Toast message={activeToast.message} type={activeToast.type} onClose={() => setActiveToast(null)} />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Plus, Trash2, MoreVertical, BookOpen, CheckCircle2, XCircle, User, Calendar, Eye, X, Clock } from "lucide-react";
import { getAllBlogs, deleteBlog, updateBlogStatus } from "@/services/blogs.service";
import Link from "next/link";
import Image from "next/image";
import Toast from "@/app/components/ui/Toast";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewBlog, setViewBlog] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const menuRef = useRef<HTMLElement>(null);

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs();
      setBlogs(data || []);
    } catch (err: any) {
      setActiveToast({ message: err.message || "Failed to fetch blogs", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleStatusUpdate = async (id: string, is_published: boolean) => {
    setOpenMenuId(null);
    setViewBlog(null);
    try {
      await updateBlogStatus(id, is_published);
      setActiveToast({ message: is_published ? "Blog Published ✓" : "Blog Unpublished", type: "success" });
      fetchBlogs();
    } catch (error: any) {
      setActiveToast({ message: error.message, type: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog permanently?")) return;
    setOpenMenuId(null);
    setViewBlog(null);
    try {
      await deleteBlog(id);
      setActiveToast({ message: "Blog Deleted", type: "success" });
      fetchBlogs();
    } catch (error: any) {
      setActiveToast({ message: error.message, type: "error" });
    }
  };

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.users?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 text-[#222]">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Blog Management</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Manage articles and updates on the platform</p>
        </div>
        <Link
          href="/admin/dashboard/blogs/add"
          className="bg-[#0D9488] text-white p-3 rounded-2xl shadow-lg shadow-[#0D9488]/20 hover:bg-[#0D9488] transition-all active:scale-95 flex items-center justify-center"
          title="Add Blog"
        >
          <Plus className="w-6 h-6" />
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/20">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0D9488] transition-colors" />
            <input
              type="text"
              placeholder="Search articles, authors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#0D9488]/5 focus:border-[#0D9488] transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">
                <th className="px-6 py-5 w-12 text-center">#</th>
                <th className="px-8 py-5">Article Info</th>
                <th className="px-8 py-5">Author & Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50" ref={menuRef as React.RefObject<HTMLTableSectionElement>}>
              {loading ? (
                <tr><td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-[#0D9488]/20 border-t-[#0D9488] rounded-full animate-spin" />
                    Loading blogs...
                  </div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">No blogs found</td></tr>
              ) : filtered.map((blog, index) => (
                <tr key={blog.id} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-6 py-6 text-center text-xs font-bold text-gray-300">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>

                  <td className="px-8 py-6 max-w-md">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 ring-1 ring-gray-100 relative">
                        {blog.blog_image ? (
                          <Image src={blog.blog_image} alt="Blog cover" fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <BookOpen className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-extrabold text-gray-900 line-clamp-1">{blog.title}</div>
                        <div className="text-[10px] text-gray-500 line-clamp-1 font-medium">{blog.excerpt || "No excerpt..."}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-[#0D9488]" />
                      <span className="text-xs font-bold text-gray-700">{blog.users?.name || "RoomHunt"}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${blog.is_published ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* View button */}
                      <button
                        onClick={() => setViewBlog(blog)}
                        className="p-3 bg-gray-50 text-gray-400 hover:text-[#0D9488] hover:bg-[#0D9488]/5 rounded-xl transition-all"
                        title="Preview Blog"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Three-dot menu — opens UPWARD */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === blog.id ? null : blog.id)}
                          className="p-3 bg-gray-50 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openMenuId === blog.id && (
                          <div className="absolute right-0 bottom-full mb-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden text-left">
                            <button
                              onClick={() => handleStatusUpdate(blog.id, !blog.is_published)}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors font-semibold ${blog.is_published ? "text-orange-500 hover:bg-orange-50" : "text-green-600 hover:bg-green-50"}`}
                            >
                              {blog.is_published
                                ? <><XCircle className="w-4 h-4" /> Unpublish</>
                                : <><CheckCircle2 className="w-4 h-4" /> Publish</>}
                            </button>
                            <div className="border-t border-gray-50" />
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Blog Preview Modal ── */}
      {viewBlog && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setViewBlog(null)}
        >
          <div
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Cover image */}
            {viewBlog.blog_image && (
              <div className="relative w-full h-56 rounded-t-[2rem] overflow-hidden">
                <Image src={viewBlog.blog_image} alt="Cover" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
              </div>
            )}

            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider inline-block ${viewBlog.is_published ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                    {viewBlog.is_published ? "Published" : "Draft — Pending Approval"}
                  </span>
                  <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">{viewBlog.title}</h2>
                  {viewBlog.excerpt && (
                    <p className="text-gray-500 text-sm leading-relaxed italic">{viewBlog.excerpt}</p>
                  )}
                </div>
                <button
                  onClick={() => setViewBlog(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-all shrink-0"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-6 text-xs text-gray-500 font-semibold border-y border-gray-50 py-4">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0D9488]" />
                  {viewBlog.users?.name || "RoomHunt"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {new Date(viewBlog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>

              {/* Content */}
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                {viewBlog.content || "No content available."}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <button
                  onClick={() => handleStatusUpdate(viewBlog.id, !viewBlog.is_published)}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    viewBlog.is_published
                      ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  {viewBlog.is_published
                    ? <><XCircle className="w-4 h-4" /> Unpublish</>
                    : <><CheckCircle2 className="w-4 h-4" /> Approve & Publish</>}
                </button>
                <button
                  onClick={() => handleDelete(viewBlog.id)}
                  className="flex-1 py-3 rounded-2xl font-bold text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeToast && (
        <Toast message={activeToast.message} type={activeToast.type} onClose={() => setActiveToast(null)} />
      )}
    </div>
  );
}
