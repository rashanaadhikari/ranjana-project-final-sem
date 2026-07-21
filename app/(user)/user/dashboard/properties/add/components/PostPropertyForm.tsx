// // "use client";

// // import { useState, useCallback } from "react";
// // import dynamic from "next/dynamic";
// // import { UploadCloud, ChevronRight } from "lucide-react";
// // import Image from "next/image";
// // import { Loader } from "@/app/(user)/user/dashboard/components/Loader";
// // import Toast from "@/app/components/ui/Toast";
// // import { createProperty } from "@/services/properties.service";

// // // Dynamic import for PropertyMap since Leaflet needs 'window'
// // const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false });

// // export default function PostPropertyForm({ onSuccess }: { onSuccess: () => void }) {
// //   const [loading, setLoading] = useState(false);
// //   const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
// //   const [rentError, setRentError] = useState("");
// //   const [images, setImages] = useState<File[]>([]);
// //   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     rent: "",
// //     bedrooms: "1",
// //     kitchens: "1",
// //     category: "1 BHK",
// //     address: "",
// //     floor: "Ground Floor",
// //     tags: "",
// //     livingRoom: "Available",
// //     RentDesign: "commercial",
// //     description: "",
// //     lat: 26.6666, // Default to Itahari
// //     lng: 87.2736,
// //   });

// //   const handleLocationChange = useCallback((lat: number, lng: number) => {
// //     setFormData(prev => ({ ...prev, lat, lng }));
// //   }, []);


// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // Rent Validation
// //     const rentVal = parseInt(formData.rent);
// //     if (isNaN(rentVal) || rentVal < 500) {
// //       setRentError("Price range should start from Rs. 500");
// //       return;
// //     }
// //     if (rentVal > 100000) {
// //       setRentError("Price must be maximum 1 Lakh (Rs. 100,000)");
// //       return;
// //     }

// //     setLoading(true);
// //     setRentError("");

// //     try {
// //       const data = new FormData();
// //       Object.entries(formData).forEach(([key, value]) => {
// //         data.append(key, value.toString());
// //       });

// //       images.forEach(image => {
// //         data.append('images', image);
// //       });

// //       await createProperty(data);
// //       setActiveToast({ message: "Property posted successfully!", type: "success" });
// //       setTimeout(onSuccess, 1500);
// //     } catch (error: unknown) {
// //       console.error("Submission failed:", error);
// //       const message = error instanceof Error ? error.message : "An unexpected error occurred";
// //       setActiveToast({ message, type: "error" });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   //Handling Image
// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = Array.from(e.target.files || []);
// //     const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024); // 5MB limit

// //     const newPreviews = validFiles.map(f => URL.createObjectURL(f));
// //     setImages(prev => [...prev, ...validFiles]);
// //     setImagePreviews(prev => [...prev, ...newPreviews]);
// //   };

// //   const removeImage = (index: number) => {
// //     URL.revokeObjectURL(imagePreviews[index]);
// //     setImages(prev => prev.filter((_, i) => i !== index));
// //     setImagePreviews(prev => prev.filter((_, i) => i !== index));
// //   };


// //   if (loading) {
// //     return (
// //       <div className="min-h-[60vh] flex items-center justify-center">
// //         <Loader />
// //       </div>
// //     );
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
// //       <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100/80 space-y-8 hover:shadow-lg transition-shadow duration-300">

// //         {/* Basic Info */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div className="space-y-2">
// //             <label className="text-sm font-bold text-gray-700 ml-1">Property Title</label>
// //             <input
// //               required
// //               type="text"
// //               placeholder="e.g. Modern Studio in Itahari"
// //               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all"
// //               value={formData.title}
// //               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //             />
// //           </div>
// //           <div className="space-y-2">
// //             <label className="text-sm font-bold text-gray-700 ml-1">Monthly Rent (Rs.)</label>
// //             <div className="relative">
// //               <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs uppercase tracking-tighter">Rs.</span>
// //               <input
// //                 required
// //                 type="number"
// //                 placeholder="5000"
// //                 className={`w-full pl-12 pr-5 py-3.5 bg-gray-50/50 border ${rentError ? "border-red-400 focus:ring-red-50" : "border-gray-100 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"} rounded-2xl focus:outline-none focus:ring-2 transition-all`}
// //                 value={formData.rent}
// //                 onChange={(e) => {
// //                   setFormData({ ...formData, rent: e.target.value });
// //                   if (rentError) setRentError("");
// //                 }}
// //               />
// //             </div>
// //             {rentError && <p className="text-xs font-bold text-red-500 ml-2 mt-1 animate-in fade-in slide-in-from-top-1">{rentError}</p>}
// //           </div>
// //         </div>

