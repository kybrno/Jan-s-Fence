/*
 * Testimonials - Jan's Fence
 * Design: Dark charcoal background, white text, rust star accents
 * Horizontal scroll on mobile, 3-column grid on desktop
 */

import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Tom Hendricks",
    location: "Austin, TX",
    rating: 5,
    text: "Jan's Fence transformed our backyard completely. The cedar privacy fence they installed is absolutely stunning — perfect craftsmanship, clean lines, and they finished on time. The team was professional from start to finish.",
    project: "Cedar Privacy Fence",
    initials: "SH",
  },
  {
    name: "Marcus Johnson",
    location: "Round Rock, TX",
    rating: 5,
    text: "I got three quotes and Jan's Fence wasn't the cheapest, but they were clearly the most professional. The ornamental iron fence they installed looks like it belongs on a magazine cover. Worth every penny.",
    project: "Ornamental Iron",
    initials: "MJ",
  },
  {
    name: "Riverside Business Park",
    location: "Cedar Park, TX",
    rating: 5,
    text: "We hired Jan's Fence for a commercial perimeter fence. They coordinated perfectly with our timeline, stayed on budget, and the quality of the installation exceeded our specs.",
    project: "Commercial Chain-Link",
    initials: "RB",
  },
  {
    name: "Jennifer & Paul Okafor",
    location: "Georgetown, TX",
    rating: 5,
    text: "The booking process was so easy — I scheduled a consultation online, got a quote the same day, and they started work within the week. The vinyl fence looks incredible and my kids love the new backyard.",
    project: "Vinyl Privacy Fence",
    initials: "JO",
  },
  {
    name: "David Reyes",
    location: "Pflugerville, TX",
    rating: 5,
    text: "Five stars isn't enough. Jan's Fence replaced our old rotting fence and the difference is night and day. The crew was respectful of our landscaping and cleaned up perfectly. Already recommended them to neighbors.",
    project: "Wood Replacement",
    initials: "DR",
  },
];

function TestimonialCard({ t, index, visible }: { t: typeof testimonials[0]; index: number; visible: boolean }) {
  return (
    <div
      className={`flex-shrink-0 w-80 lg:w-auto bg-white/5 border border-white/10 rounded-lg p-6 transition-all duration-500 hover:bg-white/10 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Quote icon */}
      <Quote size={20} className="mb-4 opacity-30" style={{ color: "var(--color-rust)" }} />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} size={13} fill="#B85C38" color="#B85C38" />
        ))}
      </div>

      {/* Text */}
      <p className="font-body text-sm text-white/80 leading-relaxed mb-5 italic">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-body font-bold text-xs text-white flex-shrink-0"
          style={{ backgroundColor: "var(--color-forest)" }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-body font-semibold text-white text-sm">{t.name}</p>
          <p className="font-mono-label text-[10px] text-white/40 mt-0.5">{t.project} · {t.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-charcoal)" }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="container relative z-10" ref={ref}>
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-label mb-3" style={{ color: "var(--color-rust)" }}>
            Customer Reviews
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              What Our Clients
              <br />
              <span style={{ color: "var(--color-sage)" }}>Are Saying</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-white">4.9</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#B85C38" color="#B85C38" />
                  ))}
                </div>
                <p className="font-body text-xs text-white/40 mt-1">340+ reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
