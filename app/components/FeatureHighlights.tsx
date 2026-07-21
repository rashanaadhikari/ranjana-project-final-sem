import Image from "next/image";

const highlights = [
  {
    id: 1,
    icon: "/icons/home.svg",
    title: "Find the Right Room, Faster",
    desc: "Smart filters and location-based search help you find your perfect space in minutes.",
    bg: "bg-[#F0FDFA]",
    iconBg: "bg-[#0D9488]",
  },
  {
    id: 2,
    icon: "/icons/handshake.svg",
    title: "Verified Listings You Can Trust",
    desc: "Every property is verified by our team so you always get accurate and honest information.",
    bg: "bg-white",
    iconBg: "bg-[#0D9488]",
  },
  {
    id: 3,
    icon: "/icons/headphone.svg",
    title: "Help Anytime, Day or Night",
    desc: "Our dedicated support team is available 24/7 to answer all your rental questions.",
    bg: "bg-[#F0FDFA]",
    iconBg: "bg-[#0D9488]",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {highlights.map((h) => (
            <div
              key={h.id}
              className={`${h.bg} rounded-2xl p-6 flex items-start gap-4 border border-gray-100 hover:shadow-md transition-shadow duration-300`}
            >
              <div className={`${h.iconBg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
                <Image src={h.icon} alt={h.title} width={22} height={22} className="w-5 h-5 brightness-0 invert" />
              </div>
              <div>
                <h3 className="font-semibold text-[#222222] text-sm leading-snug mb-1">
                  {h.title}
                </h3>
                <p className="text-xs text-[#6A6A6A] leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