// //         {/* Details Grid */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           <div className="space-y-2">
// //             <label className="text-sm font-bold text-gray-700 ml-1">Bedrooms</label>
// //             <select
// //               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
// //               value={formData.bedrooms}
// //               onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
// //             >
// //               {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
// //             </select>
// //           </div>
// //           <div className="space-y-2">
// //             <label className="text-sm font-bold text-gray-700 ml-1">Kitchens</label>
// //             <select
// //               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
// //               value={formData.kitchens}
// //               onChange={(e) => setFormData({ ...formData, kitchens: e.target.value })}
// //             >
// //               {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
// //             </select>
// //           </div>
// //           <div className="space-y-2">
// //             <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
// //             <select
// //               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
// //               value={formData.category}
// //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //             >
// //               <option value="Single Room">Single Room</option>
// //               <option value="2/3 Rooms Flat">2/3 Rooms Flat</option>
// //               <option value="1 BHK">1 BHK</option>
// //               <option value="2 BHK">2 BHK</option>
// //               <option value="3 BHK">3 BHK</option>
// //               <option value="Office Space">Office Space</option>
// //               <option value="Business Shutter">Business Shutter</option>
// //             </select>
// //           </div>
// //           <div className="space-y-2">
// //             <label className="text-sm font-bold text-gray-700 ml-1">Floor</label>
// //             <select
// //               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
// //               value={formData.floor}
// //               onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
// //             >
// //               <option value="Ground Floor">Ground Floor</option>
// //               <option value="1st Floor">1st Floor</option>
// //               <option value="2nd Floor">2nd Floor</option>
// //               <option value="3rd Floor">3rd Floor</option>
// //               <option value="4th Floor">4th Floor</option>
// //               <option value="5th Floor">5th Floor</option>
// //             </select>
// //           </div>
// //           <div className="space-y-2">
// //             <label className="text-sm font-bold text-gray-700 ml-1">Living Room</label>
// //             <select
// //               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
// //               value={formData.livingRoom}
// //               onChange={(e) => setFormData({ ...formData, livingRoom: e.target.value })}
// //             >
// //               <option value="Available">Available</option>
// //               <option value="Unavailable">Unavailable</option>
// //             </select>
// //           </div>
// //           <div className="space-y-2">
// //             <label className="text-sm font-bold text-gray-700 ml-1">Tags</label>
// //             <input
// //               type="text"
// //               placeholder="e.g. Furnished, Parking"
// //               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all"
// //               value={formData.tags}
// //               onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
// //             />
// //           </div>
// //         </div>

// //         <div className="space-y-2">
// //           <label className="text-sm font-bold text-gray-700 ml-1">Rent Design</label>
// //           {/* <input 
// //               required
// //               type="text" 
// //               placeholder="e.g. Beside Central Plaza, Itahari-4"
// //               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all"
// //               value={formData.address}
// //               onChange={(e) => setFormData({...formData, address: e.target.value})}
// //             /> */}
// //           <select
// //             className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
// //             value={formData.RentDesign}
// //             onChange={(e) => setFormData({ ...formData, RentDesign: e.target.value })}
// //           >
// //             <option value="commercial">commercial</option>
// //             <option value="residential">residential</option>
// //             <option value="business-shutter">business-shutter</option>
// //           </select>
// //         </div>
// //         <div className="space-y-2">
// //           <label className="text-sm font-bold text-gray-700 ml-1">Detailed Address</label>
// //           <input
// //             required
// //             type="text"
// //             placeholder="e.g. Beside Central Plaza, Itahari-4"
// //             className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all"
// //             value={formData.address}
// //             onChange={(e) => setFormData({ ...formData, address: e.target.value })}
// //           />
// //         </div>

// //         <div className="space-y-2">
// //           <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
// //           <textarea
// //             required
// //             rows={4}
// //             placeholder="Tell us more about your property..."
// //             className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all resize-none"
// //             value={formData.description}
// //             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //           />
// //         </div>

