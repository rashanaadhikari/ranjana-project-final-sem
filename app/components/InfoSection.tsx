import Image from "next/image";
import Link from "next/link";

interface CTAButton {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

interface InfoSectionProps {
  image: string;
  imageAlt: string;
  heading: string;
  body: string;
  buttons?: CTAButton[];
  imageOnLeft?: boolean;
  bgColor?: string;
}

export default function InfoSection({
  image,
  imageAlt,
  heading,
  body,
  buttons = [],
  imageOnLeft = true,
  bgColor = "bg-white",
}: InfoSectionProps) {
  const imageBlock = (
    <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg shrink-0">
      <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
  );

  const textBlock = (
    <div className="flex-1 flex flex-col justify-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#222222] leading-tight mb-4">
        {heading}
      </h2>
      <p className="text-[#6A6A6A] text-sm md:text-base leading-relaxed mb-6">{body}</p>
      {buttons.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {buttons.map((btn) => (
            <Link
              key={btn.label}
              href={btn.href}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                btn.variant === "primary"
                  ? "bg-[#0D9488] text-white hover:bg-[#0D9488] shadow-sm hover:shadow-md"
                  : "border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#F0FDFA]"
              }`}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className={`w-full py-14 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col ${imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16`}
        >
          {imageBlock}
          {textBlock}
        </div>
      </div>
    </section>
  );
}
