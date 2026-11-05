"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const courierServices = [
  {
    id: "worldwide",
    title: "Worldwide delivery.",
    description:
      "Cross-continental air freight and maritime corridors connecting 220+ countries with sub-day customs dispatch.",
    image: "/Wireframe Jet in Flight.png",
  },
  {
    id: "international",
    title: "International courier.",
    description:
      "Expedited cross-border courier lanes with automated tariff clearance, priority flight holds, and instant customs handoffs.",
    image: "/Wireframe Globe with Orbit and Parcels.png",
  },
  {
    id: "secure",
    title: "Safe and secure handling.",
    description:
      "Temperature-regulated crating, tamper-proof electronic seals, and g-force impact telemetry for high-value cargo.",
    image: "/Secure Wireframe Container Crane.png",
  },
  {
    id: "door-to-door",
    title: "Door to Door delivery.",
    description:
      "Automated route sequencing, live doorstep recipient updates, and cryptographic digital proof of delivery.",
    image: "/Wireframe Door-to-Door Delivery Cycle.png",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".section-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".courier-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-36 bg-[#fbfbfc] border-t border-neutral-200/70 relative selection:bg-neutral-900 selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="section-header text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-[34px] sm:text-[46px] md:text-[54px] font-bold tracking-[-0.035em] text-[#111113] leading-[1.08] mb-4">
            Services and capabilities.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-neutral-500 font-normal tracking-[-0.015em] leading-relaxed max-w-xl mx-auto">
            From cross-border air freight to precision doorstep delivery, our
            courier solutions guarantee unbroken chain of custody.
          </p>
        </div>

        {/* 4 Items Grid with Wireframe Images */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6"
        >
          {courierServices.map((service) => (
            <div
              key={service.id}
              className="courier-card group relative bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top: Public Wireframe Image Area */}
              <div className="relative w-full pt-6 pb-2 px-6 flex items-center justify-center bg-gradient-to-b from-neutral-50/70 to-transparent">
                <div className="relative w-full h-44 sm:h-48 flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Card Content: Title and Description */}
              <div className="p-6 sm:p-7 pt-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-bold tracking-tight text-neutral-900 leading-snug mb-2.5 group-hover:text-black transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[13.5px] text-neutral-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