// //         {/* Image Upload Placeholder */}
// //         <div className="space-y-2">
// //           <label className="text-sm font-bold text-gray-700 ml-1">Property Images</label>

// //           <label className="border-2 border-dashed border-gray-100 bg-gray-50/30 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center group hover:border-[#0D9488]/30 transition-all cursor-pointer">
// //             <input
// //               type="file"
// //               accept="image/png, image/jpeg, image/webp"
// //               multiple
// //               className="hidden"
// //               onChange={handleImageChange}
// //             />
// //             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 mb-4 shadow-sm group-hover:scale-110 group-hover:text-[#0D9488] transition-all">
// //               <UploadCloud className="w-8 h-8" />
// //             </div>
// //             <p className="font-bold text-gray-700">Click or drag to upload images</p>
// //             <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (Max. 5MB per image)</p>
// //           </label>

// //           {/* Previews */}
// //           {imagePreviews.length > 0 && (
// //             <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
// //               {imagePreviews.map((src, i) => (
// //                 <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100">
// //                   <Image src={src} alt={`preview-${i}`} fill className="object-cover" unoptimized />
// //                   <button
// //                     type="button"
// //                     onClick={() => removeImage(i)}
// //                     className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-full text-gray-500 hover:text-[#0D9488] hover:bg-white flex items-center justify-center text-xs font-bold shadow transition-all opacity-0 group-hover:opacity-100"
// //                   >
// //                     ✕
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Map Section */}
// //         <div className="space-y-4">
// //           <div className="flex items-center justify-between ml-1">
// //             <label className="text-sm font-bold text-gray-700">Property Location</label>
// //             <span className="text-[10px] bg-[#0D9488]/10 text-[#0D9488] px-2 py-0.5 rounded-full font-bold">ITAHARI, NEPAL</span>
// //           </div>
// //           <PropertyMap
// //             lat={formData.lat}
// //             lng={formData.lng}
// //             onLocationChange={handleLocationChange}
// //           />
// //         </div>

// //         {/* Submission */}
// //         <div className="flex items-center gap-4 pt-4">
// //           <button
// //             type="button"
// //             className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all active:scale-95 border border-gray-100"
// //             onClick={() => window.history.back()}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="submit"
// //             className="flex-[2] bg-[#0D9488] text-white px-6 py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0D9488]/20 active:scale-95 group"
// //           >
// //             <span>Post Property</span>
// //             <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
// //           </button>
// //         </div>

// //       </div>

// //       {activeToast && (
// //         <Toast
// //           message={activeToast.message}
// //           type={activeToast.type}
// //           onClose={() => setActiveToast(null)}
// //         />
// //       )}
// //     </form>
// //   );
// // }




// //updated

// "use client";

// import { useState, useCallback, useEffect, useRef } from "react";
// import dynamic from "next/dynamic";
// import { UploadCloud, ChevronRight, MapPin, Loader2 } from "lucide-react";
// import Image from "next/image";
// import { Loader } from "@/app/(user)/user/dashboard/components/Loader";
// import Toast from "@/app/components/ui/Toast";
// import { createProperty } from "@/services/properties.service";

// // const PropertyMap = dynamic(
// //   () => import("@/app/(user)/user/dashboard/properties/add/components/PropertyMap"),
// //   { ssr: false }
// // );

// // Itahari Sub-Metropolitan City — 19 wards
// const ITAHARI_WARDS = Array.from({ length: 19 }, (_, i) => `Itahari-${i + 1}`);

// // Fixed Itahari center fallback
// const ITAHARI_CENTER = { lat: 26.6666, lng: 87.2736 };

// export default function AdminPostPropertyForm({ onSuccess }: { onSuccess: () => void }) {
//   const [loading, setLoading] = useState(false);
//   const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
//   const [rentError, setRentError] = useState("");
//   const [images, setImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   // Geocoding state
//   const [geocoding, setGeocoding] = useState(false);
//   const [geocodeLabel, setGeocodeLabel] = useState<string | null>(null);
//   const geocodeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     rent: "",
//     bedrooms: "1",
//     kitchens: "1",
//     category: "1 BHK",
//     ward: "Itahari-1",      // → saved as `location`
//     street: "",             // → saved as `detailed_address`
//     floor: "Ground Floor",
//     tags: "",
//     livingRoom: "Available",
//     RentDesign: "commercial",
//     description: "",
//     lat: ITAHARI_CENTER.lat,
//     lng: ITAHARI_CENTER.lng,
//   });

