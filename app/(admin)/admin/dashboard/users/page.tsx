"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Search, Mail, Shield, UserX, UserCheck, Trash2, Eye, X, Phone, MapPin, BookOpen, Building2 } from "lucide-react";
import { getAllUsers, blockUser, deleteUser, getUserDetails } from "@/services/admin.service";
import Toast from "@/app/components/ui/Toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  avatar_url?: string;
  is_blocked: boolean;
  blocked_reason?: string;
  role: string;
  address?: string;
}

interface UserDetails extends User {
  properties: any[];
  blogs: any[];
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "active", "blocked"
  
  // Modal states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewDetails, setViewDetails] = useState<UserDetails | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data || []);
      // Toast removed for fetching
    } catch (err: any) {
      const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch users";
      // console.error("Failed to fetch users:", err);
      setShowToast({ message: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleBlockUser = async () => {
    if (!selectedUser) return;
    setIsProcessing(true);
    try {
      await blockUser(selectedUser.id, !selectedUser.is_blocked, blockReason);
      await fetchUsers();
      setIsBlockModalOpen(false);
      setBlockReason("");
    } catch (err: any) {
      const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to update user status";
      // console.error("Failed to update user status:", err);
       setShowToast({ message: errorMessage, type: "error" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) return;
    try {
      await deleteUser(userId);
      await fetchUsers();
      setShowToast({ message: "User deleted successfully", type: "success" });
    } catch (err: any) {
      const errorMessage =
      err?.response?.data?.message || // axios / API error
      err?.message ||                // JS error
      "Failed to delete user";
      // console.error("Failed to delete user:", err);
      setShowToast({ message: errorMessage, type: "error" });
    }
  };

  const openViewModal = async (user: any) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
    setViewDetails(null); // Loading state
    try {
      const details = await getUserDetails(user.id);
      setViewDetails(details);
      // Toast removed for fetching
    } catch (err: any) {
      const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch user details";
      // console.error("Failed to fetch user details:", err);
      setShowToast({ message: errorMessage, type: "error" });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "active") return matchesSearch && !user.is_blocked;
    if (statusFilter === "blocked") return matchesSearch && user.is_blocked;
    return matchesSearch;
  });

  // Avatar Fallback Helper
  const getAvatarFallback = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 bg-white min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#222222] tracking-tight">User Management</h1>
          <p className="text-[#6A6A6A] font-medium mt-1">Audit, moderate, and manage platform participants</p>
        </div>
        <div className="bg-[#0D9488]/5 border border-[#0D9488]/10 text-[#0D9488] px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm">
           <Users className="w-5 h-5" /> {users.length} Total Users
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col xl:flex-row gap-6 items-center justify-between">
          <div className="relative w-full xl:w-[32rem] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0D9488] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-8 py-4.5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-sm focus:outline-none focus:ring-4 focus:ring-[#0D9488]/5 focus:border-[#0D9488] transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3 w-full xl:w-auto">
            <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
               {["all", "active", "blocked"].map((s) => (
                 <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      statusFilter === s ? "bg-white text-[#222222] shadow-md" : "text-gray-400 hover:text-gray-600"
                    }`}
                 >
                   {s}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
                <th className="px-10 py-6">S.N</th>
                <th className="px-10 py-6">User Profile</th>
                <th className="px-10 py-6">Contact</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6">Role</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                   <td colSpan={6} className="py-20 text-center text-gray-400 font-medium">
                      <div className="w-8 h-8 border-4 border-[#F0FDFA] border-t-[#0D9488] rounded-full animate-spin mx-auto mb-4"></div>
                      Fetching users from database...
                   </td>
                </tr>
              ) : filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50/30 transition-all group">
                  <td className="px-10 py-7 text-sm font-bold text-gray-300">
                    {index + 1}.
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 font-black group-hover:bg-[#0D9488]/5 group-hover:text-[#0D9488] transition-all ring-4 ring-transparent group-hover:ring-[#0D9488]/10 flex-shrink-0 relative overflow-hidden">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.name} className="object-cover" />
                        ) : (
                          getAvatarFallback(user.name)
                        )}
                      </div>
                      <div>
                        <div className="text-base font-bold text-[#222222] group-hover:text-[#0D9488] transition-colors">
                          {user.name}
                        </div>
                        <div className="text-xs text-[#6A6A6A] font-medium flex items-center mt-1">
                          <Mail className="w-3 h-3 mr-2 text-gray-400" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-50 px-4 py-2 rounded-xl w-fit">
                        <Phone className="w-3.5 h-3.5 opacity-50" />
                        {user.phone_number || "N/A"}
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-sm ${
                      !user.is_blocked ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {!user.is_blocked ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#222222] uppercase tracking-widest">
                      <Shield className={`w-4 h-4 ${user.role === "admin" ? "text-[#0D9488] fill-[#0D9488]/10" : "text-gray-300"}`} />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                       <button 
                        onClick={() => openViewModal(user)}
                        title="View Details" 
                        className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md"
                       >
                         <Eye className="w-4.5 h-4.5" />
                       </button>
                       <button 
                        onClick={() => { setSelectedUser(user); setIsBlockModalOpen(true); }}
                        title={user.is_blocked ? "Unblock User" : "Block User"} 
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm hover:shadow-md ${
                          user.is_blocked ? "bg-green-50 text-green-600 hover:bg-green-600" : "bg-red-50 text-red-600 hover:bg-red-600"
                        } hover:text-white`}
                       >
                         {user.is_blocked ? <UserCheck className="w-4.5 h-4.5" /> : <UserX className="w-4.5 h-4.5" />}
                       </button>
                       <button 
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete Permanent" 
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-black hover:text-white rounded-xl transition-all shadow-sm hover:shadow-md"
                       >
                         <Trash2 className="w-4.5 h-4.5" />
                       </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={6} className="py-20 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
                         <Search className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No users matched your criteria</p>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block/Unblock Modal */}
      {isBlockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#222222]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            <h3 className="text-2xl font-black text-[#222222] mb-4">
              {selectedUser?.is_blocked ? "Authorize Unblock" : "Suspend Access"}
            </h3>
            <p className="text-[#6A6A6A] font-medium mb-8 leading-relaxed">
              {selectedUser?.is_blocked 
                ? `You are about to restore full platform access for ${selectedUser?.name}. All previous restrictions will be lifted.`
                : `Please provide a detailed reason for suspending ${selectedUser?.name}'s account. This reason will be displayed to the user when they attempt to log in.`
              }
            </p>
            
            {!selectedUser?.is_blocked && (
              <textarea 
                className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-500 transition-all mb-8 h-32"
                placeholder="Reason for blocking (e.g., Suspicious activity, TOS violation)..."
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
              />
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => setIsBlockModalOpen(false)}
                className="flex-1 py-4 text-gray-500 font-bold text-sm uppercase tracking-widest hover:bg-gray-50 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleBlockUser}
                disabled={isProcessing || (!selectedUser?.is_blocked && !blockReason)}
                className={`flex-1 py-4 text-white font-bold text-sm uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50 ${
                  selectedUser?.is_blocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isProcessing ? "Processing..." : selectedUser?.is_blocked ? "Unblock Now" : "Confirm Block"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#222222]/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col relative">
            
            <button 
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-8 right-8 z-10 w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-[#0D9488] hover:text-white rounded-full transition-all text-gray-400 shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
               {/* User Basic Info Header */}
               <div className="bg-gradient-to-br from-gray-50 to-white px-12 py-16 flex flex-col items-center border-b border-gray-100 relative">
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
                     <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#0D9488] rounded-full blur-3xl"></div>
                     <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                  </div>

                    <div className="w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl border-4 border-white overflow-hidden mb-6 flex items-center justify-center relative group">
                      {selectedUser?.avatar_url ? (
                        <img src={selectedUser.avatar_url} alt={selectedUser.name} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-4xl font-black text-[#0D9488]">{getAvatarFallback(selectedUser?.name)}</span>
                      )}
                     {!selectedUser?.is_blocked ? (
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                     ) : (
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-red-500 border-4 border-white rounded-full"></div>
                     )}
                  </div>
                  <h2 className="text-3xl font-black text-[#222222] tracking-tight">{selectedUser?.name}</h2>
                  <p className="text-[#6A6A6A] font-bold mt-1 uppercase tracking-[0.2em] text-xs">{selectedUser?.role} Account</p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                     <div className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <Mail className="w-4 h-4 text-[#0D9488]" />
                        <span className="text-sm font-semibold text-[#222222]">{selectedUser?.email}</span>
                     </div>
                     <div className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <Phone className="w-4 h-4 text-[#0D9488]" />
                        <span className="text-sm font-semibold text-[#222222]">{selectedUser?.phone_number || "No Phone"}</span>
                     </div>
                     <div className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <MapPin className="w-4 h-4 text-[#0D9488]" />
                        <span className="text-sm font-semibold text-[#222222]">{selectedUser?.address || "No Address"}</span>
                     </div>
                  </div>
               </div>

               {/* Activity Sections */}
               <div className="p-12 space-y-12 bg-white">
                  
                  {/* Block Reason (if applicable) */}
                  {selectedUser?.is_blocked && (
                    <div className="bg-red-50/50 border border-red-100 rounded-[2rem] p-8">
                       <h4 className="text-xs font-black uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                          <UserX className="w-4 h-4" /> Closure Reason
                       </h4>
                       <p className="text-red-900 font-bold italic text-lg leading-snug">
                          &quot;{selectedUser.blocked_reason || "Suspicious credentials or Terms of Service violation detected."}&quot;
                       </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     {/* Added Blogs */}
                     <div className="space-y-6">
                        <h4 className="text-xl font-black text-[#222222] flex items-center gap-3 border-b-4 border-[#F0FDFA] pb-2 w-fit">
                           <BookOpen className="w-6 h-6 text-orange-500" />
                           Recently Added Blogs
                        </h4>
                        {!viewDetails ? (
                          <div className="py-6 animate-pulse space-y-3">
                             {[1, 2].map(i => <div key={i} className="h-12 bg-gray-50 rounded-2xl"></div>)}
                          </div>
                        ) : viewDetails.blogs?.length > 0 ? (
                          <div className="space-y-4">
                             {viewDetails.blogs.map((blog: { id: string; title: string; created_at: string }) => (
                               <div key={blog.id} className="p-5 border border-gray-100 rounded-3xl hover:border-orange-200 hover:bg-orange-50/10 transition-all group/item">
                                  <h5 className="font-bold text-[#222222] group-hover/item:text-orange-600 transition-colors leading-tight">{blog.title}</h5>
                                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">{new Date(blog.created_at).toLocaleDateString()}</p>
                               </div>
                             ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
                             <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No blogs uploaded yet</p>
                          </div>
                        )}
                     </div>

                     {/* Added Properties */}
                     <div className="space-y-6">
                        <h4 className="text-xl font-black text-[#222222] flex items-center gap-3 border-b-4 border-[#F0FDFA] pb-2 w-fit">
                           <Building2 className="w-6 h-6 text-[#0D9488]" />
                           Properties Added
                        </h4>
                        {!viewDetails ? (
                          <div className="py-6 animate-pulse space-y-3">
                             {[1, 2].map(i => <div key={i} className="h-12 bg-gray-50 rounded-2xl"></div>)}
                          </div>
                        ) : viewDetails.properties?.length > 0 ? (
                          <div className="space-y-4">
                             {viewDetails.properties.map((prop: { id: string; title: string; location: string; price_per_month: number; image_urls?: string[] }) => (
                               <div key={prop.id} className="p-5 border border-gray-100 rounded-3xl hover:border-[#0D9488]/20 hover:bg-[#F0FDFA]/10 transition-all group/item flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                                     {prop.image_urls?.[0] ? (
                                       <img src={prop.image_urls[0]} alt={prop.title} width={56} height={56} className="object-cover w-full h-full" />
                                     ) : (
                                       <div className="w-full h-full bg-gray-200"></div>
                                     )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                     <h5 className="font-bold text-[#222222] group-hover/item:text-[#0D9488] transition-colors truncate">{prop.title}</h5>
                                     <p className="text-[10px] text-gray-400 font-bold flex items-center mt-1">
                                        <MapPin className="w-3 h-3 mr-1" /> {prop.location}
                                     </p>
                                  </div>
                                  <div className="text-right">
                                     <p className="text-sm font-black text-[#0D9488]">Rs. {prop.price_per_month}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
                             <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No properties added yet</p>
                          </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
      
      {showToast && (
        <Toast 
          message={showToast.message} 
          type={showToast.type} 
          onClose={() => setShowToast(null)} 
        />
      )}

    </div>
  );
}
