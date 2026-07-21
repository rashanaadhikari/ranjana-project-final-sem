import { User, Mail, Phone, MapPin, Edit3, Settings, LogOut, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const userAuth = session?.user;
  const metadata = userAuth?.user_metadata || {};
  
  // Fetch real user data from our public table
  const { data: dbUser } = await supabase
    .from('users')
    .select('name, email, phone_number, address')
    .eq('id', userAuth?.id)
    .single();

  // Extract user details or set fallbacks for display
  const name = dbUser?.name || metadata?.full_name || metadata?.name || userAuth?.email?.split('@')[0] || "Guest User";
  const email = dbUser?.email || userAuth?.email || "No email provided";
  
  const phone = dbUser?.phone_number || metadata?.phone || "Phone number not provided";
  const address = dbUser?.address || metadata?.address || "Address not provided";

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Page Header */}
      <h1 className="text-3xl font-extrabold text-[#222222] tracking-tight mb-8">My Profile</h1>

      {/* Main Profile Card Container */}
      <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow duration-300 border border-gray-100 overflow-hidden">
        
        {/* Banner Cover Photo */}
        <div className="h-40 sm:h-56 bg-[#0D9488] relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-2xl opacity-40"></div>
          <div className="absolute bottom-0 left-20 w-48 h-48 bg-white/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
        </div>

        {/* Profile Details Area */}
        <div className="px-6 sm:px-10 pb-10 relative">
          
          {/* Avatar intersecting banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 sm:-mt-20 mb-8 gap-4">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white p-2 rounded-full shadow-lg relative z-10">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center font-bold text-4xl text-[#0D9488] border border-gray-100">
                   {name.charAt(0).toUpperCase()}
                </div>
              </div>
              <button 
                className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-[#6A6A6A] hover:text-[#0D9488] transition-colors hover:scale-105"
                title="Edit Avatar"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#0D9488] hover:bg-[#0D9488] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95">
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            </div> */}
          </div>

          {/* Name & Role */}
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#6A6A6A] font-medium">Verified Customer</span>
              <ShieldCheck className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Personal Info Grid */}
             <div className="space-y-6 bg-gray-50/50 p-6 sm:p-8 rounded-[2rem] border border-gray-100">
               <h3 className="font-bold text-lg text-[#222222] mb-4">Personal Information</h3>
               
               {/* Detail Row */}
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0D9488] shrink-0 border border-gray-100">
                   <User className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs font-semibold text-[#6A6A6A] uppercase tracking-wider mb-0.5">Full Name</p>
                   <p className="font-medium text-[#222222]">{name}</p>
                 </div>
               </div>

               {/* Detail Row */}
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0D9488] shrink-0 border border-gray-100">
                   <Mail className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs font-semibold text-[#6A6A6A] uppercase tracking-wider mb-0.5">Email Address</p>
                   <p className="font-medium text-[#222222]">{email}</p>
                 </div>
               </div>

               {/* Detail Row */}
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0D9488] shrink-0 border border-gray-100">
                   <Phone className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs font-semibold text-[#6A6A6A] uppercase tracking-wider mb-0.5">Phone Number</p>
                   <p className="font-medium text-[#222222]">{phone}</p>
                 </div>
               </div>

               {/* Detail Row */}
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0D9488] shrink-0 border border-gray-100">
                   <MapPin className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs font-semibold text-[#6A6A6A] uppercase tracking-wider mb-0.5">Current Address</p>
                   <p className="font-medium text-[#222222]">{address}</p>
                 </div>
               </div>
             </div>

             {/* Settings & Security Grid */}
             <div className="space-y-6">
                {/* <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#0D9488]/20 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#F0FDFA] text-[#0D9488] rounded-lg">
                        <Settings className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-[#222222]">Account Settings</h3>
                    </div>
                  </div>
                  <p className="text-[#6A6A6A] text-sm ml-11">Manage your account preferences, notifications, and privacy rules.</p>
                </div> */}

                {/* <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#0D9488]/20 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-[#222222]">Login & Security</h3>
                    </div>
                  </div>
                  <p className="text-[#6A6A6A] text-sm ml-11">Update your password or configure authentication methods.</p>
                </div> */}
                
                {/* Deactivate/Delete */}
                {/* <div className="mt-8 pt-6 border-t border-gray-100 px-2 flex justify-end">
                   <button className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">
                     Deactivate Account
                   </button>
                </div> */}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
