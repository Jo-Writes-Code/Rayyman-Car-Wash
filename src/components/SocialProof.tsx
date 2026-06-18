import { Star, MessageSquare, Instagram, Heart, MessageCircle, Eye } from "lucide-react";
import { CustomerReview } from "../types";
import { motion } from "motion/react";

interface SocialProofProps {
  reviews: CustomerReview[];
}

export default function SocialProof({ reviews }: SocialProofProps) {
  const instagramFeed = [
    {
      id: "ig_1",
      imageUrl: "/story1.jpg",
      statValue: "15",
      statType: "likes",
      commentsText: "2 comments",
      tag: "#WetLookFinish",
    },
    {
      id: "ig_2",
      imageUrl: "/story2.jpg",
      statValue: "251",
      statType: "views",
      commentsText: "2 comments",
      tag: "#CeramicQuartz",
    },
    {
      id: "ig_3",
      imageUrl: "/story3.jpg",
      statValue: "146",
      statType: "likes",
      commentsText: "and 0 comments",
      tag: "#RotaryJeweling",
    },
    {
      id: "ig_4",
      imageUrl: "/story4.jpg",
      statValue: "139",
      statType: "views",
      commentsText: "and 0 comments",
      tag: "#MirrorReflexion",
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-white text-neutral-800 px-6 md:px-12 border-b border-neutral-200 select-none">
      <div className="max-w-6xl mx-auto">
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
              Comments and Reviews
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-black uppercase leading-tight animate-none">
              Hivi Wateja Wanasemaje?
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-neutral-500 text-xs sm:text-sm font-sans font-light leading-relaxed">
              Karibu kwenye car house yetu kwa huduma bora za car wash Tandale. Kwenye store yetu tunazo equppment za kisasa na vifaa vya car car kwa usalama na urembo vya gari lako.
            </p>
          </div>
        </motion.div>

        {/* Reviews Deck Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex flex-col justify-between hover:border-black/50 transition-all shadow-none group relative overflow-hidden"
            >
              {/* Top Row: quote sign and verified indicator */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < rev.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-300"
                      }
                    />
                  ))}
                </div>
                {rev.verified && (
                  <span className="text-[9px] font-mono tracking-widest text-black uppercase flex items-center gap-1.5 bg-neutral-200 py-1 px-2.5 rounded border border-neutral-300 font-bold">
                    <MessageSquare size={11} /> Mteja
                  </span>
                )}
              </div>

              {/* Review Text */}
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-6 italic">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {/* Client metadata */}
              <div className="border-t border-neutral-200 pt-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      rev.id === "rev_1" ? "/review1.png" :
                      rev.id === "rev_2" ? "/review2.png" :
                      "/review3.png"
                    }
                    alt={rev.author}
                    className="w-10 h-10 rounded-full border border-neutral-200 object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-bold text-xs tracking-wider uppercase text-black">
                      {rev.author}
                    </h4>
                    <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">
                      Local Guide • {rev.packageType}
                    </div>
                  </div>
                </div>
                <div className="text-[9.5px] font-mono text-neutral-400 uppercase">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Simulated Instagram Integration Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-neutral-50 p-6 sm:p-10 rounded-xl border border-neutral-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 mb-8 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0 shadow-sm"
                style={{ background: "conic-gradient(from 225deg, #285AEB, #d6249f 30%, #fd5949 55%, #fdf497 95%, #285AEB)" }}
              >
                <Instagram size={20} />
              </div>
              <div className="text-left">
                <a
                  href="https://www.instagram.com/rayymancarwash1"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline text-black block"
                >
                  <h3 className="font-display font-bold text-[11px] tracking-widest uppercase font-mono">@rayymancarwash1</h3>
                </a>
                <p className="text-[9px] text-neutral-500 tracking-wide uppercase mt-0.5 font-mono">Live Intagram feed, Dar Es Salaam</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/rayymancarwash1"
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs uppercase tracking-widest font-sans font-bold text-black hover:text-neutral-600 transition-colors flex items-center gap-1.5"
            >
              <span>Follow Our Feed</span>
              <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {instagramFeed.map((pic) => (
              <div
                key={pic.id}
                className="group relative rounded-lg overflow-hidden aspect-square bg-neutral-150 border border-neutral-200 cursor-pointer"
              >
                {/* Image */}
                <img
                  src={pic.imageUrl}
                  alt={pic.tag}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-101"
                />

                {/* Cover overlay detailing likes and tag */}
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-5 text-white">
                  <div className="flex justify-around text-xs font-mono text-neutral-400 w-full">
                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                      {pic.statType === "likes" ? (
                        <Heart size={12} className="fill-current" />
                      ) : (
                        <Eye size={12} />
                      )}
                      <span>{pic.statValue} {pic.statType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle size={12} />
                      <span>{pic.commentsText}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
