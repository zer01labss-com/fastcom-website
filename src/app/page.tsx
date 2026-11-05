import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrackShipmentSection from "@/components/TrackShipmentSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import VisitUsSection from "@/components/VisitUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[#fbfbfb] text-[#111113]">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <TrackShipmentSection />
          <ServicesSection />
          <AboutSection />
          <VisitUsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