//   // ── Geocode whenever ward + street are both non-empty ──────────────────────
//   const showMap = formData.ward.trim() !== "" && formData.street.trim() !== "";

//   useEffect(() => {
//     if (!formData.street.trim()) {
//       setGeocodeLabel(null);
//       return;
//     }

//     // Debounce: wait 800 ms after last keystroke
//     if (geocodeTimer.current) clearTimeout(geocodeTimer.current);

//     geocodeTimer.current = setTimeout(async () => {
//       const query = `${formData.street}, ${formData.ward}, Itahari, Nepal`;
//       setGeocoding(true);
//       setGeocodeLabel(null);

//       try {
//         const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
//         const res = await fetch(url, {
//           headers: { "Accept-Language": "en", "User-Agent": "SSRental/1.0" },
//         });
//         const data = await res.json();

//         if (data && data.length > 0) {
//           const { lat, lon } = data[0];
//           setFormData(prev => ({ ...prev, lat: parseFloat(lat), lng: parseFloat(lon) }));
//           setGeocodeLabel(`${formData.ward}, ${formData.street} — Itahari, Nepal`);
//         } else {
//           // Fallback: keep current pin, show a softer label
//           setGeocodeLabel(`Showing general area for ${formData.ward}`);
//         }
//       } catch {
//         setGeocodeLabel(null);
//       } finally {
//         setGeocoding(false);
//       }
//     }, 800);

//     return () => {
//       if (geocodeTimer.current) clearTimeout(geocodeTimer.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [formData.ward, formData.street]);

//   const handleLocationChange = useCallback((lat: number, lng: number) => {
//     setFormData(prev => ({ ...prev, lat, lng }));
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const rentVal = parseInt(formData.rent);
//     if (isNaN(rentVal) || rentVal < 500) {
//       setRentError("Price range should start from Rs. 500");
//       return;
//     }
//     if (rentVal > 100000) {
//       setRentError("Price must be maximum 1 Lakh (Rs. 100,000)");
//       return;
//     }

//     setLoading(true);
//     setRentError("");

//     try {
//       const data = new FormData();

//       // Map form fields to DB columns
//       data.append("title", formData.title);
//       data.append("rent", formData.rent);
//       data.append("bedrooms", formData.bedrooms);
//       data.append("kitchens", formData.kitchens);
//       data.append("category", formData.category);
//       data.append("location", formData.ward);           // → `location` column
//       data.append("detailed_address", formData.street); // → `detailed_address` column
//       data.append("floor", formData.floor);
//       data.append("tags", formData.tags);
//       data.append("livingRoom", formData.livingRoom);
//       data.append("RentDesign", formData.RentDesign);
//       data.append("description", formData.description);
//       data.append("lat", formData.lat.toString());
//       data.append("lng", formData.lng.toString());
//       data.append("is_active", "true"); // Admin posts are auto-approved

//       images.forEach(image => data.append("images", image));

//       await createProperty(data);
//       setActiveToast({ message: "Property posted successfully!", type: "success" });
//       setTimeout(onSuccess, 1500);
//     } catch (error: unknown) {
//       console.error("Submission failed:", error);
//       const message = error instanceof Error ? error.message : "An unexpected error occurred";
//       setActiveToast({ message, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024);
//     setImages(prev => [...prev, ...validFiles]);
//     setImagePreviews(prev => [...prev, ...validFiles.map(f => URL.createObjectURL(f))]);
//   };

//   const removeImage = (index: number) => {
//     URL.revokeObjectURL(imagePreviews[index]);
//     setImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
//       <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100/80 space-y-8 hover:shadow-lg transition-shadow duration-300">

