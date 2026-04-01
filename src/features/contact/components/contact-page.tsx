"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getContactContent } from "@/features/contact/services/contact-content.service";
import { useContactForm } from "@/features/contact/hooks/use-contact-form";
import type { ContactSchema } from "@/features/contact/schemas/contact.schema";

function ContactBreadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-2.5 px-4 pt-[18px] text-xs md:px-8 xl:px-12" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item}-${index}`} className="flex items-center gap-2.5">
              <span className={isLast ? "font-semibold text-[#F2E4EA]" : "font-medium text-[#AFA7A2]"}>{item}</span>
              {!isLast ? <span className="font-medium text-[#756F6A]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function ContactPage() {
  const content = getContactContent();
  const form = useContactForm(content);
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };
  const motionProps =
    shouldReduceMotion === false
      ? ({
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.2 },
          variants: reveal,
          transition: { duration: 0.6, ease: "easeOut" as const },
        } as const)
      : ({ initial: false as const } as const);

  const { register, handleSubmit } = form;

  const onSubmit = async (_values: ContactSchema) => {
    void _values;
    await new Promise((resolve) => setTimeout(resolve, 200));
  };

  return (
    <main className="min-h-screen bg-[#09090C]">
      <div className="mx-auto w-full max-w-[1440px]">
        <ContactBreadcrumb items={content.breadcrumb} />

        <section className="flex flex-col gap-10 px-4 py-10 md:px-8 xl:flex-row xl:items-start xl:px-12">
          <motion.div {...motionProps} className="flex w-full flex-col gap-7 xl:w-[620px] xl:flex-none">
            <div className="flex flex-col gap-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-[42px] font-bold leading-[1.05] text-[#FFF7F2]">
                {content.title}
              </h1>
              <p className="max-w-[620px] text-[16px] leading-[1.65] text-[#CEC6C1]">{content.description}</p>
            </div>

            <div className="flex flex-col gap-4 rounded-[30px] border border-white/[0.08] bg-[#121218CC] p-6">
              <h2 className="text-[18px] font-semibold text-[#F4ECE7]">{content.infoTitle}</h2>
              {content.infoItems.map((item) => (
                <p key={item.id} className="text-[15px] font-semibold text-[#FFF4EF]">
                  {item.label}
                </p>
              ))}
              <p className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#E4B8C8]">
                {content.responseTime}
              </p>
              <div className="flex items-center gap-3 pt-1">
                {content.socials.map((item) => (
                  <div key={item.id} className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-[11px] font-semibold text-[#F4ECE7]">
                    {item.label.slice(0, 1)}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            {...motionProps}
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-5 rounded-[34px] border border-white/[0.08] bg-[#17161CCC] p-7"
          >
            <h2 className="text-[20px] font-semibold text-[#F4ECE7]">{content.formTitle}</h2>

            <label className="flex flex-col gap-1.5 border-b border-white/[0.08] pb-[10px]">
              <span className="text-[12px] font-semibold text-[#AFA7A2]">Name</span>
              <input {...register("name")} className="bg-transparent text-[16px] font-medium text-[#FFF4EF] outline-none" />
            </label>

            <label className="flex flex-col gap-1.5 border-b border-white/[0.08] pb-[10px]">
              <span className="text-[12px] font-semibold text-[#AFA7A2]">Email</span>
              <input {...register("email")} className="bg-transparent text-[16px] font-medium text-[#FFF4EF] outline-none" />
            </label>

            <label className="flex flex-col gap-1.5 border-b border-white/[0.08] pb-[10px]">
              <span className="text-[12px] font-semibold text-[#AFA7A2]">Subject</span>
              <input {...register("subject")} className="bg-transparent text-[16px] font-medium text-[#FFF4EF] outline-none" />
            </label>

            <label className="flex flex-col gap-1.5 border-b border-white/[0.08] pb-[10px]">
              <span className="text-[12px] font-semibold text-[#AFA7A2]">Message</span>
              <textarea {...register("message")} rows={4} className="resize-none bg-transparent text-[16px] font-medium text-[#FFF4EF] outline-none" />
            </label>

            <div className="flex flex-col gap-3 pt-1 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                className="w-fit rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] px-5 py-4 text-[15px] font-bold text-[#140E12] shadow-[0_18px_38px_rgba(241,196,214,0.26)]"
              >
                {content.submitLabel}
              </button>
              <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#E4B8C8]">{content.replyHint}</span>
            </div>
          </motion.form>
        </section>
      </div>
    </main>
  );
}
