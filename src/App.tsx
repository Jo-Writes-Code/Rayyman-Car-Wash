import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";

import ServicesMenu from "./components/ServicesMenu";
import MasterDetailer from "./components/MasterDetailer";
import SocialProof from "./components/SocialProof";
import BookingModal from "./components/BookingModal";
import Footer from "./components/Footer";

import { DetailingPackage, CustomAddOn, CustomerReview, BookingRecord } from "./types";
import { ShieldCheck, Sparkles, Star, MapPin, Check, Clock } from "lucide-react";

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Selection pre-fill parameters for the booking modal
  const [modalPrePackId, setModalPrePackId] = useState<string | undefined>(undefined);
  const [modalPreAddOnIds, setModalPreAddOnIds] = useState<string[]>([]);

  // Simulated notification toast when a user completes a booking
  const [notification, setNotification] = useState<string | null>(null);

  // 1. Signature Detailing Packages Data Collection
  const packages: DetailingPackage[] = [
    {
      id: "pack_1",
      name: "Quick Gloss Refresh",
      price: 25000,
      duration: "1.5 Hours",
      description: "A quick refresh wash for gloss renewal.",
      icon: "Sparkles",
      features: [
        "Multi-Bucket Scratch-Free hand Wash",
        "Acid Fallout chemical Iron De-Con",
        "Air-Blower crevice detailing dry method",
        "High hydrophobic Sio2 gloss Spray Seal",
        "Fine alloys & wheel arch deep clean"
      ]
    },
    {
      id: "pack_2",
      name: "Car Wash",
      price: 65000,
      duration: "4.5 Hours",
      description: "Our signature car wash package.",
      icon: "Flame",
      popular: true,
      features: [
        "Advanced Mud safe Snow Foam bath",
        "Stage 1 Rotary machine Correction polish",
        "Steam extraction of deep interior cabins",
        "Authentic carnauba protective paint wax",
        "Exhaust chromium alignment & metal glaze"
      ]
    },
    {
      id: "pack_3",
      name: "Elite Ceramic Guard",
      price: 120000,
      duration: "8.5 Hours",
      description: "Premium ceramic guard and ultimate paint wash.",
      icon: "Award",
      features: [
        "Strict Stage 2 Clear Coat paint correction",
        "Double-Layer covalent Gtechniq 9H Ceramic Seal",
        "Meticulous engine chamber fine steam prep",
        "Sio2 Hydrophobic glass windscreen shield",
        "Upholstery leather protective shielding"
      ]
    }
  ];

  // 2. Focused Custom Detailing Addon Data Collection
  const addOns: CustomAddOn[] = [
    {
      id: "add_1",
      name: "Car Sound Change/ Muffler delete",
      price: 215000,
      description: "Professional exhaust sound modification and muffler delete for deep sports tone."
    },
    {
      id: "add_2",
      name: "Tire Change",
      price: 150000,
      description: "Complete tire replacement with alignment and balancing."
    },
    {
      id: "add_3",
      name: "Part Renewal",
      price: 45000,
      description: "Premium body or engine parts renewal and detailing."
    },
    {
      id: "add_4",
      name: "Interior Wash",
      price: 15000,
      description: "Thorough vacuuming, sanitization, and deep steam wash of car interior."
    }
  ];

  // 3. Customer Testimonial Data Collection
  const reviews: CustomerReview[] = [
    {
      id: "rev_1",
      author: "Batholomeo Thomas",
      rating: 5,
      date: "12 June 2026",
      comment: "Huduma ni nzuri naipenda sana.",
      packageType: "Car Wash",
      verified: true
    },
    {
      id: "rev_2",
      author: "Peter J Temu",
      rating: 5,
      date: "04 June 2026",
      comment: "Cool",
      packageType: "Tire Change",
      verified: true
    },
    {
      id: "rev_3",
      author: "Peter Mawole",
      rating: 5,
      date: "28 May 2026",
      comment: "Wash your car at your own time of convinience, 24 hour service.",
      packageType: "Interior Wash",
      verified: true
    }
  ];

  // 4. Smooth Section Scrolling Navigation
  const handleNavigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 5. Selecting Package from Service Menu to directly pre-fill reservation modal
  const handleSelectPackageForBooking = (packageId: string, customAddOnIds: string[]) => {
    setModalPrePackId(packageId);
    setModalPreAddOnIds(customAddOnIds);
    setIsBookingOpen(true);
  };

  // 6. Trigger specific Booking successes
  const handleBookingSuccess = (newRecord: BookingRecord) => {
    setNotification(`Successfully Reserved! Reference Code: ${newRecord.id} on ${newRecord.date}`);
    setTimeout(() => {
      setNotification(null);
    }, 8000);
  };

  // 7. Track Scroll positions to update Nav indicators appropriately
  useEffect(() => {
    const handleScrollTracking = () => {
      const sections = ["hero", "about", "services", "chef", "reviews"];
      const offsets = sections.map((s) => {
        const el = document.getElementById(s);
        return {
          id: s,
          offset: el ? Math.abs(el.getBoundingClientRect().top) : Infinity,
        };
      });

      const closest = offsets.reduce((prev, curr) =>
        curr.offset < prev.offset ? curr : prev
      );

      if (closest.offset < 300) {
        setActiveSection(closest.id);
      }
    };

    window.addEventListener("scroll", handleScrollTracking);
    return () => window.removeEventListener("scroll", handleScrollTracking);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans transition-opacity duration-300 antialiased selection:bg-black selection:text-white">
      {/* 1. Introductory Animated Preloader Screen */}
      <Preloader onComplete={() => setHasLoaded(true)} />

      {hasLoaded && (
        <div className="flex flex-col min-h-screen">
          {/* 2. Brand Nav Header */}
          <Header
            onOpenBooking={() => {
              setModalPrePackId(undefined);
              setModalPreAddOnIds([]);
              setIsBookingOpen(true);
            }}
            onNavigate={handleNavigateToSection}
            activeSection={activeSection}
          />

          {/* 3. Main Stage Content */}
          <main className="flex-grow">
            {/* Cinematic Hero Title Panel */}
            <Hero
              onOpenBooking={() => {
                setModalPrePackId(undefined);
                setModalPreAddOnIds([]);
                setIsBookingOpen(true);
              }}
              onExplore={() => handleNavigateToSection("services")}
            />

            {/* About Story Column Section */}
            <section id="about" className="py-24 px-6 md:px-12 bg-white text-neutral-800 border-b border-neutral-100 select-none">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* Left Column: Headings & Descriptions (Spans 8 cols on LG screens) */}
                  <div className="lg:col-span-8 space-y-6 text-left">
                    <div className="space-y-3">
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 block">
                        Best in Tandale
                      </span>
                      <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight uppercase">
                        Pokea Huduma Kali Kwa Bei Nzuri.
                      </h2>
                    </div>
                    
                    <div className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed font-sans space-y-4">
                      <p>
                        At RAYYAN CAR WASH, we are your premier CAR SERVICE & CAR ACCESSORIES hub. Operating as a full AUTO CARE HOUSE open 24/7, we provide premium services including Car Care Products, Car Sound setups, Spot Rim cleaning, and professional window Tint. Reach out to us anytime via Call/WhatsApp.
                      </p>
                      <p>
                        Kupitia RAYYAN CAR WASH, tunatoa huduma bora za matengenezo na vifaa vya gari. Tukiwa kama kituo cha kisasa cha utunzaji wa magari kinachofanya kazi saa 24 kila siku, tunatoa huduma za kuaminika kama bidhaa za usafi wa gari, mifumo ya sauti, usafi wa rim, na kuweka filamu za vioo. Wasiliana nasi wakati wowote kwa Simu/WhatsApp.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Contacts Box Card (Spans 4 cols on LG screens) */}
                  <div className="lg:col-span-4 w-full bg-neutral-50 p-6 sm:p-8 rounded-lg border border-neutral-200 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-sans font-black px-2.5 py-1 rounded uppercase tracking-wide">
                          <Clock size={11} /> Open 24/7
                        </span>
                        <span className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider font-mono">
                          Auto Care House
                        </span>
                      </div>
                      
                      <div className="h-[1px] bg-neutral-200" />
                      
                      <div className="text-xs sm:text-sm text-neutral-600 space-y-4 font-sans leading-relaxed font-semibold">
                        <p className="flex flex-col gap-0.5 text-left">
                          <span className="font-black text-black uppercase font-sans text-[10px] tracking-wider block">Instagram:</span>
                          <a 
                            href="https://www.instagram.com/rayyancarwash1" 
                            target="_blank" 
                            rel="noreferrer noopener" 
                            className="text-neutral-500 hover:text-black transition-colors break-all no-underline font-normal"
                          >
                            @rayyancarwash1
                          </a>
                        </p>
                        <p className="flex flex-col gap-0.5 text-left">
                          <span className="font-black text-black uppercase font-sans text-[10px] tracking-wider block">WhatsApp/Phone:</span>
                          <a 
                            href="https://wa.me/255754051980" 
                            className="text-neutral-500 hover:text-black transition-colors break-all no-underline font-normal"
                          >
                            +255754051980
                          </a>
                        </p>
                        <p className="flex flex-col gap-0.5 text-left">
                          <span className="font-black text-black uppercase font-sans text-[10px] tracking-wider block">Location:</span>
                          <span className="text-neutral-500 font-normal">
                            665R+63V, Morogoro Connect Rd, Dar es Salaam
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavigateToSection("services")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs uppercase font-black py-3 rounded-md transition-all text-center cursor-pointer shadow-sm mt-4"
                    >
                      Wash Your Car
                    </button>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Interactive Packages Directory & Dynamic Pricing Calculator */}
            <ServicesMenu
              packages={packages}
              addOns={addOns}
              onSelectPackageForBooking={handleSelectPackageForBooking}
            />



            {/* Master Technician Biographies (Translated Restaurant Chef Section) */}
            <MasterDetailer />

            {/* Verified Reviews and simulated Instagram panels */}
            <SocialProof reviews={reviews} />
          </main>

          {/* 4. Contact Footer with interactive Operational Open state ticker */}
          <Footer
            onNavigate={handleNavigateToSection}
            onOpenBooking={() => {
              setModalPrePackId(undefined);
              setModalPreAddOnIds([]);
              setIsBookingOpen(true);
            }}
          />

          {/* 5. Complete Booking Reservation Overlay Modal */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            packages={packages}
            addOns={addOns}
            initialSelectedPackageId={modalPrePackId}
            initialSelectedAddOnIds={modalPreAddOnIds}
            onBookingSuccess={handleBookingSuccess}
          />

          {/* Persistent Dynamic Notification Toast */}
          {notification && (
            <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white border border-brand-cyan/20 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3.5 max-w-sm">
              <span className="w-6 h-6 rounded-full bg-brand-cyan flex items-center justify-center text-black shrink-0 font-bold text-xs">
                ✓
              </span>
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-brand-cyan font-bold">SLOT ASSIGNED</p>
                <p className="text-xs text-white mt-0.5">{notification}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-xs text-neutral-400 hover:text-white ml-auto shrink-0 font-bold"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
