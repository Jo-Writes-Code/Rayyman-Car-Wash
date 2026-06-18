import { useState } from "react";
import { Check, Calculator, ArrowRight, HelpCircle } from "lucide-react";
import { DetailingPackage, CustomAddOn } from "../types";
import { motion } from "motion/react";

interface ServicesMenuProps {
  packages: DetailingPackage[];
  addOns: CustomAddOn[];
  onSelectPackageForBooking: (packageId: string, customAddOnIds: string[]) => void;
}

export default function ServicesMenu({ packages, addOns, onSelectPackageForBooking }: ServicesMenuProps) {
  const [selectedPackId, setSelectedPackId] = useState<string>(packages[1].id); // default to Car Wash
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [isBaseRemoved, setIsBaseRemoved] = useState<boolean>(false);

  const activePackage = packages.find((p) => p.id === selectedPackId) || packages[1];

  // Helper toggle add-on
  const handleToggleAddOn = (addOnId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const basePrice = isBaseRemoved ? 0 : activePackage.price;
  const selectedAddOnsCost = addOns
    .filter((addon) => selectedAddOnIds.includes(addon.id))
    .reduce((sum, item) => sum + item.price, 0);

  const totalPrice = basePrice + selectedAddOnsCost;

  return (
    <section id="services" className="py-24 bg-neutral-50 text-neutral-900 px-6 md:px-12 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto">
        {/* Headings */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-8 text-left"
        >
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
            Booking and Prices
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mt-4 font-light max-w-xl">
            Get premium auto services at the best prices in Tandale. Contact us today via Call/WhatsApp to book your service!
          </p>
        </motion.div>

        {/* STEP 2 & CALCULATOR: Dynamic Supplement & Live Checkout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Supplement Treatment Multi-select */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addOns.map((addon) => {
                const isChecked = selectedAddOnIds.includes(addon.id);
                // Map background images
                const addonImages: Record<string, string> = {
                  "add_1": "/car-sound2.jpg",
                  "add_2": "/tire.jpg",
                  "add_3": "/head-light.jpg",
                  "add_4": "/interior.jpg"
                };
                const addonImage = addonImages[addon.id] || "";

                return (
                  <div
                    key={addon.id}
                    onClick={() => handleToggleAddOn(addon.id)}
                    className={`relative rounded-md border transition-all cursor-pointer flex flex-col justify-between overflow-hidden h-[180px] ${
                      isChecked
                        ? "bg-blue-50/20 border-blue-600 text-blue-900"
                        : "bg-white border-neutral-200 text-neutral-500 hover:border-blue-400 hover:text-black"
                    }`}
                  >
                    {/* Heading wrapper that stops at line divider */}
                    <div className="relative p-3.5 px-4 flex items-start justify-between min-h-[56px] overflow-hidden shrink-0">
                      {addonImage && (
                        <div 
                          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.55]"
                          style={{ backgroundImage: `url(${addonImage})` }}
                        />
                      )}
                      
                      <div className="relative z-10 text-[14.5px] font-display font-black tracking-wide uppercase text-black max-w-[80%] leading-tight">
                        {addon.name}
                      </div>

                      <div
                        className={`w-5 h-5 rounded-sm flex items-center justify-center border transition-all shrink-0 relative z-10 ${
                          isChecked ? "bg-black border-black text-white" : "border-neutral-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check size={12} className="stroke-[3]" />}
                      </div>
                    </div>

                    {/* Divider between heading and sub heading */}
                    <div className="h-[1px] bg-neutral-200 w-full shrink-0" />

                    {/* Description & Price Section */}
                    <div className="p-4 pt-2.5 px-4 flex-grow flex flex-col justify-between">
                      <p className="text-[11.5px] text-neutral-600 leading-normal font-normal line-clamp-2">
                        {addon.description}
                      </p>

                      <div className="font-mono text-[10.5px] font-bold text-black border-t border-dashed border-neutral-200 pt-2 mt-2 text-right">
                        +TSh {addon.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Premium Order Calculator Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-blue-600 rounded-lg p-6 flex flex-col justify-between h-[376px] shadow-[0_15px_35px_rgba(37,99,235,0.18)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:border-blue-700 transition-all duration-300">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-100 shrink-0">
                <div className="flex items-center gap-2">
                  <Calculator size={14} className="text-blue-600" />
                  <h3 className="font-display font-bold text-[10px] uppercase tracking-widest text-blue-600 font-mono">
                    BOOKING TOTAL
                  </h3>
                </div>
                <HelpCircle size={13} className="text-neutral-400 cursor-help" title="Configured dynamically according to requirements" />
              </div>

              {/* Order composition list */}
              <div className="relative bg-neutral-50 rounded-md border border-neutral-100 overflow-hidden flex flex-col justify-between h-[180px] shrink-0">
                
                {/* Base Tier Selected Section with Background Image */}
                <div className="relative p-3.5 px-4 overflow-hidden shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.55]"
                    style={{ backgroundImage: `url(/car-wash.jpg)` }}
                  />

                  <div className="relative z-10 flex justify-between items-center text-xs">
                    <div className="text-black uppercase font-display text-[11px] font-extrabold tracking-wider">
                      Base Tier Selected
                    </div>
                    {isBaseRemoved ? (
                      <button 
                        onClick={() => setIsBaseRemoved(false)}
                        className="text-[10px] font-sans font-black text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                      >
                        + ADD CAR WASH (TSh 65,000)
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 font-display text-[11px] font-extrabold uppercase text-black">
                        <span>{activePackage.name}</span>
                        <button
                          onClick={() => setIsBaseRemoved(true)}
                          className="text-red-650 hover:text-red-800 font-bold transition-colors cursor-pointer text-xs w-4 h-4 flex items-center justify-center rounded-full bg-red-100 border border-red-200 leading-none"
                          title="Remove base tier"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Line divider between base tier selected and base package price */}
                <div className="h-[1px] bg-neutral-200 w-full shrink-0" />

                <div className="p-4 pt-2.5 px-4 space-y-2 relative z-10 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    {!isBaseRemoved && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500 uppercase font-mono text-[9px] tracking-wider">Base Package Price</span>
                        <span className="font-mono font-bold text-black text-[13.5px]">TSh {activePackage.price.toLocaleString()}</span>
                      </div>
                    )}

                    {selectedAddOnIds.length > 0 && (
                      <div className="flex justify-between items-center text-xs text-neutral-600 border-t border-dashed border-neutral-200 pt-2">
                        <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">Custom Supplements ({selectedAddOnIds.length})</div>
                        <div className="font-mono font-bold text-black text-[13.5px]">
                          +TSh {selectedAddOnsCost.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Total section (at the bottom of this container) */}
                  <div className="border-t border-dashed border-neutral-200 pt-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[9px] tracking-widest font-mono text-blue-600/80 uppercase leading-none">TOTAL LOCKED IN PRICE</div>
                        <span className="text-[8px] uppercase tracking-widest font-mono text-blue-600/50 block mt-1.5">[ VAT Included ]</span>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-3xl font-extrabold text-emerald-600 tracking-tight leading-none">
                          TSh {totalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout trigger */}
              <button
                onClick={() => onSelectPackageForBooking(isBaseRemoved ? "none" : selectedPackId, selectedAddOnIds)}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-4 rounded-md font-sans tracking-wider text-xs uppercase font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/35 hover:shadow-xl hover:shadow-blue-600/50 hover:-translate-y-0.5 active:translate-y-0 duration-200 shrink-0"
              >
                <span>BOOK NOW</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
