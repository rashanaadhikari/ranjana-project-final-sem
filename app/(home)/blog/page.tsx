import Footer from "../../components/Footer";
import BlogPostCard from "../../components/BlogPostCard";
import { getPublishedBlogs } from "@/services/blogs.service";
import { BookOpen } from "lucide-react";
import Navbar from "@/app/components/Navbar";

export const metadata = {
    title: "Blog | RoomHunt",
    description: "Stay updated with the latest news and insights from RoomHunt.",
};

const BLOG_PLACEHOLDER_IMAGE = "https://picsum.photos/seed/roomhunt-blog/800/450";

export default async function BlogPage() {
    const blogs = await getPublishedBlogs();

    return (
        <>
        <Navbar/>
        <main className="min-h-screen bg-white">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                    {/* Heading Section */}
                    <div className="flex flex-col leading-none mb-10 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-normal text-[#222222]">
                            OUR LATEST <span className="text-[#0D9488]">BLOGS</span>
                        </h1>
                        <p className="mt-4 text-[#6A6A6A] font-medium max-w-2xl">
                            Stay updated with the latest news, insights, and stories from our community.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                            {blogs.map((post: any) => (
                                <BlogPostCard
                                    key={post.slug}
                                    slug={post.slug}
                                    title={post.title}
                                    date={new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    image={post.blog_image || BLOG_PLACEHOLDER_IMAGE}
                                    aspectRatio="video"
                                    className="w-full"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300">
                                <BookOpen className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">No blogs yet</h3>
                                <p className="text-gray-500">Check back later for fresh updates!</p>
                            </div>
                        </div>
                    )}
            </section>

            <Footer />
        </main>
        </>
    );
}
