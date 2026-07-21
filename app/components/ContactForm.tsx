"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle, Home, X } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { sendMessage } from "@/services/messages.service";
import Toast from "./ui/Toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    phoneNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const metadata = session.user.user_metadata;
        
        // Try to pre-fill from metadata or database
        const { data: userData } = await supabase
          .from("users")
          .select("name, email, phone_number")
          .eq("id", session.user.id)
          .single();

        setFormData(prev => ({
          ...prev,
          fullName: userData?.name || metadata?.full_name || metadata?.name || "",
          email: userData?.email || session.user.email || "",
          phoneNumber: userData?.phone_number || ""
        }));
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      setToast({ message: "Please fill in all required fields", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await sendMessage({
        ...formData,
        userId: userId || undefined
      });
      setIsSubmitted(true);
      setToast({ message: "Message sent successfully!", type: "success" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to send message";
      setToast({ message, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500 relative overflow-hidden h-[500px]">
        <Link href="/" className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-[#0D9488] hover:text-white rounded-full transition-all text-gray-400 group">
          <X className="w-5 h-5" />
        </Link>
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-[#222222] mb-4">Message Sent!</h2>
        <p className="text-[#6A6A6A] font-medium max-w-sm mb-10">
          Thank you for reaching out. Our team has received your message and will get back to you within 24 hours.
        </p>
        <Link 
          href="/" 
          className="bg-[#222222] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#333333] transition-all"
        >
          <Home className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#222222] mb-2">Send us a message</h2>
        <p className="text-[#6A6A6A]">Fill out the form below and we normally reply within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#222222] uppercase tracking-wide">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              required
              className="w-full bg-gray-50 border border-gray-200 text-[#222222] px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#222222] uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
              className="w-full bg-gray-50 border border-gray-200 text-[#222222] px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#222222] uppercase tracking-wide">Subject</label>
            <input 
              type="text" 
              placeholder="How can we help?" 
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              required
              className="w-full bg-gray-50 border border-gray-200 text-[#222222] px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#222222] uppercase tracking-wide">Phone Number (Optional)</label>
            <input 
              type="text" 
              placeholder="98xxxxxxx" 
              value={formData.phoneNumber}
              onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 text-[#222222] px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#222222] uppercase tracking-wide">Message</label>
          <textarea 
            rows={5}
            placeholder="Tell us more about your inquiry..." 
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            required
            className="w-full bg-gray-50 border border-gray-200 text-[#222222] px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all resize-y"
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0D9488] hover:bg-[#0D9488] text-white font-bold text-lg px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(227,28,91,0.2)] hover:shadow-[0_0_30px_rgba(227,28,91,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
