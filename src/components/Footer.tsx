import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, CalendarDays, Shield, Heart, ArrowUpRight, Flame } from "lucide-react";

interface FooterProps {
  onNavigate: (id: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    // Dynamic operational state computation (Business Hours: 08:00 AM - 08:00 PM)
    const checkOpenStatus = () => {
      const currentHour = new Date().getHours();
      setIsOpenNow(currentHour >= 8 && currentHour < 20);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const footerLinks = [
    { label: "Home", target: "hero" },
    { label: "Our Story", target: "about" },
    { label: "Booking", target: "services" },
    { label: "About", target: "chef" },
    { label: "Reviews", target: "reviews" },
  ];

  return (
    <footer id="contact" className="bg-neutral-50 text-neutral-800 pt-24 pb-12 px-6 md:px-12 block select-none border-t border-neutral-200">
      <div className="max-w-6xl mx-auto">
        {/* Main Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-200">
          
          {/* Column 1: Brand & Operational Status Indicator */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => onNavigate("hero")}
              className="flex items-center gap-2.5 font-display tracking-[0.25em] text-xs font-bold uppercase cursor-pointer text-black"
            >
              <img
                src="/logo1.jpg"
                alt="Rayyman Logo"
                className="w-9 h-9 rounded-full border border-black/20 object-cover"
              />
              <span>RAYYMAN CAR WASH</span>
            </button>

            <p className="text-xs text-neutral-500 leading-relaxed font-light font-sans max-w-sm">
              Your premier auto care house and car wash in Tandale. We provide professional car detailing, advanced window tinting, premium car care products, and custom exhaust sound modifications.
            </p>

            {/* Operations Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-neutral-300 bg-white">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-black">
                WE ARE OPEN 24/7
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-[10px] uppercase tracking-widest text-black font-bold font-mono">
              Home Page
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    className="text-xs text-neutral-500 hover:text-black transition-all text-left font-sans cursor-pointer flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity text-black" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Related Information & Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="font-display text-[10px] uppercase tracking-widest text-black font-bold font-mono">
              Related Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-500 font-sans">
              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-black font-display text-[10px] uppercase tracking-wider mb-0.5">OUR LOCATION</span>
                    <span>Morogoro Connect Rd</span>
                    <br />
                    <span>Tandale, Dar es Salaam</span>
                    <a
                      href="https://maps.app.goo.gl/jQdGKwTtzqJAhrrM9"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block text-[10px] font-mono text-black uppercase tracking-widest mt-1.5 hover:text-neutral-500 transition-colors font-bold"
                    >
                      Get Directions Map ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-black font-display text-[10px] uppercase tracking-wider mb-0.5">AVAILABLE HOURS</span>
                    <span>Mon - Sun: Open 24/7</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <Phone size={16} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-black font-display text-[10px] uppercase tracking-wider mb-0.5">CONTACTS</span>
                    <span>whatsapp: +255754051980</span>
                    <br />
                    <span>phone: +255754051980</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail size={16} className="text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-black font-display text-[10px] uppercase tracking-wider mb-0.5">EMAIL ADDRESS</span>
                    <span>info@rayymancarwash1.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono uppercase tracking-widest text-[#555555]">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 RAYYMAN CAR WASH CO. // ALL TRADEMARKS REGISTERED</span>
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={onOpenBooking} className="hover:text-black transition-colors cursor-pointer font-bold">
              Reserve A Slot Now
            </button>
            <span>•</span>
            <span className="normal-case">Made by JoLabs Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
