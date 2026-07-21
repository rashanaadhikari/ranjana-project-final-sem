"use client";

import { useEffect, useState } from "react";
import { getPlatformAdmin } from "@/services/admin.service";
import { Phone, User, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AdminContactSection() {
  const [admin, setAdmin] = useState<{
    name: string;
    phone_number: string;
    avatar_url?: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const data = await getPlatformAdmin();
        setAdmin(data as unknown as { name: string; phone_number: string; avatar_url?: string; role: string });
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAdmin();
  }, []);

  if (loading || !admin) return null;

  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-gray-400 to-gray-400 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden group">
          {/* Animated Background Element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand rounded-full filter blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-700"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left space-y-4">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-black uppercase tracking-widest mb-2">
                <ShieldCheck className="w-4 h-4" />
                Platform Owner
              </div> */}
              <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                Connect with our <span className="text-brand">Official Owner</span>
              </h2>
              <p className="text-white text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
                Contact <span className="text-white font-bold">{admin.name}</span> for urgent inquiries or site support, you can reach out directly.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 sm:p-10 flex flex-col items-center gap-6 shadow-2xl hover:bg-white/10 transition-colors duration-500 min-w-[300px]">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-brand p-1 bg-gray-800">
                {admin.avatar_url ? (
                  <img src={admin.avatar_url} alt={admin.name} className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-black">{admin.name}</h3>
                <p className="text-brand text-xs font-black uppercase tracking-widest">{admin.role === 'admin' ? 'Chief Administrator' : 'Platform Owner'}</p>
              </div>

              <a 
                href={`tel:${admin.phone_number}`}
                className="w-full bg-brand text-white px-8 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 active:scale-95 group/btn"
              >
                <Phone className="w-5 h-5 group-hover/btn:animate-bounce" />
                {admin.phone_number || "Contact Admin"}
              </a>
              
              {/* <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-60">Verified Admin Contact</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
