"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "q1",
    question: "How does weekly car hire work?",
    answer:
      "Browse the vehicles on this page and note the weekly rate on each listing. Contact us by phone, WhatsApp or in person to confirm availability, discuss terms and arrange collection from our yard in Bury.",
  },
  {
    id: "q2",
    question: "Can I book a hire car online?",
    answer:
      "No — hire is arranged directly with our team. There is no online checkout. WhatsApp or call us to check what is available before you travel.",
  },
  {
    id: "q3",
    question: "What documents do I need to hire?",
    answer:
      "You will need a valid driving licence and proof of address. We will confirm the full requirements when you enquire.",
  },
  {
    id: "q4",
    question: "What is included in the weekly rate?",
    answer:
      "The price shown on each listing is the weekly hire charge. We will explain what is included and any other terms when you contact us.",
  },
  {
    id: "q5",
    question: "Can I see MOT status before hiring?",
    answer:
      "Yes. MOT expiry is shown on every hire listing so you can see where each vehicle stands before you enquire.",
  },
  {
    id: "q6",
    question: "How do I check if a vehicle is available?",
    answer:
      "Call, WhatsApp or visit us during opening hours. We will confirm availability and arrange a collection time that suits you.",
  },
];

export function RentFAQ() {
  const [openId, setOpenId] = useState<string>("q1");

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="rent-faq-heading">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        <div className="max-w-3xl mx-auto">
          <h2
            id="rent-faq-heading"
            className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-3 text-center lg:text-left"
          >
            Hire — frequently asked questions
          </h2>
          <p className="type-body text-[var(--color-text-muted)] mb-8 text-center lg:text-left leading-relaxed">
            Straightforward answers about weekly car hire from our yard.
          </p>

          <div className="space-y-3">
            {FAQ_ITEMS.map(({ id, question, answer }) => {
              const isOpen = openId === id;
              return (
                <div
                  key={id}
                  className="rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--color-border)]"
                >
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
                    <span
                      className={[
                        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        isOpen
                          ? "bg-white/20"
                          : "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
                      ].join(" ")}
                    >
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