//         {/* ── Basic Info ── */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-bold text-gray-700 ml-1">Property Title</label>
//             <input
//               required
//               type="text"
//               placeholder="e.g. Modern Studio in Itahari"
//               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-bold text-gray-700 ml-1">Monthly Rent (Rs.)</label>
//             <div className="relative">
//               <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs uppercase tracking-tighter">Rs.</span>
//               <input
//                 required
//                 type="number"
//                 placeholder="5000"
//                 className={`w-full pl-12 pr-5 py-3.5 bg-gray-50/50 border ${rentError ? "border-red-400 focus:ring-red-50" : "border-gray-100 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"} rounded-2xl focus:outline-none focus:ring-2 transition-all`}
//                 value={formData.rent}
//                 onChange={(e) => {
//                   setFormData({ ...formData, rent: e.target.value });
//                   if (rentError) setRentError("");
//                 }}
//               />
//             </div>
//             {rentError && (
//               <p className="text-xs font-bold text-red-500 ml-2 mt-1 animate-in fade-in slide-in-from-top-1">
//                 {rentError}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* ── Details Grid ── */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             {
//               label: "Bedrooms", key: "bedrooms",
//               options: [1, 2, 3, 4, 5, 6].map(n => ({ value: String(n), label: String(n) })),
//             },
//             {
//               label: "Kitchens", key: "kitchens",
//               options: [1, 2, 3, 4, 5].map(n => ({ value: String(n), label: String(n) })),
//             },
//             {
//               label: "Category", key: "category",
//               options: ["Single Room", "2/3 Rooms Flat", "1 BHK", "2 BHK", "3 BHK", "Office Space", "Business Shutter"]
//                 .map(v => ({ value: v, label: v })),
//             },
//             {
//               label: "Floor", key: "floor",
//               options: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor"]
//                 .map(v => ({ value: v, label: v })),
//             },
//             {
//               label: "Living Room", key: "livingRoom",
//               options: [{ value: "Available", label: "Available" }, { value: "Unavailable", label: "Unavailable" }],
//             },
//           ].map(({ label, key, options }) => (
//             <div key={key} className="space-y-2">
//               <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
//               <select
//                 className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
//                 value={formData[key as keyof typeof formData] as string}
//                 onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
//               >
//                 {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
//               </select>
//             </div>
//           ))}

//           <div className="space-y-2">
//             <label className="text-sm font-bold text-gray-700 ml-1">Tags</label>
//             <input
//               type="text"
//               placeholder="e.g. Furnished, Parking"
//               className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all"
//               value={formData.tags}
//               onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-bold text-gray-700 ml-1">Rent Design</label>
//           <select
//             className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
//             value={formData.RentDesign}
//             onChange={(e) => setFormData({ ...formData, RentDesign: e.target.value })}
//           >
//             <option value="commercial">Commercial</option>
//             <option value="residential">Residential</option>
//             <option value="business-shutter">Business Shutter</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
//           <textarea
//             required
//             rows={4}
//             placeholder="Tell us more about your property..."
//             className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all resize-none"
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           />
//         </div>

//         {/* ── Images ── */}
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-gray-700 ml-1">Property Images</label>
//           <label className="border-2 border-dashed border-gray-100 bg-gray-50/30 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center group hover:border-[#0D9488]/30 transition-all cursor-pointer">
//             <input
//               type="file"
//               accept="image/png, image/jpeg, image/webp"
//               multiple
//               className="hidden"
//               onChange={handleImageChange}
//             />
//             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 mb-4 shadow-sm group-hover:scale-110 group-hover:text-[#0D9488] transition-all">
//               <UploadCloud className="w-8 h-8" />
//             </div>
//             <p className="font-bold text-gray-700">Click or drag to upload images</p>
//             <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (Max. 5MB per image)</p>
//           </label>
//           {imagePreviews.length > 0 && (
//             <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
//               {imagePreviews.map((src, i) => (
//                 <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100">
//                   <Image src={src} alt={`preview-${i}`} fill className="object-cover" unoptimized />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(i)}
//                     className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-full text-gray-500 hover:text-[#0D9488] hover:bg-white flex items-center justify-center text-xs font-bold shadow transition-all opacity-0 group-hover:opacity-100"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ── Property Location ── */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between ml-1">
//             <label className="text-sm font-bold text-gray-700">Property Location</label>
//             <span className="text-[10px] bg-[#0D9488]/10 text-[#0D9488] px-2 py-0.5 rounded-full font-bold tracking-wide">
//               ITAHARI, NEPAL
//             </span>
//           </div>

