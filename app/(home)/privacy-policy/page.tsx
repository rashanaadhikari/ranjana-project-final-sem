import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12 lg:p-16 border border-gray-100">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-[#0D9488] transition-colors mb-10">
            ← Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#222222] mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-sm uppercase tracking-widest text-[#0D9488] font-bold mb-10">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none text-[#4A4A4A] space-y-8 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[#0D9488] mb-4">1. Introduction</h2>
              <p>Welcome to RoomHunt. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-[#0D9488] mb-4">2. The Data We Collect About You</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-[#0D9488] mb-4">3. How We Use Your Personal Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you, to provide platform services, and communicate with landlords or tenants.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-[#0D9488] mb-4">4. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-[#0D9488] mb-4">5. Your Legal Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D9488] mb-4">Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:roomhunt.np@gmail.com" className="text-[#0D9488] hover:underline font-semibold">roomhunt.np@gmail.com</a>.</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
