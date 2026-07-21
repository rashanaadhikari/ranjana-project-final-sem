import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12 lg:p-16 border border-gray-100">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand transition-colors mb-10">
            ← Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-heading mb-6 tracking-tight">Terms of Service</h1>
          <p className="text-sm uppercase tracking-widest text-brand font-bold mb-10">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none text-[#4A4A4A] space-y-8 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-brand mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using RoomHunt, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-brand mb-4">2. Description of Service</h2>
              <p>RoomHunt provides a platform for room, flat, and office space listings. We act as an intermediary between property owners (Landlords) and potential renters (Tenants). We do not own, manage, or control the properties listed on our site.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-brand mb-4">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Account Accuracy:</strong> You must provide accurate and complete information during registration and when listing properties.</li>
                <li><strong>Lawful Use:</strong> You agree to use the service only for lawful purposes and in accordance with local regulations.</li>
                <li><strong>Integrity:</strong> Landlords are responsible for the accuracy of their listings, and Tenants are responsible for verifying property details before making commitments.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-brand mb-4">4. Property Listings</h2>
              <p>We reserve the right to remove any listing that violates our policies, contains fraudulent information, or is otherwise deemed inappropriate. Listings must not include prohibited content or infringe on third-party rights.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-brand mb-4">5. Limitation of Liability</h2>
              <p>RoomHunt shall not be liable for any disputes, damages, or losses arising from interactions between users. We do not guarantee the condition, safety, or legality of properties listed on the platform.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-brand mb-4">6. Changes to Terms</h2>
              <p>We may update our Terms of Service from time to time. Your continued use of the platform after such changes constitutes acceptance of the new terms.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-brand mb-4">Contact Us</h2>
              <p>If you have any questions regarding these terms, please reach out to our team at <a href="mailto:roomhunt.np@gmail.com" className="text-brand hover:underline font-semibold">roomhunt.np@gmail.com</a>.</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
