import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Elegant incremental progress simulation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Allow small delay for completion look
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 500); // Trigger complete after fade out
          }, 400);
          return 100;
        }
        const remains = 100 - prev;
        const increment = Math.max(1, Math.floor(Math.random() * remains * 0.3) + 3);
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="site-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-brand-coal text-brand-cream z-50 flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Logo element at top left */}
          <div className="flex justify-between items-start">
            <div className="font-display tracking-[0.3em] text-xs font-semibold uppercase text-brand-slate">
              RAYYMAN CAR WASH
            </div>
            <div className="font-mono text-xs text-brand-slate">
              EDITION 2026
            </div>
          </div>

          {/* Primary dynamic centered display text */}
          <div className="text-center my-auto flex flex-col items-center">
            <div className="flex gap-3 md:gap-6 items-center mb-6 overflow-hidden">
              {["R", "A", "Y", "Y", "M", "A", "N"].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="font-display text-4xl sm:text-6xl md:text-8xl font-bold tracking-wider"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-sans text-xs sm:text-sm tracking-[0.15em] uppercase text-brand-cream max-w-md"
            >
              Get your car wash for a fraction of the price
            </motion.div>
          </div>

          {/* Bottom section with progress slider and details */}
          <div className="space-y-4">
            <div className="flex justify-between items-end text-xs font-mono text-brand-slate">
              <div className="motion-safe:animate-pulse">Loading web page...</div>
              <div className="text-xl font-medium text-brand-cream">{progress}%</div>
            </div>

            {/* Premium progress bar line */}
            <div className="h-[2px] w-full bg-brand-coal border border-neutral-800 relative overflow-hidden">
              <div
                className="h-full bg-brand-cream transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[10px] text-brand-slate uppercase tracking-wider font-mono">
              <span>Auto Care House</span>
              <span>Morogoro Connect Rd, Dar Es Salaam, Tanzania</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
