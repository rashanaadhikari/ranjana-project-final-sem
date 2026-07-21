"use client";

import { useEffect, useState } from "react";
import { Plus, Search, MapPin, Eye, Edit, Trash2, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getMyProperties, deleteProperty } from "@/services/properties.service";
import Toast from "@/app/components/ui/Toast";

export default function UserPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  const fetchProps = async () => {
    try {
      const data = await getMyProperties();
      setProperties(data || []);
    } catch (err: unknown) {
      // console.error(err);
      setActiveToast({ message: "Failed to fetch your properties", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      setActiveToast({ message: "Property deleted successfully", type: "success" });
    } catch (err: any) {
      setActiveToast({ message: err.message || "Failed to delete property", type: "error" });
    }
  };

  useEffect(() => {
    fetchProps();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">My Properties</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Manage and track your active property listings</p>
        </div>
        <Link 
          href="/user/dashboard/properties/add"
          className="bg-[#0D9488] hover:bg-[#0D9488] text-white px-6 py-3.5 rounded-[1.25rem] font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#0D9488]/20 active:scale-95 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          <span>Add New Property</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Simple Stats for My Properties */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-gray-500 text-sm font-medium">Total Properties</p>
           <h4 className="text-2xl font-bold text-gray-900 mt-1">{properties.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-gray-500 text-sm font-medium">Total Approved</p>
           <h4 className="text-2xl font-bold text-green-600 mt-1">{properties.filter((p: any) => p.is_active).length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-gray-500 text-sm font-medium">Total Pending</p>
           <h4 className="text-2xl font-bold text-orange-500 mt-1">{properties.filter((p: any) => !p.is_active).length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-gray-500 text-sm font-medium">Total Rejected</p>
           <h4 className="text-2xl font-bold text-red-600 mt-1">0</h4>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Filters/Search */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/20">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0D9488] transition-colors" />
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#0D9488]/5 focus:border-[#0D9488] transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">
                <th className="px-8 py-5">Property Info</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Details</th>
                <th className="px-8 py-5">Monthly Rent</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest leading-loose">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-[#0D9488]/20 border-t-[#0D9488] rounded-full animate-spin" />
                      Loading your listings...
                    </div>
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-400">
                      <Building2 className="w-12 h-12 opacity-20" />
                      <div className="space-y-1">
                        <p className="font-bold uppercase text-xs tracking-widest">No properties listed yet</p>
                        <p className="text-xs font-medium">Click &quot;Add New Property&quot; to get started</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 ring-1 ring-gray-100 group-hover:ring-[#0D9488]/20 transition-all group-hover:shadow-lg relative">
                        <img src={property.image_urls?.[0] || "/placeholder-property.jpg"} alt="" className="object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-gray-900 group-hover:text-[#0D9488] transition-colors">{property.title}</div>
                        <div className="text-[10px] text-gray-500 flex items-center font-bold tracking-wider mt-1">
                          <MapPin className="w-3 h-3 mr-1 text-[#0D9488]" /> {property.location || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      property.is_active 
                        ? "bg-green-100 text-green-700" 
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {property.is_active ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-xs text-gray-600 font-bold uppercase tracking-tighter">
                    {property.room_type}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="text-sm font-extrabold text-gray-900">
                      ₹ {property.price_per_month}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">per month</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-[#222]">
                       <button onClick={() => setSelectedProperty(property)} title="View Details" className="p-3 bg-gray-50 text-gray-400 hover:text-[#0D9488] hover:bg-[#0D9488]/5 rounded-xl transition-all group-hover:shadow-sm inline-block">
                         <Eye className="w-4 h-4" />
                       </button>
                       {/* <Link href={`/user/dashboard/properties/edit/${property.id}`} title="Edit" className="p-3 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all inline-block">
                         <Edit className="w-4 h-4" />
                       </Link> */}
                       <button onClick={() => handleDelete(property.id)} title="Delete" className="p-3 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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

      {/* Modern Detail Modal matching admin reference */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProperty(null)}
              className="absolute top-6 right-6 p-2.5 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header section with top spacing */}
            <div className="pt-16 pb-6 flex flex-col items-center px-8 relative">
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-red-50 to-orange-50 rounded-t-[2rem]" />
              
              <div className="w-32 h-32 rounded-3xl bg-white overflow-hidden shadow-xl border-4 border-white mb-5 relative z-10 ring-1 ring-gray-100">
                <img src={selectedProperty.image_urls?.[0] || "/placeholder-property.jpg"} alt="cover" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 text-center relative z-10">{selectedProperty.title}</h2>
              <span className={`mt-3 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest relative z-10 shadow-sm ${selectedProperty.is_active ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                {selectedProperty.is_active ? "Approved" : "Pending Approval"}
              </span>
            </div>

            {/* Details Section */}
            <div className="p-8 pt-2 space-y-8">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-white shadow-sm rounded-2xl text-xs font-bold text-gray-700 border border-gray-100">
                  <MapPin className="w-4 h-4 text-[#0D9488]" />
                  {selectedProperty.location} {selectedProperty.detailed_address && `, ${selectedProperty.detailed_address}`}
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-white shadow-sm rounded-2xl text-xs font-bold text-gray-700 border border-gray-100">
                  <Building2 className="w-4 h-4 text-[#0D9488]" />
                  {selectedProperty.room_type}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F0FDFA]/50 border border-[#F0FDFA] rounded-[1.5rem] p-6 text-center">
                  <p className="text-[10px] font-bold text-[#0D9488]/70 uppercase tracking-widest mb-1.5">Monthly Rent</p>
                  <h3 className="text-2xl font-black text-[#0D9488]">₹ {selectedProperty.price_per_month}</h3>
                </div>
                {/* 4 sub-stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                     <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Bedrooms</p>
                     <p className="text-sm font-black text-gray-800 mt-0.5">{selectedProperty.bedrooms}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                     <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Kitchens</p>
                     <p className="text-sm font-black text-gray-800 mt-0.5">{selectedProperty.kitchens}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                     <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Floor</p>
                     <p className="text-sm font-black text-gray-800 mt-0.5">{selectedProperty.floor_number}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                     <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Living Rm</p>
                     <p className="text-sm font-black text-gray-800 mt-0.5">{selectedProperty.is_living_room_available ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-8 h-px bg-gray-200" />
                  Description
                  <span className="flex-1 h-px bg-gray-200" />
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {selectedProperty.description || "No description provided for this property."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
