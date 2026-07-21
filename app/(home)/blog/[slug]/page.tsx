import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/services/blogs.service";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getBlogBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#F8F9FA]">
            <Navbar />
            <div className="pt-12 md:pt-16 pb-12">
            <article className="relative max-w-5xl mx-auto bg-white rounded-[2.5rem] md:rounded-[3.5rem] px-4 sm:px-8 lg:px-16 py-16 lg:py-20 shadow-md min-h-[80vh]">
                
                {/* Decorative Frame */}
                {/* Positioned absolute so it acts as a frame around the content */}
                {/* <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem]"> */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* <img
                        src="/images/blog/frame.png"
                        alt="Decorative Frame"
                        className="w-full h-full object-cover opacity-90"
                    />
                </div> */}

                <div className="relative z-10">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Back Link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#6A6A6A] hover:text-[#0D9488] transition-colors mb-10"
                        >
                            ← Back to Blog
                        </Link>

                        {/* Date */}
                        <p className="text-sm uppercase tracking-[0.15em] text-[#0D9488] font-extrabold mb-6">
                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-[#222222] leading-[1.1] max-w-3xl mx-auto">
                            {post.title}
                        </h1>

                        {/* Author */}
                        <p className="mt-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
                            Published by <span className="text-[#222222]">{post.users?.name || "RoomHunt Team"}</span>
                        </p>
                    </div>

                    {/* Hero Image */}
                    {post.blog_image && (
                        <div className="relative aspect-[16/9] w-full max-w-4xl mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-16 shadow-lg">
                            <Image
                                src={post.blog_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="max-w-3xl mx-auto">
                        <div
                            className="blog-content max-w-none text-lg text-[#4A4A4A] leading-relaxed whitespace-pre-wrap"
                        >
                            {/* If content is HTML, use dangerouslySetInnerHTML, but for now simple text/markdown usually works best with CSS */}
                            {/* Assuming the editor saves clean content. If it saves HTML, we use the old line: */}
                            {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
                            {post.content}
                        </div>
                    </div>
                </div>
            </article>

            <div className="mt-12">
                <Footer />
            </div>
            </div>
        </main>
    );
}
