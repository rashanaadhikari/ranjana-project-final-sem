'use client'

import { useState, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CategoryFilter from "./components/CategoryFilter";
import PropertyGrid from "./components/PropertyGrid";
import FeatureHighlights from "./components/FeatureHighlights";
import InfoSection from "./components/InfoSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import Link from "next/link";
import AdminContactSection from "./components/AdminContactSection";
import LatestBlogs from "./components/LatestBlogs";
import { useSearchParams } from "next/navigation";
import Toast from "./components/ui/Toast";

function NotificationManager() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "blocked") {
      const reason = searchParams.get("reason");
      setMessage(reason ? `Account Blocked: ${reason}` : "Your account has been blocked.");
    } else if (error === "unauthorized") {
      setMessage("You have no authority to access the admin dashboard.");
    } else if (error === "unauthenticated_user") {
      setMessage("Only authenticated user can access dashboard");
    }
  }, [searchParams]);

  if (!message) return null;

  return (
    <Toast 
      message={message} 
      type="error" 
      duration={10000} 
      onClose={() => setMessage(null)} 
    />
  );
}

export default function Home() {
  // Lifted state: tracks which category chip the user clicked.
  // "for-you" means no filter (show all). Passed into both CategoryFilter
  // (so the right chip stays highlighted) and PropertyGrid (so it re-fetches).
  const [activeCategory, setActiveCategory] = useState("for-you");

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={null}>
        <NotificationManager />
      </Suspense>
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero */}
      <HeroSection />

      {/* 3. Category Filter — activeCategory flows down; clicks bubble up via onCategoryChange */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 4. Property Grid — re-fetches real data whenever activeCategory changes */}
      <PropertyGrid activeCategory={activeCategory} />

      {/* 5. Feature Highlights */}
      <FeatureHighlights />  

      {/* 6a. Looking for a Place to Stay */}
      <InfoSection
        image="/images/section-stay.png"
        imageAlt="Looking for a place to stay"
        heading="Looking for a Place to Stay?"
        body="Whether you are a student, a working professional, or a family looking for your next home —  RoomHunt connects you to the best rooms, flats, and office spaces in your area. Start exploring now, find your match, and move in with ease."
        buttons={[
          { label: "Get Started", href: "/search", variant: "primary" },
          { label: "Learn more about us →", href: "/about", variant: "outline" },
        ]}
        imageOnLeft={false}
        bgColor="bg-[#F0FDFA]"
      />

      {/* 6b. Search what you want */}
      <InfoSection
        image="/images/section-search.png"
        imageAlt="Search what you want, find what you need"
        heading="Search what you want, find what you need."
        body="Browse content over 500+ verified listings. Filter by location, budget, and room type to instantly get matched properties that suit your lifestyle and pocket. No wasted time, no guesswork."
        buttons={[
          { label: "Explore Rooms", href: "/search", variant: "primary" },
          // { label: "Check all options", href: "/search?all=true", variant: "outline" },
        ]}
        imageOnLeft={true}
        bgColor="bg-white"
      />

      {/* 6c. Connect with owners */}
      <InfoSection
        image="/images/section-connect.png"
        imageAlt="Connect with property owners"
        heading="Find the room you want? Connect with owners."
        body="In as little as one tap, RoomHunt presents owners a direct contact with questions right from the platform. No middlemen, no hassle — just a clean and simple conversation to close the deal."
        buttons={[
          { label: "Get in touch today", href: "/auth/register", variant: "primary" },
          { label: "Create account", href: "/auth/register", variant: "outline" },
        ]}
        imageOnLeft={false}
        bgColor="bg-[#F0FDFA]"
      />

      {/* 6d. Move in with confidence */}
      <InfoSection
        image="/images/section-move-in.png"
        imageAlt="Move in with confidence"
        heading="Move in with Confidence."
        body="Choose from a range of fairly priced rooms and apartments that have been verified for quality. Sign agreements clearly and move in with zero worries."
        buttons={[
          { label: "Get Started", href: "/search", variant: "primary" },
          { label: "Create account", href: "/auth/register", variant: "outline" },
        ]}
        imageOnLeft={true}
        bgColor="bg-white"
      />

      {/* 6.5. Admin Contact Section */}
      <AdminContactSection />

      {/* 6.7. Recent Blogs Section */}
      <LatestBlogs />

      {/* 7. Testimonials */}
      <TestimonialsSection />

      {/* 8. Privacy Policy Link */}
      <section className="bg-white py-16 md:py-20 lg:py-24 border-t border-gray-100 flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#222222]">
            Your Privacy Matters to Us
          </h2>
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            At RoomHunt, we prioritize the security and confidentiality of your personal information. Read our comprehensive privacy policy to learn how we protect you.
          </p>
          <Link
            href="/privacy-policy"
            className="inline-flex items-center justify-center px-8 lg:px-10 py-3 lg:py-4 text-sm lg:text-base font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Read Privacy Policy
          </Link>
        </div>
      </section>

      {/* 9. Footer */}
      <Footer />
    </main>
  );
}
