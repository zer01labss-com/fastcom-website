"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

const locations = [
  {
    id: "palo-alto",
    city: "Palo Alto",
    region: "California, USA",
    role: "Global Operations Hub",
    address: "420 University Ave, Palo Alto, CA 94301",
    phone: "+1 (650) 492-8200",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rotterdam",
    city: "Rotterdam",
    region: "Netherlands",
    role: "European Freight Terminal",
    address: "Wilhelminakade 179, 3072 AP Rotterdam",
    phone: "+31 10 798 4400",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "phoenix",
    city: "Phoenix",
    region: "Arizona, USA",
    role: "Western Cargo Gateway",
    address: "8800 Desert Commerce Pkwy, Phoenix, AZ 85037",
    phone: "+1 (602) 831-9010",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?q=80&w=800&auto=format&fit=crop",
  },
];

export default function CompactLocationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".location-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".location-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-[#fafafa] border-t border-neutral-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Compact Header */}
        <div className="location-header text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-[32px] sm:text-[42px] font-bold tracking-[-0.035em] text-[#111113] leading-tight mb-3">
            Our global locations.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-500 font-normal tracking-[-0.01em]">
            Strategic freight terminals and operations centers positioned along primary global trade routes.
          </p>
        </div>

        {/* 3 Compact Location Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7"
        >
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="location-card bg-white rounded-2xl border border-neutral-200/70 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group"
            >
              {/* Compact Facility Photo */}
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-neutral-100">
                <Image
                  src={loc.image}
                  alt={`${loc.city} facility`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Information Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-[19px] font-bold tracking-tight text-neutral-900">
                      {loc.city}
                    </h3>
                    <span className="text-[12px] font-medium text-neutral-400">
                      {loc.region}
                    </span>
                  </div>

                  <div className="space-y-2 mt-4 pt-4 border-t border-neutral-100 text-[13.5px] text-neutral-600">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>{loc.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Directions link */}
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-[13px] font-semibold text-neutral-800 hover:text-black transition-colors"
                  >
                    <span>Get directions</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}