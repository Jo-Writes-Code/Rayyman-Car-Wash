import { useState, useRef, MouseEvent, TouchEvent } from "react";
import { Layers, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function GallerySlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const beforeImage = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200"; // Dirty mud-covered sports car
  const afterImage = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200"; // Gleaming clean black sports car detailing

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleStart = () => {
    isDragging.current = true;
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  const activeProjects = [
    {
      title: "AMV8 Volante Ceramic Guard",
      sub: "Technical Correction & Stage 3 Coating",
      img: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
      stats: "9.5 Hours Meticulous Polish",
    },
    {
      title: "Porsche GT3 RS Restoration",
      sub: "Menzerna Polish & Leather Hydration",
      img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600",
      stats: "Swissvax Crystal Rock Protect",
    },
    {
      title: "Range Rover Autobiog Gloss wash",
      sub: "Iron Decontamination & Clay Bar Treatment",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
      stats: "Deep Sio2 Spray Overcoat",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-white text-neutral-800 px-6 md:px-12 border-b border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Headings */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16"
        >
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 block mb-3">
              01 // The Transformation Lab
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-black uppercase animate-none">
              A Witness to Flawless Precision
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light font-sans">
              We focus on absolute surface sanity. Slide the partition to witness how clay decontamination, stage 2 paint correction, and double-layer ceramic coatings strip years of chemical oxidation to reveal factory-spec optical gloss.
            </p>
          </div>
        </motion.div>

        {/* Before / After Slider Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24"
        >
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              className="relative w-full h-[320px] sm:h-[450px] overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 cursor-ew-resize select-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              onMouseUp={handleEnd}
              onTouchEnd={handleEnd}
              onMouseLeave={handleEnd}
            >
              {/* After image (Base layer, fully visible) */}
              <img
                src={afterImage}
                alt="After Professional Detailing"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              />
              <div className="absolute right-4 bottom-4 bg-black text-white px-3.5 py-1.5 rounded text-[9px] font-mono tracking-wider font-bold z-10 select-none pointer-events-none border border-neutral-800 flex items-center gap-1.5 uppercase">
                <Sparkles size={11} className="text-white shrink-0" /> AFTER APEX TREATMENT
              </div>

              {/* Before image (Cover layer, clipped) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={beforeImage}
                  alt="Before Detailing Wash"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none filter saturate-[0.8] select-none"
                />
                <div className="absolute left-4 bottom-4 bg-red-600 text-white px-3.5 py-1.5 rounded text-[9px] font-mono tracking-wider font-bold z-10 pointer-events-none border border-red-700 uppercase">
                  BEFORE: RAW ROAD GRIME
                </div>
              </div>

              {/* Slider Drag Bar line indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-black cursor-ew-resize z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black text-white border-2 border-black flex items-center justify-center shadow-none cursor-ew-resize select-none transition-transform z-30">
                  <div className="flex gap-0.5 pointer-events-none">
                    <ChevronLeft size={14} className="stroke-[3]" />
                    <ChevronRight size={14} className="stroke-[3]" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Guide microcopy */}
            <div className="flex gap-2 items-center justify-center text-[9px] text-neutral-400 font-mono tracking-widest uppercase mt-4">
              <Layers size={11} className="text-black" />
              <span>Drag or Touch Slider Left / Right to Compare</span>
            </div>
          </div>

          {/* Key Detailing Pillars */}
          <div className="lg:col-span-5 space-y-8 select-none">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-black">
              Three Pillars of Surface Sanity
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-neutral-100 border border-neutral-200 text-black flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-display text-[11px] font-bold tracking-wider uppercase text-black">Chemical Decontamination</h4>
                  <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed font-sans">
                    We melt embedded metallic iron filings and acidic fallout with specialty acid-neutral pH spray, followed by non-abrasive clay bar smoothing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-neutral-100 border border-neutral-200 text-black flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-display text-[11px] font-bold tracking-wider uppercase text-black">Rotary Jewel Gloss polishing</h4>
                  <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed font-sans">
                    Utilizing Rupes dual-action polishers, we refine clear coat micrometres with precision compound pastes to physically shave paint swirl-marks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-neutral-100 border border-neutral-200 text-black flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-display text-[11px] font-bold tracking-wider uppercase text-black">Quartz Ceramic Envelope</h4>
                  <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed font-sans">
                    We physically coat clearcoat with covalent 9H quartz liquid crystal, leaving high hydrophobic water repellency and unmatched paint depth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Showcase Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-t border-neutral-200 pt-12 mb-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
              RECENTLY POLISHED FROM OUT OF APEX BAY
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeProjects.map((project, index) => (
              <div
                key={index}
                className="group select-none cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg border border-neutral-200 aspect-video relative mb-4">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-101"
                  />
                  <div className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 rounded text-[8px] font-mono tracking-widest uppercase">
                    {project.stats}
                  </div>
                </div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-black group-hover:text-neutral-500 transition-colors">
                  {project.title}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-1 font-sans">
                  {project.sub}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
