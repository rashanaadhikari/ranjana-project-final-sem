"use client";

import { useEffect, useState } from "react";
import { getPublishedBlogs } from "@/services/blogs.service";
import BlogPostCard from "./BlogPostCard";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublishedBlogs();
        // Show only latest 3
        setBlogs(data?.slice(0, 3) || []);
      } catch (err) {
        console.error("Failed to fetch latest blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="w-full py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            {/* <div className="flex items-center gap-2 text-[#0D9488] font-bold text-sm uppercase tracking-[0.2em]">
              <span className="w-8 h-[2px] bg-[#0D9488]"></span>
              Our Blog
            </div> */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#222222] tracking-tight">
              Latest Insights & <span className="text-[#0D9488]">Stories</span>
            </h2>
            <p className="text-[#6A6A6A] font-medium max-w-xl text-lg">
              Stay updated with the latest news, room-hunting tips, and community stories from RoomHunt.
            </p>
          </div>
          
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-[#222222] font-bold hover:text-[#0D9488] transition-colors"
          >
            Explore All Articles
            <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-[2rem]"></div>
                <div className="h-6 bg-gray-100 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-50 rounded-lg w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogPostCard
                key={blog.id}
                slug={blog.slug}
                title={blog.title}
                date={new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                image={blog.blog_image || "https://picsum.photos/seed/roomhunt-blog/800/450"}
                aspectRatio="video"
                className="hover:-translate-y-2 transition-transform duration-500"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
