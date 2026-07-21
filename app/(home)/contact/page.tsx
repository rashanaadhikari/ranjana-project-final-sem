import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/app/components/ContactForm";

export default async function ContactPage() {
  // Try to fetch admin phone dynamically, fallback to default
  const supabase = await createClient();
  const { data: adminUser } = await supabase
    .from("users")
    .select("phone_number, email")
    .eq("role", "admin")
    .limit(1)
    .single();

  const phoneNumber = adminUser?.phone_number || "+977 980-000-0000";
  const email = "roomhunt.np@gmail.com"; // the official support email
  const location = "Itahari";

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#0D9488] font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse"></span>
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#222222] tracking-tight mb-6 leading-tight">
            We&apos;re here to help you.
          </h1>
          <p className="text-lg text-[#6A6A6A] leading-relaxed">
            Have questions about finding a property, listing yours, or just want to say hello? 
            Our team is always ready to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Phone Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#F0FDFA] rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                <Phone className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-2">Call Us</h3>
              <p className="text-[#6A6A6A] text-sm mb-4">Direct line to our support team.</p>
              <a href={`tel:${phoneNumber}`} className="text-lg font-bold text-[#0D9488] hover:text-[#0D9488] transition-colors flex items-center gap-2">
                {phoneNumber} <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Available Now</span>
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-2">Email Us</h3>
              <p className="text-[#6A6A6A] text-sm mb-4">Drop us a line anytime.</p>
              <a href={`mailto:${email}`} className="text-lg font-bold text-blue-500 hover:text-blue-600 transition-colors">
                {email}
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-2">Visit Us</h3>
              <p className="text-[#6A6A6A] text-sm mb-4">Our headquarters location.</p>
              <p className="text-lg font-bold text-orange-500">
                {location}
              </p>
            </div>

          </div>

          {/* Contact Form Column */}
          <ContactForm />

        </div>

      </div>

      <Footer />
    </main>
  );
}
