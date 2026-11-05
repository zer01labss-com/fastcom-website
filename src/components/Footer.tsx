"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200/70 py-8 sm:py-10 text-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Brand & Description Side-by-Side */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5">
            <Link href="/" className="inline-flex items-center gap-2 group shrink-0">
              <svg
                width="24"
                height="20"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path d="M10 2L2 22H7L15 2H10Z" fill="currentColor" />
                <path d="M21 2L13 22H18L26 2H21Z" fill="currentColor" />
              </svg>
              <span className="text-[13px] font-extrabold tracking-[0.22em] uppercase text-black">
                FASTCOM CARGO
              </span>
            </Link>

            <span className="hidden sm:inline-block w-px h-3.5 bg-neutral-200" />

            <p className="text-[13px] text-neutral-500 leading-normal max-w-xl">
              Nationwide freight logistics, temperature-controlled cargo, and sub-second telematics.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Fastcom Cargo Logistics Inc.</span>
            <span>•</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#about" className="hover:text-neutral-800 transition-colors">
              Privacy Notice
            </a>
            <a href="#about" className="hover:text-neutral-800 transition-colors">
              Terms of Carriage
            </a>
            <a href="#about" className="hover:text-neutral-800 transition-colors">
              Cargo Insurance
            </a>
            <div className="flex items-center gap-1 text-neutral-500">
              <Globe className="w-3.5 h-3.5" />
              <span>US / EN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
