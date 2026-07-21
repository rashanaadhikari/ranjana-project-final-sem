"use client";

import { useEffect, useState, useRef } from "react";
import { Search, CheckCircle2, XCircle, MapPin, ShieldAlert, Phone, PhoneOff, MoreVertical, Eye, X, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { getAdminProperties, updatePropertyStatus, deleteProperty } from "@/services/properties.service";
import Image from "next/image";
import Link from "next/link";
import Toast from "@/app/components/ui/Toast";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Array<{
    id: string;
    title: string;
    location: string;
    price_per_month: number;
    image_urls: string[];
    is_active: boolean;
    contact_phone?: string;
    users?: {
      name: string;
      phone_number?: string;
    };
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string, type: 'approve'|'reject' } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchProps = async () => {
    try {
      const data = await getAdminProperties();
      setProperties(data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch properties";
      setActiveToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProps(); }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const executeStatusUpdate = async () => {
    if (!confirmAction) return;
    const { id, type } = confirmAction;
    const is_active = type === 'approve';
    try {
      await updatePropertyStatus(id, is_active);
      setActiveToast({ message: is_active ? "Property Approved ✓" : "Property Restricted", type: "success" });
      fetchProps();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Update failed";
      setActiveToast({ message, type: "error" });
    } finally {
      setConfirmAction(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property permanently? This action cannot be undone.")) return;
    setOpenMenuId(null);
    try {
      await deleteProperty(id);
      setActiveToast({ message: "Property Deleted Permanently", type: "success" });
      fetchProps();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Delete failed";
      setActiveToast({ message, type: "error" });
    }
  };

  const pendingCount = properties.filter(p => !p.is_active).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 text-heading">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Property Moderation</h1>
          <p className="text-subtitle text-sm font-medium mt-1">Approve or reject property listings posted by users</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/dashboard/properties/add"
            className="bg-brand text-white p-3 rounded-2xl shadow-lg hover:bg-brand-dark transition-all active:scale-95 flex items-center justify-center border-2 border-white"
            title="Add Property"
          >
            <Plus className="w-6 h-6" />
          </Link>
          {/* {pendingCount > 0 && (
            <div className="bg-orange-50 border border-orange-100 text-orange-600 px-4 py-3 rounded-2xl text-[10px] font-extrabold flex items-center gap-2 animate-pulse shadow-sm">
              <ShieldAlert className="w-4 h-4" /> {pendingCount} PENDING APPROVAL
            </div>
          )} */}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/20">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand transition-colors" />
            <input
              type="text"
              placeholder="Search by ID, title or owner..."
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto" ref={menuRef}>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">
                <th className="px-6 py-5 w-12 text-center">#</th>
                <th className="px-8 py-5">Property Info</th>
                <th className="px-8 py-5">Owner & Contact</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">Loading properties...</td></tr>
              ) : properties.length === 0 ? (
                <tr><td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">No properties found</td></tr>
              ) : properties.map((prop, index) => (
                <tr key={prop.id} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-6 py-6 text-center text-xs font-bold text-gray-300">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>

                  <td className="px-8 py-6 max-w-md">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 ring-1 ring-gray-100 relative">
                        <Image
                          src={prop.image_urls?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200"}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {prop.image_urls?.length > 1 && (
                          <div className="absolute bottom-0 right-0 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-tl-lg">
                            +{prop.image_urls.length - 1}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-extrabold text-gray-900 line-clamp-1">{prop.title}</div>
                        <div className="text-[10px] text-gray-500 flex items-center font-bold tracking-wider uppercase">
                          <MapPin className="w-3 h-3 mr-1 text-brand" /> {prop.location || "N/A"}
                        </div>
                        <div className="text-xs font-bold text-brand">
                          Rs. {prop.price_per_month} <span className="text-[10px] text-gray-400 font-normal">/ month</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-gray-900">{prop.users?.name || "Unknown Owner"}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {prop.is_active ? <Phone className="w-3 h-3 text-green-500" /> : <PhoneOff className="w-3 h-3 text-gray-400" />}
                      <span className="text-xs font-mono font-bold tracking-tight transition-all text-gray-600">
                        {prop.users?.phone_number || prop.contact_phone || "No Number"}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${prop.is_active ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {prop.is_active ? "Approved" : "Pending"}
                    </span>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 relative">

                      {/* Eye — view details */}
                      <button
                        onClick={() => setSelectedProperty(prop)}
                        title="View Details"
                        className="p-3 bg-gray-50 text-gray-400 hover:text-brand hover:bg-brand/5 rounded-xl transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Three-dot dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === prop.id ? null : prop.id)}
                          className="p-3 bg-gray-50 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openMenuId === prop.id && (
                          <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                            <button
                              onClick={() => { setOpenMenuId(null); setConfirmAction({ id: prop.id, type: 'approve' }); }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition-colors font-semibold"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Approve
                            </button>
                            <div className="border-t border-gray-50" />
                            <button
                              onClick={() => { setOpenMenuId(null); setConfirmAction({ id: prop.id, type: 'reject' }); }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                            >
                              <XCircle className="w-4 h-4" /> Reject
                            </button>
                            <div className="border-t border-gray-50" />
                            <button
                              onClick={() => handleDelete(prop.id)}
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

      {/* Full Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedProperty(null)}
              className="absolute top-6 right-6 p-2.5 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pt-16 pb-6 flex flex-col items-center px-8 relative">
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-red-50 to-orange-50 rounded-t-[2rem]" />
              
              <div className="w-40 h-40 rounded-3xl bg-white overflow-hidden shadow-xl border-4 border-white mb-5 relative z-10">
                <img src={selectedProperty.image_urls?.[0] || "/placeholder-property.jpg"} alt={selectedProperty.title} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 text-center relative z-10">{selectedProperty.title}</h2>
              <span className={`mt-3 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest relative z-10 shadow-sm ${selectedProperty.is_active ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                {selectedProperty.is_active ? "Approved" : "Pending Approval"}
              </span>
            </div>

            <div className="p-8 pt-2 space-y-8">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-white shadow-sm rounded-2xl text-xs font-bold text-gray-700 border border-gray-100">
                  <MapPin className="w-4 h-4 text-brand" />
                  {selectedProperty.location} {selectedProperty.detailed_address && `, ${selectedProperty.detailed_address}`}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-light/50 border border-brand-light rounded-3xl p-6 text-center shadow-sm">
                  <p className="text-[10px] font-bold text-brand/70 uppercase tracking-widest mb-1.5">Monthly Rent</p>
                  <h3 className="text-2xl font-black text-brand">₹ {selectedProperty.price_per_month}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                     <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Bedrooms</p>
                     <p className="text-sm font-black text-gray-800 mt-0.5">{selectedProperty.bedrooms || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                     <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Kitchens</p>
                     <p className="text-sm font-black text-gray-800 mt-0.5">{selectedProperty.kitchens || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                     <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Floor</p>
                     <p className="text-sm font-black text-gray-800 mt-0.5">{selectedProperty.floor_number || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                     <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Living Rm</p>
                     <p className="text-sm font-black text-gray-800 mt-0.5">{selectedProperty.is_living_room_available ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-sm text-gray-700 leading-relaxed font-medium">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Description</h4>
                {selectedProperty.description || "No description provided."}
              </div>
            </div>
            
            {/* Action Bar for Admin */}
            {!selectedProperty.is_active && (
               <div className="flex px-8 pb-8 gap-4 mt-4">
                  <button onClick={() => { setSelectedProperty(null); setConfirmAction({ id: selectedProperty.id, type: 'reject' }); }} className="flex-1 py-4 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">Reject</button>
                  <button onClick={() => { setSelectedProperty(null); setConfirmAction({ id: selectedProperty.id, type: 'approve' }); }} className="flex-1 py-4 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors shadow-md shadow-green-500/20">Approve Property</button>
               </div>
            )}
          </div>
        </div>
      )}

      {/* Beautiful Action Confirmation Popup at Bottom Center */}
      {confirmAction && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm animate-in fade-in flex items-end sm:items-center justify-center p-4">
           {/* Modal Dialog */}
           <div className="bg-white max-w-md w-full rounded-t-[2rem] sm:rounded-3xl shadow-2xl p-6 sm:p-8 transform transition-all animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300">
             
             <div className="flex flex-col items-center text-center">
               <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${confirmAction.type === 'approve' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                 {confirmAction.type === 'approve' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
               </div>
               
               <h3 className="text-2xl font-black text-gray-900 mb-2">
                 {confirmAction.type === 'approve' ? 'Approve Property' : 'Reject Property'}
               </h3>
               
               <p className="text-gray-500 font-medium mb-8">
                 {confirmAction.type === 'approve' 
                   ? 'Are you sure you want to approve this property? It will go live and become visible to all users.'
                   : 'Are you sure you want to reject this property? It will become restricted immediately.'}
               </p>

               <div className="flex items-center gap-3 w-full">
                 <button 
                   onClick={() => setConfirmAction(null)}
                   className="flex-1 py-3.5 px-4 font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={executeStatusUpdate}
                   className={`flex-1 py-3.5 px-4 font-bold text-white rounded-xl shadow-lg transition-colors ${
                     confirmAction.type === 'approve' 
                       ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' 
                       : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                   }`}
                 >
                   Confirm {confirmAction.type === 'approve' ? 'Approval' : 'Rejection'}
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