//           {/* Ward + Street inputs — side by side */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* Ward / Area */}
//             <div className="relative bg-gray-50/60 border border-gray-100 rounded-2xl px-5 pt-3 pb-3 focus-within:border-[#0D9488] focus-within:ring-2 focus-within:ring-[#0D9488]/10 transition-all">
//               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
//                 <MapPin className="w-3 h-3" /> Ward / Area
//               </label>
//               <select
//                 required
//                 className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-base font-semibold text-gray-800 appearance-none cursor-pointer pr-6"
//                 value={formData.ward}
//                 onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
//               >
//                 {ITAHARI_WARDS.map(w => (
//                   <option key={w} value={w}>{w}</option>
//                 ))}
//               </select>
//               {/* Custom chevron */}
//               <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
//             </div>

//             {/* Street / Landmark */}
//             <div className="relative bg-gray-50/60 border border-gray-100 rounded-2xl px-5 pt-3 pb-3 focus-within:border-[#0D9488] focus-within:ring-2 focus-within:ring-[#0D9488]/10 transition-all">
//               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
//                 🏪 Street / Landmark
//               </label>
//               <input
//                 required
//                 type="text"
//                 placeholder="e.g. Sangit Chowk"
//                 className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-base font-semibold text-gray-800 placeholder:text-gray-300"
//                 value={formData.street}
//                 onChange={(e) => setFormData({ ...formData, street: e.target.value })}
//               />
//             </div>
//           </div>

//           {/* Geocode status bar — only shown while map is active */}
//           {showMap && (
//             <div className="flex items-center min-h-[28px]">
//               {geocoding && (
//                 <span className="flex items-center gap-1.5 text-xs text-[#0D9488] font-semibold">
//                   <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                   Locating on map…
//                 </span>
//               )}
//               {!geocoding && geocodeLabel && (
//                 <span className="flex items-center gap-1.5 text-xs text-[#0D9488] font-semibold bg-[#0D9488]/5 px-3 py-1 rounded-full">
//                   <MapPin className="w-3 h-3 shrink-0" />
//                   {geocodeLabel}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Map — only rendered when both ward and street are filled */}
//           {showMap && (
//             <PropertyMap
//               lat={formData.lat}
//               lng={formData.lng}
//               onLocationChange={handleLocationChange}
//             />
//           )}
//         </div>

//         {/* ── Submission ── */}
//         <div className="flex items-center gap-4 pt-4">
//           <button
//             type="button"
//             className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all active:scale-95 border border-gray-100"
//             onClick={() => window.history.back()}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex-[2] bg-[#0D9488] text-white px-6 py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0D9488]/20 active:scale-95 group"
//           >
//             <span>Post and Approve Property</span>
//             <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//           </button>
//         </div>
//       </div>

//       {activeToast && (
//         <Toast
//           message={activeToast.message}
//           type={activeToast.type}
//           onClose={() => setActiveToast(null)}
//         />
//       )}
//     </form>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { UploadCloud, ChevronRight, MapPin, Loader2 } from "lucide-react";
import Image from "next/image";
import { Loader } from "@/app/(user)/user/dashboard/components/Loader";
import Toast from "@/app/components/ui/Toast";
import { createProperty } from "@/services/properties.service";

// ── iframe-based map, no Leaflet ──────────────────────────────────────────────
const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false });

const ITAHARI_WARDS = Array.from({ length: 19 }, (_, i) => `Itahari-${i + 1}`);
const ITAHARI_CENTER = { lat: 26.6666, lng: 87.2736 };

interface Props {
  onSuccess: () => void;
  /** Admin mode: auto-approves the listing */
  isAdmin?: boolean;
}

