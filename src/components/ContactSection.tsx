"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  ArrowRight,
  Clock,
  CheckCircle2,
  Send,
  ArrowUpRight,
} from "lucide-react";

// Minimal SVG WhatsApp Icon matching the site's monoline icon weight
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

const serviceTypes = [
  "Express Air Freight",
  "Full Truckload (FTL)",
  "Refrigerated / Reefer",
  "Door to Door Delivery",
];

export default function ContactSection() {
  const [selectedService, setSelectedService] = useState("Express Air Freight");
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Business communication constants
  const BUSINESS_PHONE = "18005558900";
  const DISPLAY_PHONE = "+1 (800) 555-8900";
  const BUSINESS_EMAIL = "dispatch@fastcomcargo.com";

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Build comprehensive message for the duty officer
    const parts = [
      `*New Cargo Enquiry - Fastcom Website*`,
      `*Customer / Company:* ${name.trim()}`,
      `*Service Required:* ${selectedService}`,
    ];

    if (origin.trim()) parts.push(`*Origin:* ${origin.trim()}`);
    if (destination.trim()) parts.push(`*Destination:* ${destination.trim()}`);
    if (details.trim()) parts.push(`*Details / Weight:* ${details.trim()}`);

    const message = parts.join("\n");
    const whatsappUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
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
        ".contact-pane",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-36 bg-[#fbfbfc] border-t border-neutral-200/70 relative selection:bg-neutral-900 selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header matching the site's editorial typography */}
        <div className="contact-header text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-[34px] sm:text-[46px] md:text-[54px] font-bold tracking-[-0.035em] text-[#111113] leading-[1.08] mb-4">
            Let&apos;s connect your cargo.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-neutral-500 font-normal tracking-[-0.015em] leading-relaxed max-w-xl mx-auto">
            Speak directly with our freight coordinators or message our 24/7 duty
            desk for immediate spot rates and priority dispatch.
          </p>
        </div>

        {/* 2-Column Balanced Layout */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch"
        >
          {/* ─── Left Column: Direct Communication Channels (Equal Height) ─── */}
          <div className="contact-pane lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct Phone Desk Card */}
            <div className="flex-1 bg-white rounded-3xl p-7 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold tracking-tight text-neutral-900 leading-snug">
                      24/7 Telephone Operations
                    </h3>
                    <span className="text-[12px] text-neutral-400 block">
                      Direct line for urgent dispatch
                    </span>
                  </div>
                </div>
                <p className="text-[13.5px] text-neutral-500 leading-relaxed">
                  For time-critical air freight, hot-shot pickups, or active convoy routing across national corridors.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100">
                <a
                  href={`tel:${BUSINESS_PHONE}`}
                  className="inline-flex items-center justify-between w-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 text-[13px] font-semibold px-5 py-3 rounded-full transition-all duration-200 group"
                >
                  <span>Call {DISPLAY_PHONE}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Corporate Email Desk Card */}
            <div className="flex-1 bg-white rounded-3xl p-7 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold tracking-tight text-neutral-900 leading-snug">
                      Enterprise Logistics & RFPs
                    </h3>
                    <span className="text-[12px] text-neutral-400 block">
                      Contract freight & scheduling
                    </span>
                  </div>
                </div>
                <p className="text-[13.5px] text-neutral-500 leading-relaxed">
                  Send tenders, commercial manifests, and volume contract inquiries to our corporate desk.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100">
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="inline-flex items-center justify-between w-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 text-[13px] font-semibold px-5 py-3 rounded-full transition-all duration-200 group"
                >
                  <span>{BUSINESS_EMAIL}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>

          {/* ─── Right Column: High-End Quick Enquiry Form (Equal Height) ─── */}
          <div className="contact-pane lg:col-span-7 bg-white rounded-3xl p-7 sm:p-8 border border-neutral-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            {submitted ? (
              <div className="my-auto py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-[22px] font-bold tracking-tight text-neutral-900">
                  Enquiry Dispatched
                </h3>
                <p className="text-[14px] text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Your freight details have been prepared for our operations desk. A duty officer will review your lane requirements immediately.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-[13px] font-semibold text-neutral-900 hover:underline cursor-pointer"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppSubmit} className="flex flex-col justify-between h-full space-y-6">
                <div>
                  <h3 className="text-[20px] sm:text-[22px] font-bold tracking-tight text-neutral-900 mb-1.5">
                    Fast quote request.
                  </h3>
                  <p className="text-[13.5px] text-neutral-500 font-normal leading-relaxed">
                    Enter your cargo parameters below for direct pricing and dispatch confirmation on WhatsApp.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Sender / Company Name */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Your Name / Company Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Liam Scott (Vertex Logistics)"
                      className="w-full px-4 py-3 rounded-2xl bg-[#fbfbfc] border border-neutral-200/80 text-[14px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Cargo Details */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Cargo Details & Approximate Weight *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="e.g. 4 euro pallets, approx 1,800 KG, temperature hold at 4°C, ready Monday morning..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#fbfbfc] border border-neutral-200/80 text-[14px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-black text-white text-[14px] font-semibold py-3.5 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.005] active:scale-[0.995]"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                    <span>Enquire on WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
