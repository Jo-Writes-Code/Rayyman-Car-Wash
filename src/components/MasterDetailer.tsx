import { CheckCircle2 } from "lucide-react";
import { TeamMember } from "../types";
import { motion } from "motion/react";

export default function MasterDetailer() {
  const masterGroomer: TeamMember = {
    name: "Rayyman Mechanic",
    role: "Founder",
    imageUrl: "/pic1.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    specialty: "Licensed Mechanic & Experienced Car Wash",
  };

  const certifications = [
    { title: "Licensed Mechanic", issuer: "Certified Technician" },
    { title: "Experienced Car Wash", issuer: "10 plus years" },
  ];

  return (
    <section id="chef" className="py-24 bg-neutral-50 text-neutral-800 px-6 md:px-12 border-b border-neutral-200 select-none">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Chef/Groomer Photo Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative group mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Outer double borders styling */}
              <div className="absolute inset-0 border border-neutral-300 rounded-xl transform translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 duration-500" />
              <div className="relative rounded-xl overflow-hidden border border-neutral-200 shadow-none aspect-[3/4] bg-neutral-200">
                <img
                  src={masterGroomer.imageUrl}
                  alt={masterGroomer.name}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">

            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
                {masterGroomer.name}
              </h2>
              <div className="text-xs uppercase tracking-widest font-mono text-neutral-500 mt-1 font-bold">
                {masterGroomer.role}
              </div>
            </div>

            <div className="h-[1px] bg-neutral-200" />

            {/* Chef/Detailer Bio text */}
            <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
              {masterGroomer.bio}
            </p>

            <blockquote className="border-l-2 border-black pl-4 py-1 italic font-serif text-neutral-600 text-xs sm:text-sm">
              &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.&rdquo;
            </blockquote>

            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((certs, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white border border-neutral-200 rounded-md flex items-start gap-2"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-black">
                        {certs.title}
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">
                        {certs.issuer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
