"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-neutral-200/60 py-3.5 shadow-2xs"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* ─── Desktop 3-Column Grid: Left Links | Center Logo | Right Actions ─── */}
        <div className="hidden md:grid md:grid-cols-3 items-center">
          
          {/* 1. LEFT: Primary Navigation Links */}
          <nav className="flex items-center space-x-7 text-[13.5px] font-medium tracking-tight text-neutral-600">
            <a
              href="#services"
              className="hover:text-black transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              className="hover:text-black transition-colors"
            >
              About
            </a>
            <a
              href="#locations"
              className="hover:text-black transition-colors"
            >
              Locations
            </a>
          </nav>

          {/* 2. CENTER: Mathematically Centered Logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="flex items-center justify-center group cursor-pointer select-none"
            >
              <Image
                src="/fastcom-logo.png"
                alt="Fastcom Logo"
                width={200}
                height={58}
                priority
                className="h-10 w-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-200"
              />
            </Link>
          </div>

          {/* 3. RIGHT: Contact Link & CTA Button */}
          <div className="flex items-center justify-end space-x-6">
            <a
              href="#contact"
              className="text-[13.5px] font-medium tracking-tight text-neutral-600 hover:text-black transition-colors"
            >
              Contact Desk
            </a>
            <a
              href="#track"
              className="inline-flex items-center justify-center bg-[#111113] hover:bg-neutral-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
            >
              Track Shipment
            </a>
          </div>
        </div>

        {/* ─── Mobile View (Flex Layout) ─── */}
        <div className="flex md:hidden items-center justify-between">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/fastcom-logo.png"
              alt="Fastcom Logo"
              width={160}
              height={50}
              priority
              className="h-8.5 sm:h-9.5 w-auto object-contain"
            />
          </Link>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#track"
              className="bg-[#111113] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-full"
            >
              Track
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-black hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Drawer Menu ─── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-6 py-6 space-y-4 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-3.5 text-[15px] font-medium text-neutral-800">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black transition-colors"
            >
              Services & Capabilities
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black transition-colors"
            >
              About Our Network
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black transition-colors"
            >
              Global Hubs
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black transition-colors"
            >
              Contact Desk
            </a>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[12px] text-neutral-500 font-medium">
              Global Dispatch 24/7
            </span>
            <a
              href="#track"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 bg-[#111113] text-white text-[13px] px-4 py-2 rounded-full font-medium"
            >
              Track Cargo <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}