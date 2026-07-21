"use client";

import { Box, Search, Filter, Plus, Edit, Trash2, Home, LayoutList, CheckCircle2, MoreVertical } from "lucide-react";

export default function AdminRoomsPage() {
  const rooms = [
    { id: "RM-101", type: "Single Room", property: "Itahari Central Building", price: "Rs. 5,000", availability: "Available", floor: "2nd Floor" },
    { id: "RM-102", type: "2BHK Suite", property: "Dharan Royal Flat", price: "Rs. 15,000", availability: "Booked", floor: "Ground Floor" },
    { id: "RM-103", type: "Business Shutter", property: "Main Road Plaza", price: "Rs. 25,000", availability: "Available", floor: "Ground Floor" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 pb-12">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#222222]">Room Management</h1>
          <p className="text-gray-500 text-sm font-medium">Configure and manage individual unit types across all properties</p>
        </div>
        <button className="bg-[#222] hover:bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl active:scale-95">
          <Plus className="w-5 h-5" />
          <span>Add New Room Type</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#0D9488]/20 transition-all">
           <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
             <LayoutList className="w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Units</p>
              <h4 className="text-xl font-bold text-[#222222]">1,402</h4>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#0D9488]/20 transition-all">
           <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
             <Home className="w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available</p>
              <h4 className="text-xl font-bold text-[#222222]">894</h4>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#0D9488]/20 transition-all">
           <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] text-[#0D9488] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
             <Box className="w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium Suites</p>
              <h4 className="text-xl font-bold text-[#222222]">124</h4>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/20">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0D9488] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by room type or property..." 
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#0D9488]/5 focus:border-[#0D9488] transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-3.5 border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 transition-all">
               Filter By Floor
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">
                <th className="px-8 py-5">Room Type</th>
                <th className="px-8 py-5">Property Name</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Availability</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-gray-900">{room.type}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 tracking-wider uppercase font-bold">{room.floor}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-600 font-medium">
                    {room.property}
                  </td>
                  <td className="px-8 py-6 font-bold text-gray-900 text-sm">
                    {room.price}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      room.availability === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700 shadow-sm"
                    }`}>
                      {room.availability}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                         <Edit className="w-4 h-4" />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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
    </div>
  );
}
