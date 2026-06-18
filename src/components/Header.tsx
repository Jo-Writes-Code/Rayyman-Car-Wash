import { useState, useEffect } from "react";
import { Menu, X, Shield, Sparkles, BookOpen, Clock, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onOpenBooking, onNavigate, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Our Story", id: "about" },
    { label: "Booking", id: "services" },
    { label: "About", id: "chef" },
    { label: "Reviews", id: "reviews" },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3 shadow-sm text-black"
            : "bg-transparent py-5 text-neutral-800"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("hero")}
            className={`flex items-center gap-2.5 font-display tracking-[0.25em] text-xs font-bold uppercase transition-transform hover:scale-[1.01] cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            <img
              src="/logo1.jpg"
              alt="Rayyman Logo"
              className="w-9 h-9 rounded-full border border-black/20 object-cover"
            />
            <span>RAYYMAN CAR WASH</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <ul className="flex items-center space-x-10">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative text-[11px] uppercase tracking-widest font-mono font-bold transition-colors cursor-pointer ${
                      isScrolled
                        ? activeSection === item.id
                          ? "text-black opacity-100"
                          : "text-neutral-500 hover:text-black hover:opacity-100"
                        : activeSection === item.id
                        ? "text-white opacity-100"
                        : "text-neutral-400 hover:text-white hover:opacity-100"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeDot"
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full ${
                          isScrolled ? "bg-black" : "bg-white"
                        }`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <button
              id="cta-book-header"
              onClick={onOpenBooking}
              className="text-xs tracking-wider font-sans uppercase font-black px-6 py-2.5 rounded-md border border-black bg-black text-white hover:bg-neutral-850 hover:border-neutral-850 transition-all duration-300 cursor-pointer"
            >
              BOOK NOW
            </button>
          </nav>

          {/* Handheld/Mobile triggers */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="text-[10px] tracking-wider font-sans uppercase font-black px-4 py-2 rounded-md border border-black bg-black text-white cursor-pointer"
            >
              BOOK NOW
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 hover:text-neutral-600 transition-colors cursor-pointer text-black"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-white text-black z-40 load-mobile-menu flex flex-col justify-between p-8 pt-28 border-b-2 border-neutral-200"
          >
            <ul className="space-y-6 md:space-y-8 max-w-sm mx-auto w-full text-center">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="font-display text-lg sm:text-xl tracking-widest uppercase font-bold hover:text-neutral-500 transition-colors"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4"
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-black text-white tracking-wider text-xs uppercase py-4 rounded-md font-black border border-black transition-all hover:bg-neutral-800"
                >
                  BOOK NOW
                </button>
              </motion.li>
            </ul>

            <div className="border-t border-neutral-200 pt-6 text-center text-neutral-500 max-w-sm mx-auto w-full space-y-3 font-sans text-xs">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-[9px] uppercase tracking-widest font-mono">
                <span className="flex items-center gap-1.5 text-neutral-800">
                  <Clock size={11} /> Mon - Sun / 8AM - 8PM
                </span>
                <span className="flex items-center gap-1.5 text-neutral-800">
                  <PhoneCall size={11} /> 020 7946 0192
                </span>
              </div>
              <p className="opacity-60 text-[8px] font-mono">
                RAYYMAN CAR WASH CO. © 2026. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
