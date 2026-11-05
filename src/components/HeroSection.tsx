"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Clock, TrendingUp, ArrowDown } from "lucide-react";

// Minimal SVG WhatsApp Icon
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const metricsSectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const BUSINESS_PHONE = "18005558900";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.15 }
      )
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );

      // Parallax effect on background image as user scrolls
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Metric cards staggered entrance
      if (metricsSectionRef.current) {
        gsap.fromTo(
          cardRefs.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metricsSectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hero Canvas with user's background image */}
      <section className="relative w-full min-h-[92vh] sm:min-h-[96vh] lg:min-h-[1050px] flex flex-col justify-between overflow-hidden bg-white">
        {/* Full Image Background */}
        <div ref={bgImageRef} className="absolute inset-0 w-full h-[95%] z-0">
          <Image
            src="/hero-image-1.png"
            alt="Fastcom Cargo Volvo VNL Truck on Highway"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-bottom"
          />
          {/* Subtle top sky blend so navbar has perfect backdrop readability */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none" />
        </div>

        {/* Hero Typography overlaid cleanly on the sky area */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-32 sm:pt-36 md:pt-42 text-center">
          <h1
            ref={headlineRef}
            className="text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-extrabold tracking-[-0.035em] text-[#111113] leading-[1.08] mb-4 sm:mb-5"
          >
            Deliver your cargo
            <br />
            like never before.
          </h1>

          <p
            ref={subheadRef}
            className="text-[14.5px] sm:text-[16px] md:text-[17.5px] font-normal text-neutral-500 tracking-[-0.01em] max-w-xl mx-auto leading-relaxed"
          >
            Real-time tracking, temperature-controlled freight, and seamless
            dispatch solutions – all in one powerful cargo network.
          </p>

          {/* Action Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center gap-3.5 mt-7 sm:mt-8"
          >
            <a
              href="#track"
              className="bg-black hover:bg-neutral-800 text-white text-[13.5px] sm:text-[14px] font-semibold px-6 sm:px-7 py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Track shipment</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-y-0.5 transition-all" />
            </a>

            <a
              href={`https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(
                "Hello Fastcom Cargo, I would like to make an enquiry about shipment services."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/85 hover:bg-white text-neutral-900 border border-neutral-200/80 hover:border-neutral-300 text-[13.5px] sm:text-[14px] font-semibold px-6 sm:px-7 py-3 rounded-full transition-all duration-200 backdrop-blur-md shadow-2xs hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 group cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#1da851]" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Transparent bottom spacer to showcase the truck on the road */}
        <div className="relative z-10 w-full h-80 sm:h-96 md:h-[480px] lg:h-[540px] pointer-events-none" />
      </section>

      {/* "Useful for business." Section */}
      <section className="py-24 md:py-32 bg-[#fbfbfb] border-t border-neutral-200/50 relative z-10">
        <div ref={metricsSectionRef} className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-[34px] sm:text-[44px] md:text-[50px] font-bold tracking-[-0.035em] text-[#111113] mb-4">
            Useful for business.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-neutral-500 font-normal tracking-[-0.01em] max-w-xl mx-auto mb-14 md:mb-16">
            Our logistics technologies enhance delivery reliability, cargo safety, and cost efficiency.
          </p>

          {/* 3 Metric Cards matching reference screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            {/* Card 1: Time saving / On-Time Delivery */}
            <div
              ref={(el) => {
                cardRefs.current[0] = el;
              }}
              className="bg-white rounded-2xl md:rounded-3xl p-8 sm:p-9 border border-neutral-200/70 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[13px] font-medium text-neutral-400 tracking-tight">
                    Time saving
                  </span>
                  <div className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-neutral-100 transition-colors">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[44px] sm:text-[52px] font-bold tracking-[-0.04em] text-neutral-900 leading-none">
                    99.4%
                  </div>
                  <div className="text-[17px] font-semibold tracking-tight text-neutral-800 mt-2">
                    on-time delivery rate.
                  </div>
                </div>
              </div>

              <p className="text-[14px] text-neutral-500 leading-relaxed mt-6 pt-6 border-t border-neutral-100">
                Automated route dispatch and express intermodal lanes guarantee shipments arrive precisely as scheduled.
              </p>
            </div>

            {/* Card 2: Cargo Safety */}
            <div
              ref={(el) => {
                cardRefs.current[1] = el;
              }}
              className="bg-white rounded-2xl md:rounded-3xl p-8 sm:p-9 border border-neutral-200/70 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[13px] font-medium text-neutral-400 tracking-tight">
                    Safety
                  </span>
                  <div className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-neutral-100 transition-colors">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[44px] sm:text-[52px] font-bold tracking-[-0.04em] text-neutral-900 leading-none">
                    0.01%
                  </div>
                  <div className="text-[17px] font-semibold tracking-tight text-neutral-800 mt-2">
                    damage claim rate.
                  </div>
                </div>
              </div>

              <p className="text-[14px] text-neutral-500 leading-relaxed mt-6 pt-6 border-t border-neutral-100">
                Air-ride trailers and real-time g-force sensors safeguard sensitive freight, pharmaceuticals, and high-value cargo.
              </p>
            </div>

            {/* Card 3: Freight Cost Efficiency */}
            <div
              ref={(el) => {
                cardRefs.current[2] = el;
              }}
              className="bg-white rounded-2xl md:rounded-3xl p-8 sm:p-9 border border-neutral-200/70 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[13px] font-medium text-neutral-400 tracking-tight">
                    Improving efficiency
                  </span>
                  <div className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-neutral-100 transition-colors">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[44px] sm:text-[52px] font-bold tracking-[-0.04em] text-neutral-900 leading-none">
                    30%
                  </div>
                  <div className="text-[17px] font-semibold tracking-tight text-neutral-800 mt-2">
                    reduction in freight costs.
                  </div>
                </div>
              </div>

              <p className="text-[14px] text-neutral-500 leading-relaxed mt-6 pt-6 border-t border-neutral-100">
                Consolidated freight corridors and smart backhaul capacity matching eliminate deadhead miles and slash surcharges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
