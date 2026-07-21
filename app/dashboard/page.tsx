import { Plus, Building2, Heart, CalendarCheck, TrendingUp, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const user = session?.user;
  const metadata = user?.user_metadata || {};
  const name = metadata?.full_name || metadata?.name || user?.email?.split('@')[0] || "User";

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white p-8 sm:p-12 shadow-xl border border-gray-800">
        {/* Decorative blur orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#0D9488] rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-600 rounded-full filter blur-[80px] opacity-20 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-gray-400 font-medium mb-1 uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Welcome back
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
              Hey, {name}! 👋
              {/* Hey, Aayush! 👋 */}
            </h1>
            <p className="text-gray-300 max-w-lg leading-relaxed text-lg">
              Here is what's happening with your properties and saved listings today.
            </p>
          </div>
          <Link 
            href="/post-listing" 
            className="group flex items-center gap-2 bg-[#0D9488] hover:bg-white hover:text-[#0D9488] text-white px-7 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(227,28,91,0.3)] hover:shadow-[0_0_30px_rgba(227,28,91,0.5)] active:scale-95 shrink-0"
          >
            <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" /> 
            <span>List a Property</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between group">
          <div>
            <p className="text-[#6A6A6A] font-medium mb-1">Total Properties</p>
            <h3 className="text-3xl font-bold text-[#222222]">2</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Building2 className="w-7 h-7" />
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between group">
          <div>
            <p className="text-[#6A6A6A] font-medium mb-1">Saved Favourites</p>
            <h3 className="text-3xl font-bold text-[#222222]">5</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#F0FDFA] text-[#0D9488] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-7 h-7" />
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between group">
          <div>
            <p className="text-[#6A6A6A] font-medium mb-1">Active Bookings</p>
            <h3 className="text-3xl font-bold text-[#222222]">0</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <CalendarCheck className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Quick Access Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Performance/Activity */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#222222]">Recent Activity</h2>
            <Link href="/dashboard/properties" className="text-sm font-semibold text-[#0D9488] hover:text-[#0D9488] flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {/* Mock Activity Item */}
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#222222] truncate">Single Room at Itahari</h4>
                <p className="text-xs text-[#6A6A6A] flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> Itahari, Nepal
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#222222]">Rs. 5000</p>
                <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">Active</p>
              </div>
            </div>

            {/* Mock Activity Item */}
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#222222] truncate">2BHK Apartment</h4>
                <p className="text-xs text-[#6A6A6A] flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> Dharan, Nepal
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#222222]">Rs. 15000</p>
                <p className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full inline-block mt-1">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Listings Snippet */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#222222]">Saved Favourites</h2>
            <Link href="/dashboard/favourites" className="text-sm font-semibold text-[#0D9488] hover:text-[#0D9488] flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
             <div className="w-16 h-16 bg-[#F0FDFA] text-[#0D9488] rounded-full flex items-center justify-center mb-4">
               <Heart className="w-8 h-8 fill-current opacity-20" />
             </div>
             <h3 className="text-lg font-semibold text-[#222222] mb-2">Build your wishlist</h3>
             <p className="text-[#6A6A6A] text-sm max-w-xs mx-auto mb-4">You have 5 saved properties. Keep browsing to save more places you love.</p>
             <Link href="/properties" className="text-[#0D9488] font-medium hover:underline text-sm">
                Explore listings →
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
