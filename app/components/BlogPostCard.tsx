"use client";

import Image from "next/image";
import Link from "next/link";

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  image: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
}

export default function BlogPostCard({
  slug,
  title,
  date,
  image,
  className = "",
  aspectRatio = "video",
}: BlogPostCardProps) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  return (
    <Link
      href={`/blog/${slug}`}
      className={`group flex flex-col gap-4 ${className}`}
    >
      <div className={`relative overflow-hidden rounded-2xl ${aspectClasses[aspectRatio]} bg-[#F0FDFA]`}>
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
        />
        {/* Subtle overlay to ensure the brand color is always present seamlessly */}
        <div className="absolute inset-0 bg-[#0D9488]/5 z-10 mix-blend-overlay pointer-events-none" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-[#222222] leading-tight group-hover:text-[#0D9488] transition-colors">
          {title}
        </h3>
        <p className="text-xs uppercase tracking-widest text-[#6A6A6A] font-medium">
          {date}
        </p>
      </div>
    </Link>
  );
}
