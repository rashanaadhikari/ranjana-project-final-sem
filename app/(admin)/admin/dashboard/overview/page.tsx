import { Users, Building2, CalendarCheck, TrendingUp, MapPin, Search, MoreVertical, Book, Paperclip, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import { getAdminStats } from "@/services/admin.service";
import Image from "next/image";
import { InteractiveBarChart } from "@/app/components/InteractiveBarChart";

interface BlogWithAuthor {
  id: string;
  title: string;
  author_id: string;
  created_at: string;
  is_published: boolean;
  users: { name: string | null };
}

export default async function AdminOverviewPage() {
  const { counts, activities, chartData } = await getAdminStats();

  const { labels, properties: propData, users: userData, blogs: blogData, messages: msgData } = chartData;

  const formattedChartData = labels.map((label, i) => ({
    date: label,
    properties: propData[i],
    users: userData[i],
    blogs: blogData[i],
    messages: msgData?.[i] || 0,
  }));

  const stats = [
    { label: "Total Users", value: counts.users.toLocaleString(),  icon: Users, color: "text-blue-600", bgColor: "bg-blue-50", change: "+12%" },
    { label: "Total Properties", value: counts.properties.toLocaleString(), icon: Building2, color: "text-[#0D9488]", bgColor: "bg-[#F0FDFA]", change: "+3%" },
    { label: "Total Blogs", value: counts.blogs.toLocaleString(), icon: Book, color: "text-orange-500", bgColor: "bg-orange-50", change: "-1%" },
    { label: "Total Messages", value: (counts.messages || 0).toLocaleString(), icon: MessageSquare, color: "text-emerald-500", bgColor: "bg-emerald-50", change: "+8%" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 bg-white min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-[#222222] tracking-tight">Admin Overview</h1>
          <p className="text-[#6A6A6A] font-medium mt-1">Track every thing happening on RoomHunt</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 group-hover:scale-150 transition-all duration-700 bg-current"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-inner">
                {stat.change}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[#6A6A6A] font-bold text-xs uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-[#222222] mt-1 group-hover:translate-x-1 transition-transform">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Visual Chart (Interactive Bar Chart) */}
      <InteractiveBarChart
        title="Platform Activity"
        description="User, Property, Blog, and Message growth trends over time"
        data={formattedChartData}
        xAxisKey="date"
        config={{
          users: { label: "Users", color: "#3B82F6" },
          properties: { label: "Properties", color: "#0D9488" },
          blogs: { label: "Blogs", color: "#F97316" },
          messages: { label: "Messages", color: "#10B981" },
        }}
      />

      {/* Recent Activity Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Column 1: Recent Users */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col group">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <h3 className="font-bold text-lg text-[#222222] flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Recent Users
            </h3>
            <Link href="/admin/dashboard/users" className="text-[10px] font-extrabold uppercase tracking-widest text-[#0D9488] hover:text-[#222222] transition-colors">
              Manage All
            </Link>
          </div>
          <div className="space-y-6 flex-1">
            {activities.users.length > 0 ? activities.users.map((user: any) => (
              <div key={user.id} className="flex items-center gap-4 group/item cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FDFA] border border-gray-100 overflow-hidden flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt={user.name} width={48} height={48} className="object-cover" />
                  ) : (
                    <span className="text-[#0D9488] font-black text-lg">{user.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#222222] truncate">{user.name}</p>
                  <p className="text-xs text-[#6A6A6A] truncate">{user.email}</p>
                </div>
              </div>
            )) : (
              <p className="text-center py-10 text-gray-400 text-sm font-medium border-2 border-dashed border-gray-50 rounded-3xl">No new users</p>
            )}
          </div>
        </div>

        {/* Column 2: Recent Properties */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col group">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <h3 className="font-bold text-lg text-[#222222] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0D9488]" />
              Recent Properties
            </h3>
            <Link href="/admin/dashboard/properties" className="text-[10px] font-extrabold uppercase tracking-widest text-[#0D9488] hover:text-[#222222] transition-colors">
              Manage All
            </Link>
          </div>
          <div className="space-y-6 flex-1">
            {activities.properties.length > 0 ? activities.properties.map((prop: any) => (
              <div key={prop.id} className="flex items-center gap-4 group/item cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-gray-100 overflow-hidden shrink-0 group-hover/item:scale-110 transition-transform">
                  {prop.image_urls?.[0] ? (
                    <img src={prop.image_urls[0]} alt={prop.title} width={56} height={56} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#222222] truncate">{prop.title}</p>
                  <p className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider">Rs. {prop.price_per_month}</p>
                </div>
              </div>
            )) : (
              <p className="text-center py-10 text-gray-400 text-sm font-medium border-2 border-dashed border-gray-50 rounded-3xl">No new properties</p>
            )}
          </div>
        </div>

        {/* Column 3: Recent Blogs */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col group">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <h3 className="font-bold text-lg text-[#222222] flex items-center gap-2">
              <Book className="w-5 h-5 text-orange-500" />
              Recent Blogs
            </h3>
            <Link href="/admin/dashboard/blogs/add">
            <button className="text-[10px] font-extrabold uppercase tracking-widest text-[#0D9488] hover:text-[#222222] transition-colors">
              Write Blog
            </button>
            </Link>
          </div>
          <div className="space-y-6 flex-1">
            {activities.blogs.length > 0 ? (activities.blogs as unknown as BlogWithAuthor[]).map((blog) => (
              <div key={blog.id} className="flex flex-col gap-1 group/item cursor-pointer">
                <p className="text-sm font-bold text-[#222222] group-hover/item:text-[#0D9488] transition-colors line-clamp-2">{blog.title}</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="w-2 h-2 text-orange-600" />
                  </div>
                  <p className="text-[10px] text-[#6A6A6A] font-bold uppercase tracking-wider">{blog.users?.name || "RoomHunt"}</p>
                  <span className="text-[10px] text-gray-300">•</span>
                  <p className="text-[10px] text-gray-400">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            )) : (
              <p className="text-center py-10 text-gray-400 text-sm font-medium border-2 border-dashed border-gray-50 rounded-3xl">No new blogs</p>
            )}
          </div>
        </div>

      </section>

    </div>
  );
}
