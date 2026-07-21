import { Plus, MapPin, Edit3, Trash2, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data to simulate Supabase schema response
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Modern Single Room at Itahari",
    location: "Itahari, Nepal",
    price: "Rs. 5,000",
    status: "Active",
    thumbnail: "/api/placeholder/400/300",
  },
  {
    id: 2,
    title: "2BHK Peaceful Apartment",
    location: "Dharan, Nepal",
    price: "Rs. 15,000",
    status: "Pending",
    thumbnail: "/api/placeholder/400/300",
  },
  {
    id: 3,
    title: "Shared Office Space",
    location: "Biratnagar, Nepal",
    price: "Rs. 8,000",
    status: "Rented",
    thumbnail: "/api/placeholder/400/300",
  }
];

export default function MyPropertiesPage() {
  const properties = MOCK_PROPERTIES;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#222222] tracking-tight">My Properties</h1>
          <p className="text-[#6A6A6A] mt-1 text-lg">Manage all the listings you have posted on RoomHunt.</p>
        </div>
        
        <Link 
          href="/post-listing" 
          className="flex items-center gap-2 bg-[#0D9488] hover:bg-[#0D9488] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 shrink-0"
        >
          <Plus className="w-5 h-5" /> 
          <span>Add New Property</span>
        </Link>
      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-gray-100 group flex flex-col">
              
              {/* Image Container with Badge */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-5 bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 transition-opacity duration-300 opacity-60 group-hover:opacity-80"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    prop.status === "Active" ? "bg-green-500 text-white shadow-sm" : 
                    prop.status === "Pending" ? "bg-orange-500 text-white shadow-sm" : 
                    "bg-gray-500 text-white shadow-sm"
                  }`}>
                    {prop.status}
                  </span>
                </div>

                {/* Example of actual Image (Using div for placeholder) */}
                <div className="w-full h-full bg-gray-200 transform group-hover:scale-105 transition-transform duration-700 ease-in-out">
                  {/* <Image src={prop.thumbnail} alt={prop.title} fill className="object-cover" /> */}
                </div>
              </div>

              {/* Content Details */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-2">
                   <h3 className="font-bold text-[#222222] text-lg leading-tight line-clamp-2" title={prop.title}>
                     {prop.title}
                   </h3>
                   <span className="font-extrabold text-[#0D9488] whitespace-nowrap">{prop.price}</span>
                </div>
                
                <p className="text-[#6A6A6A] text-sm flex items-center mb-6">
                  <MapPin className="w-4 h-4 mr-1 opacity-70" /> {prop.location}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex justify-center items-center gap-2 bg-gray-50 hover:bg-gray-100 text-[#222222] font-semibold py-2.5 rounded-xl transition-colors">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                  <button className="flex-1 flex justify-center items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-xl transition-colors">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Elevated Empty State */
        <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[400px]">
           <div className="w-24 h-24 bg-[#F0FDFA] text-[#0D9488] rounded-[2rem] flex items-center justify-center mb-6 shadow-sm rotate-3">
             <Home className="w-12 h-12 -rotate-3" />
           </div>
           <h2 className="text-2xl font-bold text-[#222222] mb-3">No properties listed yet</h2>
           <p className="text-[#6A6A6A] max-w-sm mb-8 text-lg">You haven't added any properties to your portfolio. Start earning by creating your first listing today!</p>
           <Link 
             href="/post-listing" 
             className="bg-[#0D9488] hover:bg-[#0D9488] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-md text-lg"
           >
             Create a Listing
           </Link>
        </div>
      )}
    </div>
  );
}
