"use client";

import Image from "next/image";
import { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  rating: number;
  review: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sushant Rai",
    role: "IT Professional",
    image: "/images/testimonial-1.png",
    rating: 5,
    review:
      "Sushant is a very skilled and highly professional. Informed solutions to questions, and was very reliable in his fashion and mentorship way. I am highly happy to hire again!",
    date: "Jan 17, 2025",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "College Student",
    rating: 5,
    review:
      "We work quickly and the client highly motivated his all the companies, our colleague was able to take this job role and match what we and in our machine way. I am highly happy to hire again!",
    date: "Jan 13, 2025",
  },
  {
    id: 3,
    name: "Bikram Thapa",
    role: "Business Owner",
    rating: 5,
    review:
      "Sushant is a very skilled and highly professional. Informed solutions to all questions I had and was very reliable in his fashion and mentorship. I am highly happy to hire again!",
    date: "Jan 11, 2025",
  },
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.image) {
    return (
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        width={44}
        height={44}
        className="w-11 h-11 rounded-full object-cover border-2 border-[#0D9488]"
      />
    );
  }
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-11 h-11 rounded-full bg-[#0D9488] flex items-center justify-center text-white font-bold text-sm border-2 border-[#0D9488]">
      {initials}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  // Get 3 visible cards with wrap-around
  const visibleCount = 3;
  const visible = Array.from({ length: visibleCount }, (_, i) =>
    testimonials[(active + i) % testimonials.length]
  );

  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#222222] max-w-xs md:max-w-sm leading-tight">
            Clients Feedback About Their{" "}
            <span className="text-[#0D9488]">Experience With Us</span>
          </h2>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#0D9488] hover:text-[#0D9488] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#0D9488] hover:text-[#0D9488] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {visible.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote mark */}
              <div className="text-[#0D9488] text-4xl font-serif leading-none mb-3 opacity-40">&quot;</div>

              {/* Review text */}
              <p className="text-[#6A6A6A] text-xs leading-relaxed line-clamp-3 mb-4">{t.review}</p>

              {/* User info */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <Avatar testimonial={t} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#222222] text-xs truncate">{t.name}</p>
                  <p className="text-[#6A6A6A] text-xs">{t.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <StarRating rating={t.rating} />
                  <span className="text-[10px] text-[#6A6A6A]">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-[#0D9488]" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
