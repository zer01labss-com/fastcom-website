"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Truck,
  Building2,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";

interface DocketEvent {
  id: string;
  docket_id: string;
  event_at: string;
  event_type: string;
  event_description: string;
  event_location: string;
  event_state: string;
  event_remark?: string;
}

interface TrackingResponseItem {
  errors: boolean | string;
  tracking_no: string;
  chargeable_weight: string;
  forwarding_no: string;
  reference_no: string;
  pcs: string;
  docket_info: [string, string][];
  docket_events: DocketEvent[];
}

export default function TrackShipmentSection() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackingResponseItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleTrack = async (numToTrack?: string) => {
    const num = (numToTrack || trackingNumber).trim();
    if (!num) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/track?tracking_no=${encodeURIComponent(num)}`);
      if (!res.ok) {
        throw new Error("Unable to locate consignment record.");
      }
      const data: TrackingResponseItem[] = await res.json();

      if (!Array.isArray(data) || data.length === 0 || data[0].errors) {
        setError(
          typeof data?.[0]?.errors === "string"
            ? data[0].errors
            : "No active shipment found with this tracking number. Please verify and try again."
        );
        setResult(null);
      } else {
        setResult(data[0]);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load tracking data.";
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setTrackingNumber("");
    setError(null);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".track-header",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate results when updated
  useEffect(() => {
    if (result && resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [result]);

  // Convert docket_info array into a key-value record
  const infoMap: Record<string, string> = result?.docket_info
    ? Object.fromEntries(result.docket_info)
    : {};

  const currentStatus = infoMap["Status"] || "IN TRANSIT";
  const origin = infoMap["Origin"] || "Origin";
  const destination = infoMap["Destination"] || "Destination";
  const originCity = infoMap["Shipper City"] || "";
  const destCity = infoMap["Consignee City"] || "";
  const bookingDate = infoMap["Booking Date"] || "";
  const deliveryTime = infoMap["Delivery Date and Time"] || "";
  const serviceName = infoMap["Service Name"] || "Express Freight";

  const isDelivered = currentStatus.toUpperCase().includes("DELIVERED");

  return (
    <section
      id="track"
      ref={sectionRef}
      className="py-24 md:py-36 bg-white border-t border-neutral-200/60 relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="track-header text-center max-w-2xl mx-auto mb-12">
          
          <h2 className="text-[36px] sm:text-[48px] md:text-[54px] font-bold tracking-[-0.035em] text-[#111113] leading-tight mb-4">
            Track shipment.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-neutral-500 font-normal tracking-[-0.01em] leading-relaxed">
            Enter your AWB or consignment reference to view real-time location logs, transit hubs, and proof of delivery.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-3xl mx-auto mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack();
            }}
            className="relative flex items-center bg-neutral-100 rounded-full p-2 border border-neutral-200/80 shadow-xs focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all"
          >
            <div className="pl-4 text-neutral-400">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => {
                setTrackingNumber(e.target.value);
                if (result) {
                  setResult(null);
                }
              }}
              placeholder="Enter AWB / Tracking number (e.g. T00117102601)..."
              className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />

            {trackingNumber && !result && (
              <button
                type="button"
                onClick={() => setTrackingNumber("")}
                className="p-1.5 mr-1 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-200/50 transition-colors"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {result ? (
              <button
                type="button"
                onClick={handleClear}
                className="bg-neutral-800 hover:bg-black text-white text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3 rounded-full transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3 rounded-full transition-all duration-200 flex items-center gap-2 shrink-0 disabled:opacity-60 cursor-pointer shadow-sm"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Tracking...</span>
                  </>
                ) : (
                  <>
                    <span>Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </form>

          {/* Quick-test helper chip */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-neutral-500">
            <span>Quick test:</span>
            <button
              type="button"
              onClick={() => {
                setTrackingNumber("T00117102601");
                handleTrack("T00117102601");
              }}
              className="font-mono underline font-medium text-neutral-800 hover:text-black cursor-pointer"
            >
              T00117102601
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-10 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Tracking Results Card */}
        {result && (
          <div
            ref={resultRef}
            className="bg-[#fafafa] rounded-3xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden"
          >
            {/* Top Status Header */}
            <div className="p-6 sm:p-8 bg-white border-b border-neutral-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-neutral-100 font-semibold text-neutral-700">
                    AWB: {result.tracking_no}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-tight uppercase ${
                      isDelivered
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isDelivered ? "bg-emerald-600" : "bg-blue-600 animate-pulse"
                      }`}
                    />
                    <span>{currentStatus}</span>
                  </span>

                  <span className="text-xs text-neutral-400 font-medium">
                    Service: {serviceName}
                  </span>
                </div>

                <div className="text-[20px] sm:text-[24px] font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                  <span>{originCity ? `${originCity}, ` : ""}{origin}</span>
                  <ArrowRight className="w-5 h-5 text-neutral-400" />
                  <span>{destCity ? `${destCity}, ` : ""}{destination}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="flex md:flex-col md:text-right items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-neutral-100">
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  {isDelivered ? "Delivered At" : "Booking Date"}
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-neutral-900 mt-0.5">
                  {isDelivered && deliveryTime ? deliveryTime : bookingDate}
                </div>
              </div>
            </div>

            {/* Consignment Metrics Quick Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:px-8 border-b border-neutral-200/60 bg-[#f7f7f8] text-xs">
              <div>
                <div className="text-neutral-400 uppercase tracking-wider font-semibold">
                  Chargeable Weight
                </div>
                <div className="text-neutral-900 font-mono font-bold text-sm mt-0.5">
                  {result.chargeable_weight} KG
                </div>
              </div>

              <div>
                <div className="text-neutral-400 uppercase tracking-wider font-semibold">
                  Total Pieces
                </div>
                <div className="text-neutral-900 font-mono font-bold text-sm mt-0.5">
                  {result.pcs} PCS
                </div>
              </div>

              <div>
                <div className="text-neutral-400 uppercase tracking-wider font-semibold">
                  Origin Transit Hub
                </div>
                <div className="text-neutral-900 font-medium text-sm mt-0.5">
                  {infoMap["Origin Hub"] || "Central Terminal"}
                </div>
              </div>

              <div>
                <div className="text-neutral-400 uppercase tracking-wider font-semibold">
                  Carrier / Shipper
                </div>
                <div className="text-neutral-900 font-medium text-sm mt-0.5">
                  {infoMap["Customer Company Name"] || "Fastcom Global Express"}
                </div>
              </div>
            </div>

            {/* Split Content: Timeline & Details */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Event Timeline */}
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-600" />
                    <span>Shipment History & Milestones</span>
                  </h3>
                  <span className="text-xs text-neutral-400">
                    {result.docket_events?.length || 0} Events Recorded
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                  {result.docket_events && result.docket_events.length > 0 ? (
                    result.docket_events.map((evt, idx) => {
                      const isLatest = idx === 0;
                      return (
                        <div key={evt.id || idx} className="relative group">
                          {/* Dot indicator */}
                          <div
                            className={`absolute -left-[29px] top-1 w-4 h-4 rounded-full border-2 border-white transition-transform ${
                              isLatest
                                ? "bg-emerald-500 scale-110 shadow-xs"
                                : "bg-neutral-400"
                            }`}
                          />

                          <div className="bg-white p-4 rounded-2xl border border-neutral-200/70 shadow-2xs group-hover:border-neutral-300 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <span
                                className={`text-[13px] font-bold tracking-tight uppercase ${
                                  isLatest ? "text-neutral-900" : "text-neutral-700"
                                }`}
                              >
                                {evt.event_description}
                              </span>

                              {evt.event_location && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                                  <MapPin className="w-3 h-3 text-neutral-500" />
                                  <span>{evt.event_location}</span>
                                </span>
                              )}
                            </div>

                            <div className="text-xs font-mono text-neutral-400">
                              {evt.event_at}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xs text-neutral-400">No events logged yet.</div>
                  )}
                </div>
              </div>

              {/* Right Column: Consignment & Shipper Details */}
              <div className="lg:col-span-5 space-y-5">
                <h3 className="text-base font-bold text-neutral-900 tracking-tight flex items-center gap-2 mb-4">
                  <Package className="w-4 h-4 text-neutral-600" />
                  <span>Consignment Information</span>
                </h3>

                {/* Shipper info card */}
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/70 shadow-2xs space-y-3">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Origin Shipper</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      {infoMap["Shipper Company"] || infoMap["Shipper Name"] || "Enterprise Client"}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {[infoMap["Shipper City"], infoMap["Shipper State"], infoMap["Shipper Country"]]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  </div>
                </div>

                {/* Consignee info card */}
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/70 shadow-2xs space-y-3">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Recipient / Consignee</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      {infoMap["Consignee Company"] || infoMap["Consignee Name"] || "Destination Depot"}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {[infoMap["Consignee City"], infoMap["Consignee State"], infoMap["Consignee Country"]]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  </div>
                </div>

                {/* Verification Assurance */}
                <div className="bg-neutral-900 text-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Verified Live AWB Stream
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    This shipment is tracked using GPS telematics and authenticated dispatch scans.
                    For delivery exceptions or proof-of-delivery (POD) queries, contact our dispatch desk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
