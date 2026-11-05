"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const courierServices = [
  {
    id: "worldwide",
    tag: "Global Air & Ocean",
    title: "Worldwide delivery.",
    description:
      "Cross-continental air freight and maritime corridors connecting 220+ countries with sub-day customs dispatch.",
    stat: "220+ Countries",
    // 1. Worldwide Delivery: Cargo Jet & Global Trajectory Visual
    renderVisual: () => (
      <svg
        viewBox="0 0 280 200"
        className="w-full h-full max-h-[160px] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orbital Trajectory Arc */}
        <path
          d="M 30,150 C 90,60 190,50 250,90"
          stroke="#e2e8f0"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <circle cx="50" cy="135" r="4" fill="#94a3b8" />
        <circle cx="160" cy="65" r="4" fill="#94a3b8" />
        <circle cx="230" cy="80" r="5" fill="#2563eb" />

        {/* Jet Shadow */}
        <ellipse cx="140" cy="165" rx="45" ry="8" fill="#000000" opacity="0.06" />

        {/* Cargo Aircraft Body */}
        <g transform="translate(45, 10) rotate(-8 140 100)">
          {/* Main Fuselage */}
          <path
            d="M50,100 L170,80 C195,76 215,84 220,95 C215,106 195,114 170,110 L50,115 Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Cockpit Window Strip */}
          <path
            d="M198,87 C204,89 208,93 209,96 L195,97 Z"
            fill="#0f172a"
          />
          {/* Cargo Main Wing */}
          <polygon
            points="110,95 70,150 95,152 145,92"
            fill="#f8fafc"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Jet Turbine */}
          <rect
            x="100"
            y="120"
            width="32"
            height="14"
            rx="7"
            fill="#334155"
            stroke="#0f172a"
            strokeWidth="2"
          />
          {/* Tail Fin */}
          <polygon
            points="55,100 35,45 55,45 80,98"
            fill="#2563eb"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    ),
  },
  {
    id: "international",
    tag: "Priority Freight",
    title: "International courier.",
    description:
      "Expedited cross-border courier lanes with automated tariff clearance, priority flight holds, and instant customs handoffs.",
    stat: "Next Flight Out",
    // 2. International Courier: High-Speed Cargo Van Visual
    renderVisual: () => (
      <svg
        viewBox="0 0 280 200"
        className="w-full h-full max-h-[160px] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Speed vectors */}
        <line x1="20" y1="110" x2="60" y2="110" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="35" y1="125" x2="70" y2="125" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />

        {/* Van Ground Shadow */}
        <ellipse cx="145" cy="165" rx="75" ry="9" fill="#000000" opacity="0.07" />

        {/* Courier Express Van Body */}
        <g id="van">
          {/* Main Cargo Box & Cab */}
          <path
            d="M70,85 L180,85 L200,105 L225,115 C228,118 230,125 230,145 L70,145 Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Cab Windshield */}
          <path
            d="M182,92 L198,107 L216,115 L182,115 Z"
            fill="#0f172a"
          />
          {/* Express Chevron Badge */}
          <path
            d="M110,105 L125,115 L110,125"
            stroke="#2563eb"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M125,105 L140,115 L125,125"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Wheels */}
          <circle cx="105" cy="148" r="16" fill="#0f172a" />
          <circle cx="105" cy="148" r="7" fill="#f8fafc" />
          <circle cx="195" cy="148" r="16" fill="#0f172a" />
          <circle cx="195" cy="148" r="7" fill="#f8fafc" />
        </g>
      </svg>
    ),
  },
  {
    id: "secure",
    tag: "High-Security Transit",
    title: "Safe and secure handling.",
    description:
      "Temperature-regulated crating, tamper-proof electronic seals, and g-force impact telemetry for high-value cargo.",
    stat: "100% Insured",
    // 3. Safe & Secure Handling: Vault Cargo Crate & Shield Visual
    renderVisual: () => (
      <svg
        viewBox="0 0 280 200"
        className="w-full h-full max-h-[160px] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base Shadow */}
        <ellipse cx="140" cy="165" rx="55" ry="8" fill="#000000" opacity="0.07" />

        {/* Heavy-Duty Security Container */}
        <polygon
          points="80,100 140,75 200,100 140,125"
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth="2.5"
        />
        <polygon
          points="80,100 140,125 140,155 80,130"
          fill="#e2e8f0"
          stroke="#0f172a"
          strokeWidth="2.5"
        />
        <polygon
          points="200,100 140,125 140,155 200,130"
          fill="#cbd5e1"
          stroke="#0f172a"
          strokeWidth="2.5"
        />

        {/* Security Shield Overlay Badge */}
        <g transform="translate(115, 60)">
          <path
            d="M25,5 C40,5 50,0 50,0 C50,25 42,48 25,58 C8,48 0,25 0,0 C0,0 10,5 25,5 Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Keyhole / Lock Core */}
          <circle cx="25" cy="22" r="5" fill="#2563eb" />
          <polygon points="22,23 28,23 26,34 24,34" fill="#2563eb" />
        </g>
      </svg>
    ),
  },
  {
    id: "door-to-door",
    tag: "Last-Mile Precision",
    title: "Door to Door delivery.",
    description:
      "Automated route sequencing, live doorstep recipient updates, and cryptographic digital proof of delivery.",
    stat: "Sub-Meter Pinpoint",
    // 4. Door to Door Delivery: Doorstep Parcel & Pinpoint Visual
    renderVisual: () => (
      <svg
        viewBox="0 0 280 200"
        className="w-full h-full max-h-[160px] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floor Horizon & Doorstep Platform */}
        <ellipse cx="140" cy="165" rx="65" ry="9" fill="#000000" opacity="0.07" />

        {/* Doorstep Package Box */}
        <polygon
          points="90,115 140,95 190,115 140,135"
          fill="#fbf7ee"
          stroke="#0f172a"
          strokeWidth="2.5"
        />
        <polygon
          points="90,115 140,135 140,158 90,138"
          fill="#edd6b1"
          stroke="#0f172a"
          strokeWidth="2.5"
        />
        <polygon
          points="190,115 140,135 140,158 190,138"
          fill="#dfbe8b"
          stroke="#0f172a"
          strokeWidth="2.5"
        />

        {/* Packaging Tape */}
        <polygon
          points="112,106 128,100 168,124 152,130"
          fill="#c99e63"
          opacity="0.8"
        />

        {/* Delivery Pin Badge with Checkmark */}
        <g transform="translate(155, 45)">
          <path
            d="M20,0 C31,0 40,9 40,20 C40,32 20,52 20,52 C20,52 0,32 0,20 C0,9 9,0 20,0 Z"
            fill="#2563eb"
            stroke="#0f172a"
            strokeWidth="2"
          />
          {/* Checkmark icon */}
          <polyline
            points="13,20 18,25 28,15"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
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
            start: "top 80%",
          },
        }
      );

      // Staggered Cards Entrance
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
            start: "top 82%",
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
        {/* Section Header matching Apple/Linear editorial style */}
        <div className="section-header text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-[34px] sm:text-[46px] md:text-[54px] font-bold tracking-[-0.035em] text-[#111113] leading-[1.08] mb-4">
            Services and capabilities.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-neutral-500 font-normal tracking-[-0.015em] leading-relaxed max-w-xl mx-auto">
            From cross-border air freight to precision doorstep delivery, our
            courier solutions guarantee unbroken chain of custody.
          </p>
        </div>

        {/* 4 Items Grid with Non-Background Visuals & Footer Content */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6"
        >
          {courierServices.map((service) => (
            <div
              key={service.id}
              className="courier-card group relative bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top: Clean, Non-background Canvas Visual Area */}
              <div className="relative w-full pt-8 pb-4 px-6 flex items-center justify-center bg-gradient-to-b from-neutral-50/60 to-transparent">
                {/* Pure Non-background Visual */}
                <div className="w-full h-40 flex items-center justify-center">
                  {service.renderVisual()}
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