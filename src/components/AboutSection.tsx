"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left side text entrance
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Subtle parallax effect on the full image
      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector("img"), {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden py-16 sm:py-24 lg:py-0 min-h-[640px] lg:min-h-[720px] flex items-center"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[640px] lg:min-h-[720px]">
        
        {/* ─── LEFT: Company Narrative & CTA ─── */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-24 lg:pr-8 py-12 lg:py-20 z-20">
          <div ref={textRef} className="max-w-xl">
            <span className="text-[12px] font-bold tracking-widest text-neutral-400 uppercase mb-4 block">
              About Our Network
            </span>

            <h2 className="text-[36px] sm:text-[46px] md:text-[52px] font-bold tracking-[-0.035em] text-[#111113] leading-[1.08] mb-6">
              Reliability that moves the world forward.
            </h2>

            <div className="space-y-4 text-[16px] sm:text-[17px] text-neutral-500 leading-relaxed font-normal mb-8">
              <p>
                Founded on the standard of absolute precision, we orchestrate global 
                courier operations and enterprise cargo logistics across air, ocean, 
                and road corridors.
              </p>
              <p>
                From single priority envelopes to full multi-ton container freights, 
                our end-to-end routing infrastructure guarantees unbroken chain of 
                custody, rapid customs clearance, and transparent real-time tracking 
                every step of the journey.
              </p>
            </div>

            {/* Get in Touch CTA Button */}
            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#111113] text-white text-[14.5px] font-semibold tracking-tight hover:bg-neutral-800 transition-all duration-200 shadow-sm group"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Full-Size Image with Seamless Gradient Blend ─── */}
        <div className="lg:col-span-6 xl:col-span-7 relative min-h-[440px] sm:min-h-[540px] lg:min-h-full w-full overflow-hidden">
          
          {/* Desktop Left-to-Right Gradient Blend (Merges image into left text background) */}
          <div 
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-36 xl:w-56 bg-gradient-to-r from-white via-white/80 to-transparent z-10" 
          />

          {/* Mobile Top-to-Bottom Gradient Blend */}
          <div 
            aria-hidden="true"
            className="lg:hidden pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white via-white/80 to-transparent z-10" 
          />

          {/* Clean, Full-size Cargo Photo (No overlaid cards or text) */}
          <div ref={imageRef} className="relative w-full h-full min-h-[440px] lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop"
              alt="Global logistics and air cargo operations"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}