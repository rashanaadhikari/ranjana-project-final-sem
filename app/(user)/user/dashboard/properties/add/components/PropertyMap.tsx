// "use client";

// import { useEffect, useState, useRef } from "react";
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { MapPin, ChevronDown } from "lucide-react";

// // Fix Leaflet marker icon issue in Next.js
// const icon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const ITAHARI_WARDS = [
//   "Itahari-1", "Itahari-2", "Itahari-3", "Itahari-4", "Itahari-5",
//   "Itahari-6", "Itahari-7", "Itahari-8", "Itahari-9", "Itahari-10",
//   "Itahari-11", "Itahari-12", "Itahari-13",
// ];

// function MapUpdater({ center }: { center: [number, number] }) {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center, 15);
//   }, [center, map]);
//   return null;
// }

// function LocationMarker({ position, setPosition }: { position: [number, number]; setPosition: (pos: [number, number]) => void }) {
//   useMapEvents({
//     click(e) {
//       setPosition([e.latlng.lat, e.latlng.lng]);
//     },
//   });
//   return <Marker position={position} icon={icon} />;
// }

// export default function PropertyMap({
//   lat,
//   lng,
//   onLocationChange,
// }: {
//   lat: number;
//   lng: number;
//   onLocationChange: (lat: number, lng: number) => void;
// }) {
//   const position: [number, number] = [lat, lng];
//   const [ward, setWard] = useState("");
//   const [street, setStreet] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Auto-geocode whenever ward or street changes (debounced)
//   useEffect(() => {
//     if (!ward) return;

//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     debounceRef.current = setTimeout(async () => {
//       const query = street
//         ? `${ward} ${street}, Itahari, Sunsari, Nepal`
//         : `${ward}, Itahari, Sunsari, Nepal`;
//       setIsSearching(true);
//       try {
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=np&limit=1`
//         );
//         const data = await res.json();
//         if (data && data.length > 0) {
//           onLocationChange(parseFloat(data[0].lat), parseFloat(data[0].lon));
//         } else {
//           // Fallback: search just "Itahari" if specific query yields nothing
//           const fallback = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent("Itahari, Sunsari, Nepal")}&countrycodes=np&limit=1`
//           );
//           const fData = await fallback.json();
//           if (fData && fData.length > 0) {
//             onLocationChange(parseFloat(fData[0].lat), parseFloat(fData[0].lon));
//           }
//         }
//       } catch (err) {
//         console.error("Geocoding failed:", err);
//       } finally {
//         setIsSearching(false);
//       }
//     }, 600);

//     return () => {
//       if (debounceRef.current) clearTimeout(debounceRef.current);
//     };
//   }, [ward, street, onLocationChange]);

//   return (
//     <div className="space-y-3">
//       {/* Location Selector Row */}
//       <div className="grid grid-cols-2 gap-3">
//         {/* Box 1: Ward Dropdown */}
//         <div className="relative">
//           <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">
//             📍 Ward / Area
//           </label>
//           <div className="relative">
//             <select
//               value={ward}
//               onChange={(e) => setWard(e.target.value)}
//               className="w-full px-4 py-2.5 pr-9 border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all text-sm font-semibold text-gray-700 appearance-none cursor-pointer"
//             >
//               <option value="">Select Ward...</option>
//               {ITAHARI_WARDS.map((w) => (
//                 <option key={w} value={w}>{w}</option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//           </div>
//         </div>

//         {/* Box 2: Street / Landmark */}
//         <div className="relative">
//           <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">
//             🏘️ Street / Landmark
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="e.g. Hongkong Market, Halgada Chowk..."
//               value={street}
//               onChange={(e) => setStreet(e.target.value)}
//               className="w-full px-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] transition-all text-sm"
//             />
//             {isSearching && (
//               <span className="absolute right-3 top-1/2 -translate-y-1/2">
//                 <span className="block w-3.5 h-3.5 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin" />
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Info pill */}
//       {ward && (
//         <div className="flex items-center gap-1.5 text-[11px] text-[#0D9488] font-semibold bg-[#0D9488]/5 border border-[#0D9488]/10 px-3 py-1.5 rounded-lg w-fit">
//           <MapPin className="w-3 h-3" />
//           <span>Locating: {ward}{street ? `, ${street}` : ""} — Itahari, Nepal</span>
//         </div>
//       )}

//       {/* Map */}
//       <div className="h-64 w-full rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
//         <MapContainer
//           center={position}
//           zoom={15}
//           style={{ height: "100%", width: "100%" }}
//           className="z-0"
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <MapUpdater center={position} />
//           <LocationMarker
//             position={position}
//             setPosition={(pos) => onLocationChange(pos[0], pos[1])}
//           />
//         </MapContainer>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  lat: number;
  lng: number;
  onLocationChange?: (lat: number, lng: number) => void;
}

// Restrict map to Itahari region roughly (+/- ~10 km from center)
const ITAHARI_BOUNDS: L.LatLngBoundsLiteral = [
  [26.58, 87.20], // South-West (approx)
  [26.75, 87.35]  // North-East (approx)
];

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component to handle map clicks
function LocationMarker({ onLocationChange }: any) {
  useMapEvents({
    click(e) {
      onLocationChange?.(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

// Component to handle programmatic map moves from parent
function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setView([lat, lng], map.getZoom(), {
        animate: false
      });
    }
  }, [lat, lng, map]);
  return null;
}

export default function PropertyMap({
  lat,
  lng,
  onLocationChange,
}: PropertyMapProps) {
  return (
    <div className="rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-sm">
      <MapContainer
        center={[lat, lng]}
        zoom={16}
        minZoom={13}
        maxBounds={ITAHARI_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        style={{ height: "300px", width: "100%" }}
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker */}
        <Marker
          position={[lat, lng]}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              onLocationChange?.(position.lat, position.lng);
            },
          }}
        />

        {/* Click to change location */}
        <LocationMarker onLocationChange={onLocationChange} />
        
        {/* Keeps the map visually synced with lat/lng props */}
        <MapUpdater lat={lat} lng={lng} />
      </MapContainer>

      <div className="px-4 py-2.5 bg-gray-50/80 flex items-center justify-between">
        <p className="text-[11px] text-gray-400">
          📍 Click or drag marker to adjust exact location
        </p>
        <a
          href={`https://www.google.com/maps?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#0D9488] font-semibold hover:underline"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}
