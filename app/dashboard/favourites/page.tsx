import { Heart, Search, MapPin, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock Data
const MOCK_FAVOURITES = [
  {
    id: 1,
    title: "Luxury Studio Apartment",
    location: "KTM Ring Road, Kathmandu",
    price: "Rs. 25,000",
    rating: "4.8",
    thumbnail: "/api/placeholder/400/300",
  },
  {
    id: 2,
    title: "Cozy Shared Room for Students",
    location: "Pulchowk, Lalitpur",
    price: "Rs. 6,500",
    rating: "4.5",
    thumbnail: "/api/placeholder/400/300",
  }
];

export default function MyFavouritesPage() {
  const favourites = MOCK_FAVOURITES;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-[#222222] tracking-tight flex items-center gap-3">
          Saved Favourites
          <span className="bg-[#F0FDFA] text-[#0D9488] text-sm py-1 px-3 rounded-full font-bold shadow-sm">
            {favourites.length}
          </span>
        </h1>
        <p className="text-[#6A6A6A] mt-2 text-lg">Keep track of the rooms and properties you love.</p>
      </div>

      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favourites.map((fav) => (
            <div key={fav.id} className="bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-gray-100 group flex flex-col relative overflow-hidden">
              
              {/* Floating Heart Button */}
              <button 
                className="absolute top-8 right-8 z-30 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none"
                aria-label="Remove from favourites"
              >
                <Heart className="w-5 h-5 text-[#0D9488] fill-current" />
              </button>

              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-5 bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="w-full h-full bg-gray-200 transform group-hover:scale-105 transition-transform duration-700 ease-in-out">
                  {/* <Image src={fav.thumbnail} alt={fav.title} fill className="object-cover" /> */}
                </div>
              </div>

              {/* Content Details */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-2">
                   <h3 className="font-bold text-[#222222] text-lg leading-tight line-clamp-2" title={fav.title}>
                     {fav.title}
                   </h3>
                   <span className="font-extrabold text-[#0D9488] whitespace-nowrap">{fav.price}</span>
                </div>
                
                <p className="text-[#6A6A6A] text-sm flex items-center mb-6">
                  <MapPin className="w-4 h-4 mr-1 opacity-70" /> {fav.location}
                </p>

                {/* Action Button */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link 
                    href={`/properties/${fav.id}`}
                    className="w-full flex justify-center items-center gap-2 bg-[#F0FDFA] hover:bg-[#0D9488] hover:text-white text-[#0D9488] font-bold py-3 rounded-xl transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" /> View Details
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Elevated Empty State */
        <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[500px]">
           <div className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
             <Search className="w-10 h-10" />
           </div>
           <h2 className="text-2xl font-bold text-[#222222] mb-3">Your wishlist is empty</h2>
           <p className="text-[#6A6A6A] max-w-sm mb-8 text-lg leading-relaxed">You haven't saved any properties yet. Click the heart icon on properties you like to save them here for later!</p>
           <Link 
             href="/properties" 
             className="bg-[#0D9488] hover:bg-[#0D9488] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md text-lg active:scale-95"
           >
             Start Exploring
           </Link>
        </div>
      )}
    </div>
  );
}
