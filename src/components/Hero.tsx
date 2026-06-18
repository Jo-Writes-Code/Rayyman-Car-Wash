import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, Star } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  onExplore: () => void;
}

// Order of priority: Play user's uploaded videos in the public folder. No external fallback URLs.
const SHOWCASE_VIDEOS = [
  "/car-video1.mp4",
  "/car-video2.mp4",
  "/car-video3.mp4"
];

export default function Hero({ onOpenBooking, onExplore }: HeroProps) {
  // Ultra-precise luxury background image for depth and prompt fallback
  const backgroundImageUrl = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop";

  const [activeVideoUrl, setActiveVideoUrl] = useState<string>(SHOWCASE_VIDEOS[0]);
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [videoHasError, setVideoHasError] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setActiveVideoUrl(SHOWCASE_VIDEOS[videoIndex]);
    setVideoLoaded(false);
  }, [videoIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented or postponed:", err);
      });
    }
  }, [activeVideoUrl]);

  // Try subsequent local filenames. If none work, we gracefully fade back and show the rich image underlay.
  const handleVideoError = () => {
    if (videoIndex < SHOWCASE_VIDEOS.length - 1) {
      setVideoIndex((prev) => prev + 1);
    } else {
      setVideoHasError(true);
    }
  };

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
  };

  const handleVideoEnded = () => {
    setVideoIndex((prev) => (prev + 1) % SHOWCASE_VIDEOS.length);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] bg-neutral-950 overflow-hidden flex flex-col justify-between pt-32 pb-20 text-white border-b border-neutral-900"
    >
      {/* Background Cinematic Video with Dark Dimmer Overlay */}
      <div className="absolute inset-0 z-0 select-none bg-neutral-950">
        {/* Base Fallback Image */}
        <img
          src={backgroundImageUrl}
          alt="Premium Car Wash Fallback"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.08] opacity-80"
        />

        {/* Video stream overlaid on top, only fading in when verified working and client can play */}
        {!videoHasError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            key={activeVideoUrl} // Forces video element replacement on path rotation
            onError={handleVideoError}
            onCanPlay={handleVideoCanPlay}
            onEnded={handleVideoEnded}
            className={`absolute inset-0 w-full h-full object-cover object-center scale-[1.08] transition-all duration-1000 pointer-events-none ${videoLoaded ? "opacity-80" : "opacity-0"
              }`}
          >
            {activeVideoUrl && <source src={activeVideoUrl} type="video/mp4" />}
          </video>
        )}

        {/* Darkening Overlay for maximum typographic contrast */}
        <div className="absolute inset-0 bg-neutral-950/65 z-1" />
      </div>

      {/* Central Content Call to Action */}
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 z-10 flex-grow flex flex-col justify-between">
        <div className="my-auto text-left max-w-4xl flex flex-col items-start pt-8 pb-20">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex -space-x-3">
              <img className="w-8 h-8 rounded-full object-cover" src="/pfp1.png" alt="Reviewer 1" />
              <img className="w-8 h-8 rounded-full object-cover" src="/pfp2.png" alt="Reviewer 2" />
              <img className="w-8 h-8 rounded-full object-cover" src="/pfp3.png" alt="Reviewer 3" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-[9px] text-neutral-100 tracking-[0.2em] uppercase font-mono font-medium"
            >
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span>4.7 Star Rating / 45+ Reviews</span>
            </motion.div>

            <div className="flex items-center gap-1.5 pl-1">
              {/* Google Icon Link */}
              <a
                href="https://maps.app.goo.gl/jQdGKwTtzqJAhrrM9"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-transform hover:scale-110 flex items-center justify-center"
                aria-label="Google Maps"
              >
                <svg className="w-4 h-4 text-[#4285F4] hover:text-white transition-colors cursor-pointer fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.5a5.99 5.99 0 0 1 5.99-6.025c1.52 0 2.97.55 4.1 1.55l3.15-3.15A9.95 9.95 0 0 0 13.99 2c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.73 0 10.2-4.04 10.2-9.9 0-.6-.06-1.2-.18-1.815H12.24Z" />
                </svg>
              </a>
              {/* Instagram Icon Link */}
              <a
                href="https://www.instagram.com/rayymancarwash1"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-transform hover:scale-110 flex items-center justify-center"
                aria-label="Instagram Page"
              >
                <svg className="w-4 h-4 cursor-pointer fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <defs>
                    <radialGradient id="insta-hero-gradient" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="5%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#insta-hero-gradient)" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#insta-hero-gradient)" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#insta-hero-gradient)" />
                </svg>
              </a>
              {/* WhatsApp Icon Link */}
              <a
                href="https://wa.me/255754051980"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-transform hover:scale-110 flex items-center justify-center"
                aria-label="WhatsApp Chat"
              >
                <svg className="w-4 h-4 text-[#25D366] hover:text-white transition-colors cursor-pointer fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white uppercase"
          >
            Wash your car,<br />
            <span className="text-neutral-300 block sm:inline">Fraction of the price.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-xs sm:text-sm text-neutral-200 font-light tracking-wide max-w-xl mb-12 leading-relaxed"
          >
            The best car wash and auto care in Tandale, from premium washes and tire changes to custom exhaust sound and window tinting.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full"
          >
            <button
              onClick={onOpenBooking}
              className="rounded-md bg-white text-black hover:bg-neutral-100 transition-all font-sans tracking-wide text-sm uppercase font-black px-12 py-5 cursor-pointer text-center sm:w-auto shadow-md"
            >
              BOOK NOW
            </button>
          </motion.div>
        </div>

        {/* Spacer to replace deleted bottom section of White City Sanctuary */}
        <div className="relative w-full h-8" />
      </div>

      {/* Scroll indicator, just the icon, slightly larger, centered bottom, instantly visible and bouncing */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={onExplore}
          className="transition-all hover:scale-110 cursor-pointer"
          aria-label="Scroll to discover"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-lg"
          >
            <ArrowDown size={18} className="text-white" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
