import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1A2E] text-white">
      {/* City illustration */}
      {/* <div className="w-full overflow-hidden leading-none">
        <Image
          src="/images/footer-city.svg"
          alt="City skyline"
          width={1440}
          height={180}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div> */}

      {/* Footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/images/logo.svg" alt="RoomHunt" width={100} height={34} className="h-9 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted platform to discover rooms, flats and office spaces. Fast, verified, and easy.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {[
                { 
                  name: "Facebook", 
                  href: "https://www.facebook.com/profile.php?id=61587208060732",
                  path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                },
                { 
                  name: "Tiktok", 
                  href: "https://www.tiktok.com/@s.srental",
                  path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#0D9488] hover:bg-[#0D9488] transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-gray-400 text-sm hover:text-[#0D9488] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 text-sm hover:text-[#0D9488] transition-colors">Browse Properties</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 text-sm hover:text-[#0D9488] transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/user/dashboard/properties/add" className="text-gray-400 text-sm hover:text-[#0D9488] transition-colors">Post a Listing</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 text-sm hover:text-[#0D9488] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 text-sm hover:text-[#0D9488] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Room types */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">Room Types</h4>
            <ul className="space-y-2.5">
              {[
                { name: "Single Room", link: "/search" },
                { name: "2/3 Rooms Flat", link: "/search" },
                { name: "1 BHK", link: "/search" },
                { name: "2 BHK", link: "/search" },
                { name: "3 BHK", link: "/search" },
                { name: "Office Space", link: "/search" },
                { name: "Business Shutter", link: "/search" }
              ].map((t) => (
                <li key={t.name}>
                  <Link href={t.link} className="text-gray-400 text-sm hover:text-[#0D9488] transition-colors">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
                +977 974-3847902
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                roomhunt.np@gmail.com  
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Itahari
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} RoomHunt. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-gray-500 text-xs hover:text-[#0D9488] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-500 text-xs hover:text-[#0D9488] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
