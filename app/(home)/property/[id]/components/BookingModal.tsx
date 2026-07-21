// "use client";

// import { useState } from "react";
// import { X, CalendarCheck, Loader2 } from "lucide-react";
// // import { createBooking } from "../../../../../services/";

// interface BookingModalProps {
//   propertyId: string;
//   propertyName: string;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export default function BookingModal({ propertyId, propertyName, onClose, onSuccess }: BookingModalProps) {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       await createBooking(propertyId, message);
//       onSuccess();
//     } catch (err: any) {
//       // console.error("Booking error:", err);
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
//       <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
//         <button 
//           onClick={onClose}
//           className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <div className="flex flex-col items-center text-center">
//           <div className="w-16 h-16 bg-[#F0FDFA] text-[#0D9488] rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-[#0D9488]/10">
//             <CalendarCheck className="w-8 h-8" />
//           </div>
          
//           <h2 className="text-2xl font-bold text-[#222222] mb-2">Book This Property</h2>
//           <p className="text-gray-500 mb-8 px-4">
//             You are requesting to book <span className="font-semibold text-gray-700">{propertyName}</span>.
//           </p>

//           <form onSubmit={handleSubmit} className="w-full space-y-6">
//             <div className="space-y-2 text-left">
//               <label className="text-sm font-bold text-gray-700 ml-1">Send a Message to Owner</label>
//               <textarea
//                 required
//                 rows={4}
//                 placeholder="e.g. Hi, I'm interested in this property. When can I visit?"
//                 className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all resize-none text-gray-700"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//             </div>

//             {error && (
//               <p className="text-sm font-medium text-red-500 bg-red-50 py-3 px-4 rounded-xl border border-red-100 animate-in shake text-center">
//                 {error}
//               </p>
//             )}

//             <div className="flex gap-4">
//               <button
//                 type="button"
//                 className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-gray-100"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-[2] bg-[#0D9488] text-white px-6 py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0D9488]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
//               >
//                 {loading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <>
//                     <span>Confirm</span>
//                     <CalendarCheck className="w-5 h-5 transition-transform group-hover:scale-110" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
