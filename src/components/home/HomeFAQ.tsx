"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "q1",
    question: "Do you declare all faults on each vehicle?",
    answer:   "Yes. Every known issue is listed in the condition report with photographs where relevant.",
  },
  {
    id: "q2",
    question: "Can I view MOT history before visiting?",
    answer:   "Full MOT records and advisories are shown on each vehicle listing page.",
  },
  {
    id: "q3",
    question: "Are walkaround videos available?",
    answer:   "Where available, listings include a narrated walkaround and cold start video.",
  },
  {
    id: "q4",
    question: "How do I arrange a viewing?",
    answer:   "Contact us by phone, WhatsApp, or through the contact page to book an appointment.",
  },
];

export function HomeFAQ() {
  const [openId, setOpenId] = useState<string>("q1");

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-8 text-center lg:text-left">
            Frequently Asked <span className="text-[var(--color-highlight)]">Questions</span>
          </h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map(({ id, question, answer }) => {
              const isOpen = openId === id;
              return (
                <div key={id} className="rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? "" : id)}
                    aria-expanded={isOpen}
                    className={[
                      "w-full flex items-center justify-between gap-4 p-5 text-left transition-colors duration-[var(--duration-hover)]",
                      isOpen
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-white text-[var(--color-text)] hover:bg-[var(--color-hover)]",
                    ].join(" ")}
                  >
                    <span className="font-semibold text-sm lg:text-base">{question}</span>
                    <span className={[
                      "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                      isOpen ? "bg-white/20" : "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
                    ].join(" ")}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 bg-[var(--color-accent)] text-white/90 text-sm leading-relaxed">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