export default function AddPropertyPage({ onSuccess, isAdmin = false }: Props) {
  const [loading, setLoading] = useState(false);
  const [activeToast, setActiveToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [rentError, setRentError] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeLabel, setGeocodeLabel] = useState<string | null>(null);
  const geocodeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    rent: "",
    bedrooms: "1",
    kitchens: "1",
    category: "1 BHK",
    ward: "Itahari-1",
    street: "",
    floor: "Ground Floor",
    tags: "",
    livingRoom: "Available",
    RentDesign: "commercial",
    description: "",
    lat: ITAHARI_CENTER.lat,
    lng: ITAHARI_CENTER.lng,
  });

  const showMap = formData.ward.trim() !== "" && formData.street.trim() !== "";

  // ── Geocode on ward/street change ─────────────────────────────────────────
  useEffect(() => {
    if (!formData.street.trim()) { setGeocodeLabel(null); return; }
    if (geocodeTimer.current) clearTimeout(geocodeTimer.current);

    geocodeTimer.current = setTimeout(async () => {
      const q = `${formData.street}, ${formData.ward}, Itahari, Nepal`;
      setGeocoding(true);
      setGeocodeLabel(null);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
          { headers: { "Accept-Language": "en", "User-Agent": "SSRental/1.0" } }
        );
        const data = await res.json();
        if (data?.length > 0) {
          setFormData(prev => ({ ...prev, lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }));
          setGeocodeLabel(`${formData.ward}, ${formData.street} — Itahari, Nepal`);
        } else {
          setGeocodeLabel(`Showing general area for ${formData.ward}`);
        }
      } catch { setGeocodeLabel(null); }
      finally { setGeocoding(false); }
    }, 800);

    return () => { if (geocodeTimer.current) clearTimeout(geocodeTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.ward, formData.street]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { setActiveToast({ message: "Property Title is required", type: "error" }); return; }
    if (!formData.rent.trim()) { setActiveToast({ message: "Monthly Rent is required", type: "error" }); return; }
    const rentVal = parseInt(formData.rent);
    if (isNaN(rentVal) || rentVal < 500) { setRentError("Minimum rent is Rs. 500"); return; }
    if (rentVal > 100000) { setRentError("Maximum rent is Rs. 1,00,000"); return; }
    if (!formData.ward.trim()) { setActiveToast({ message: "Ward / Area is required", type: "error" }); return; }
    if (!formData.street.trim()) { setActiveToast({ message: "Street / Landmark is required", type: "error" }); return; }
    if (!formData.description.trim()) { setActiveToast({ message: "Description is required", type: "error" }); return; }

    setLoading(true);
    setRentError("");
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("rent", formData.rent);
      data.append("bedrooms", formData.bedrooms);
      data.append("kitchens", formData.kitchens);
      data.append("category", formData.category);
      data.append("location", formData.ward);
      data.append("detailed_address", formData.street);
      data.append("floor", formData.floor);
      data.append("tags", formData.tags);
      data.append("livingRoom", formData.livingRoom);
      data.append("RentDesign", formData.RentDesign);
      data.append("description", formData.description);
      data.append("lat", formData.lat.toString());
      data.append("lng", formData.lng.toString());
      data.append("is_active", isAdmin ? "true" : "false");
      images.forEach(img => data.append("images", img));

      await createProperty(data);
      setActiveToast({ message: isAdmin ? "Property posted & approved!" : "Property submitted for review!", type: "success" });
      setTimeout(onSuccess, 1500);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      setActiveToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(f => f.size <= 5 * 1024 * 1024);
    setImages(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader /></div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto pb-12">

      {/* ── Compact Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white px-8 py-5 shadow-xl border border-gray-800">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#0D9488] rounded-full filter blur-[90px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {isAdmin ? "Add New Property 🏢" : "Post Your Property 🏠"}
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              {isAdmin
                ? "Properties you add are automatically approved and live."
                : "Fill in the details below. All listings are reviewed before going live."}
            </p>
          </div>
          <span className="shrink-0 text-[10px] bg-[#0D9488]/20 text-[#0D9488] px-3 py-1 rounded-full font-bold tracking-wide border border-[#0D9488]/20">
            ITAHARI, NEPAL
          </span>
        </div>
      </div>

      {/* ── Form Body ─────────────────────────────────────────────────────── */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100/80 space-y-8">

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Property Title</label>
            <input
              type="text"
              placeholder="e.g. Modern Studio in Itahari"
              className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Monthly Rent (Rs.)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Rs.</span>
              <input
                type="number" placeholder="5000"
                className={`w-full pl-12 pr-5 py-3.5 bg-gray-50/50 border rounded-2xl focus:outline-none focus:ring-2 transition-all ${rentError ? "border-red-400 focus:ring-red-50" : "border-gray-100 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"}`}
                value={formData.rent}
                onChange={e => { setFormData({ ...formData, rent: e.target.value }); if (rentError) setRentError(""); }}
              />
            </div>
            {rentError && <p className="text-xs font-bold text-red-500 ml-2 mt-1">{rentError}</p>}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {([
            { label: "Bedrooms", key: "bedrooms", options: [1,2,3,4,5,6].map(n => String(n)) },
            { label: "Kitchens", key: "kitchens", options: [1,2,3,4,5].map(n => String(n)) },
            { label: "Category", key: "category", options: ["Single Room","2/3 Rooms Flat","1 BHK","2 BHK","3 BHK","Office Space","Business Shutter"] },
            { label: "Floor", key: "floor", options: ["Ground Floor","1st Floor","2nd Floor","3rd Floor","4th Floor","5th Floor"] },
            { label: "Living Room", key: "livingRoom", options: ["Available","Unavailable"] },
            { label: "Rent Design", key: "RentDesign", options: ["commercial","residential","business-shutter"] },
          ] as const).map(({ label, key, options }) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
              <select
                className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all appearance-none cursor-pointer"
                value={formData[key as keyof typeof formData] as string}
                onChange={e => setFormData({ ...formData, [key]: e.target.value })}
              >
                {(options as readonly string[]).map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Tags</label>
            <input
              type="text" placeholder="e.g. Furnished, Parking"
              className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
          <textarea
            rows={4} placeholder="Tell us more about your property..."
            className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all resize-none"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Images */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 ml-1">Property Images</label>
          <label className="border-2 border-dashed border-gray-100 bg-gray-50/30 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center group hover:border-[#0D9488]/30 transition-all cursor-pointer">
            <input type="file" accept="image/png,image/jpeg,image/webp" multiple className="hidden" onChange={handleImageChange} />
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-400 mb-3 shadow-sm group-hover:scale-110 group-hover:text-[#0D9488] transition-all">
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="font-bold text-gray-700 text-sm">Click or drag to upload images</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP · Max 5MB each</p>
          </label>
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100">
                  <Image src={src} alt={`preview-${i}`} fill className="object-cover" unoptimized />
                  <button
                    type="button" onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-full text-gray-500 hover:text-[#0D9488] flex items-center justify-center text-xs font-bold shadow opacity-0 group-hover:opacity-100 transition-all"
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700 ml-1">Property Location</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Ward */}
            <div className="relative bg-gray-50/60 border border-gray-100 rounded-2xl px-5 pt-3 pb-3 focus-within:border-[#0D9488] focus-within:ring-2 focus-within:ring-[#0D9488]/10 transition-all">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Ward / Area
              </label>
              <select
                className="w-full bg-transparent border-none focus:outline-none text-sm font-semibold text-gray-800 appearance-none cursor-pointer pr-6"
                value={formData.ward}
                onChange={e => setFormData({ ...formData, ward: e.target.value })}
              >
                {ITAHARI_WARDS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
            </div>

            {/* Street */}
            <div className="relative bg-gray-50/60 border border-gray-100 rounded-2xl px-5 pt-3 pb-3 focus-within:border-[#0D9488] focus-within:ring-2 focus-within:ring-[#0D9488]/10 transition-all">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                🏪 Street / Landmark
              </label>
              <input
                type="text" placeholder="e.g. Sangit Chowk"
                className="w-full bg-transparent border-none focus:outline-none text-sm font-semibold text-gray-800 placeholder:text-gray-300"
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
              />
            </div>
          </div>

          {/* Geocode status */}
          {showMap && (
            <div className="flex items-center min-h-[24px]">
              {geocoding && (
                <span className="flex items-center gap-1.5 text-xs text-[#0D9488] font-semibold">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Locating on map…
                </span>
              )}
              {!geocoding && geocodeLabel && (
                <span className="flex items-center gap-1.5 text-xs text-[#0D9488] font-semibold bg-[#0D9488]/5 px-3 py-1 rounded-full">
                  <MapPin className="w-3 h-3 shrink-0" /> {geocodeLabel}
                </span>
              )}
            </div>
          )}

          {/* Map iframe */}
          {showMap && !geocoding && (
            <PropertyMap lat={formData.lat} lng={formData.lng} />
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all active:scale-95 border border-gray-100"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-[2] bg-[#0D9488] text-white px-6 py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0D9488]/20 active:scale-95 group"
          >
            <span>{isAdmin ? "Post and Approve Property" : "Submit for Review"}</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {activeToast && (
        <Toast message={activeToast.message} type={activeToast.type} onClose={() => setActiveToast(null)} />
      )}
    </form>
  );
}
