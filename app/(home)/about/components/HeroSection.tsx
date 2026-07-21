import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <main className="w-full font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA] px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
            <div className="flex flex-col justify-center text-center md:text-left">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#0D9488]">
                Our Founder&apos;s Vision
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#222222] md:text-5xl lg:text-6xl">
                From Passion to Premium Rentals
              </h1>
              <p className="mb-8 text-base leading-8 text-[#6A6A6A] md:text-lg">
                Our founder started RoomHunt with a simple belief: everyone deserves access to
                quality, affordable housing. What began as a vision to transform the rental market
                has grown into a trusted platform connecting thousands of guests with their perfect homes.
                We&apos;re committed to making rental experiences effortless, transparent, and genuinely memorable.
              </p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Link href="/search">
                  <button className="cursor-pointer rounded-lg bg-[#0D9488] px-8 py-3 font-semibold text-white transition hover:bg-[#C61645]">
                    Explore Properties
                  </button>
                </Link>

                <Link href="/contact">
                  <button className="cursor-pointer rounded-lg border-2 border-[#222222]/20 px-8 py-3 font-semibold text-[#222222] transition hover:border-[#222222]/35 hover:bg-[#F0FDFA]">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#FFE4ED] to-[#F0FDFA] blur-2xl opacity-60" />
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&h=700&fit=crop"
                  alt="Modern apartment interior"
                  width={600}
                  height={700}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Qualification Section */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0D9488]">
              Leadership Profile
            </p>
            <h2 className="text-3xl font-bold text-[#222222] md:text-4xl">
              CEO Academic & Professional Background
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-[#6A6A6A]">
              The leadership behind RoomHunt combines strong academic training with deep on-ground
              experience in real estate operations, customer success, and technology-driven rental services.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#F8DCE8] bg-[#FFF6FA] p-6 md:p-8">
              <h3 className="mb-4 text-xl font-bold text-[#222222]">Academic Qualifications</h3>
              <ul className="space-y-4 text-[#6A6A6A]">
                <li className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-[#0D9488]">Master&apos;s in Business Administration (MBA)</p>
                  <p className="mt-1 text-sm text-[#6A6A6A]">Specialization in Real Estate Strategy & Operations</p>
                </li>
                <li className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-[#0D9488]">Bachelor&apos;s in Civil / Architectural Engineering</p>
                  <p className="mt-1 text-sm text-[#6A6A6A]">Foundation in housing design, planning, and property systems</p>
                </li>
                <li className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-[#0D9488]">Certified Property Management Professional</p>
                  <p className="mt-1 text-sm text-[#6A6A6A]">Industry certification focused on tenant lifecycle management</p>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#F8DCE8] bg-white p-6 md:p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-[#222222]">Professional Experience</h3>
              <ul className="space-y-4 text-[#6A6A6A]">
                <li className="rounded-xl bg-[#FFF6FA] p-4">
                  <p className="text-sm font-semibold text-[#0D9488]">10+ Years in Rental & Real Estate Management</p>
                  <p className="mt-1 text-sm text-[#6A6A6A]">Led end-to-end operations across residential and commercial listings</p>
                </li>
                <li className="rounded-xl bg-[#FFF6FA] p-4">
                  <p className="text-sm font-semibold text-[#0D9488]">Scaled 500+ Verified Property Network</p>
                  <p className="mt-1 text-sm text-[#6A6A6A]">Built owner partnerships and quality standards across multiple locations</p>
                </li>
                <li className="rounded-xl bg-[#FFF6FA] p-4">
                  <p className="text-sm font-semibold text-[#0D9488]">Customer Experience & Platform Innovation</p>
                  <p className="mt-1 text-sm text-[#6A6A6A]">Improved booking trust, support flow, and transparent communication</p>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl bg-[#F0FDFA] p-8 text-center">
              <div className="mb-4 text-4xl font-bold text-[#0D9488]">500+</div>
              <p className="text-sm font-medium text-[#6A6A6A]">Premium Properties</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-[#F0FDFA] p-8 text-center">
              <div className="mb-4 text-4xl font-bold text-[#0D9488]">98%</div>
              <p className="text-sm font-medium text-[#6A6A6A]">Guest Satisfaction</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-[#F0FDFA] p-8 text-center">
              <div className="mb-4 text-4xl font-bold text-[#0D9488]">24/7</div>
              <p className="text-sm font-medium text-[#6A6A6A]">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section 1 */}
      <section className="bg-gradient-to-b from-white to-[#F0FDFA] px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0D9488]">
                Our Mission
              </p>
              <h2 className="mb-4 text-3xl font-bold text-[#222222] md:text-4xl">
                Provide Spaces That Feel Like Home
              </h2>
              <p className="mb-4 text-base leading-7 text-[#6A6A6A]">
                We believe every client deserves a space that exceeds expectations.
                Our carefully curated properties combine comfort, style, and convenience
                to create unforgettable experiences.
              </p>
              <p className="mb-6 text-base leading-7 text-[#6A6A6A]">
                From modern amenities to thoughtful touches, we ensure each property
                reflects our commitment to excellence and guest satisfaction.
              </p>
              {/* <button className="rounded-lg bg-[#0D9488] px-6 py-2.5 font-semibold text-white transition hover:bg-[#C61645]">
                Learn More
              </button> */}
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#FFE4ED] to-transparent blur-2xl opacity-50" />
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&h=500&fit=crop"
                  alt="Modern living room"
                  width={600}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section 2 */}
      <section className="bg-[#F0FDFA] px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-bl from-[#FFD4E5] to-transparent blur-2xl opacity-50" />
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&h=500&fit=crop"
                  alt="Professional team"
                  width={600}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0D9488]">
                Why Choose Us
              </p>
              <h2 className="mb-4 text-3xl font-bold text-[#222222] md:text-4xl">
                Excellence in Every Detail
              </h2>
              <ul className="mb-6 space-y-3 text-base text-[#6A6A6A]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0D9488] text-xs font-bold text-white">✓</span>
                  <span>Carefully selected and maintained properties</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0D9488] text-xs font-bold text-white">✓</span>
                  <span>24/7 responsive customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0D9488] text-xs font-bold text-white">✓</span>
                  <span>Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0D9488] text-xs font-bold text-white">✓</span>
                  <span>Premium amenities in every location</span>
                </li>
              </ul>
              <Link href="/search">
                <button className=" cursor-pointer rounded-lg bg-[#0D9488] px-6 py-2.5 font-semibold text-white transition hover:bg-[#C61645]">
                  View Our Properties
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
