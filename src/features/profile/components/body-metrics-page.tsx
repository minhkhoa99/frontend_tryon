"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import { getBodyMetricsContent } from "@/features/profile/services/profile-content.service";
import { useBodyMetricsForm } from "@/features/profile/hooks/use-body-metrics-form";
import type { BodyMetricsSchema } from "@/features/profile/schemas/body-metrics.schema";

function ProfileBreadcrumb({ items }: { items: string[] }) {
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

export function BodyMetricsPage() {
  const content = getBodyMetricsContent();
  const form = useBodyMetricsForm(content);
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };
  const motionProps =
    shouldReduceMotion === false
      ? ({
          initial: "hidden" as const,
          animate: "visible" as const,
          variants: reveal,
          transition: { duration: 0.6, ease: "easeOut" as const },
        } as const)
      : ({ initial: false as const } as const);

  const { watch, setValue, handleSubmit } = form;
  const values = watch();

  const onSubmit = async (_values: BodyMetricsSchema) => {
    void _values;
    await new Promise((resolve) => setTimeout(resolve, 200));
  };

  return (
    <main className="min-h-screen bg-[#0A0A0D]">
      <div className="mx-auto w-full max-w-[1440px]">
        <ProfileBreadcrumb items={content.breadcrumb} />

        <section className="flex flex-col gap-7 px-4 py-6 md:px-8 xl:flex-row xl:items-start xl:gap-[28px] xl:px-12">
          <motion.aside
            {...motionProps}
            className="flex w-full flex-col gap-[14px] rounded-[30px] border border-white/[0.08] bg-[#121218CC] p-[22px] backdrop-blur-[16px] xl:w-[280px] xl:flex-none"
          >
            <h2 className="text-[16px] font-semibold text-[#F4ECE7]">{content.sidebarTitle}</h2>
            {content.sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "text-[14px] font-medium transition",
                  item.active ? "text-[#F2E4EA]" : "text-[#BEB5B0] hover:text-[#F4ECE7]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </motion.aside>

          <motion.div {...motionProps} className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-[family-name:var(--font-playfair)] text-[42px] font-bold leading-[1.05] text-[#FFF7F2]">
                {content.title}
              </h1>
              <p className="max-w-[700px] text-[15px] leading-[1.6] text-[#CEC6C1]">{content.description}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-[22px] rounded-[34px] border border-white/[0.08] bg-[#13131ACC] p-[22px] backdrop-blur-[18px] xl:flex-row">
                <div className="flex w-full flex-col gap-[18px] xl:w-[520px] xl:flex-none">
                  <h2 className="text-[18px] font-semibold text-[#F4ECE7]">{content.metricsTitle}</h2>

                  {content.metricFields.slice(0, 2).map((field) => {
                    const value = values[field.key];
                    return (
                      <label key={field.key} className="flex flex-col gap-[10px] rounded-[24px] border border-white/[0.06] bg-[#17161D] p-4">
                        <span className="text-[13px] font-semibold text-[#F4ECE7]">{field.label}</span>
                        <span className="font-[family-name:var(--font-mono)] text-[18px] font-bold text-[#E5B6C7]">
                          {value} {field.unit}
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={field.max}
                          value={value}
                          onChange={(event) => setValue(field.key, Number(event.target.value), { shouldDirty: true })}
                          className="accent-[#D89AAE]"
                        />
                        <span className="text-[11px] font-medium text-[#8F8884]">Đơn vị: {field.unit}</span>
                      </label>
                    );
                  })}

                  <div className="flex flex-col gap-3 rounded-[24px] border border-white/[0.06] bg-[#17161D] p-4">
                    <span className="text-[13px] font-semibold text-[#F4ECE7]">Sở thích fit</span>
                    <div className="flex flex-wrap gap-[10px]">
                      {content.fitPreferences.map((item) => {
                        const active = values.fitPreference === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setValue("fitPreference", item.id as BodyMetricsSchema["fitPreference"], { shouldDirty: true })}
                            className={cn(
                              "rounded-full px-4 py-3 text-[13px] font-semibold transition",
                              active
                                ? "bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] text-[#140E12]"
                                : "border border-white/[0.08] bg-white/[0.05] text-[#F4ECE7]",
                            )}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {content.metricFields.slice(2).map((field) => {
                    const value = values[field.key];
                    return (
                      <label key={field.key} className="flex flex-col gap-[10px] rounded-[24px] border border-white/[0.06] bg-[#17161D] p-4">
                        <span className="text-[13px] font-semibold text-[#F4ECE7]">{field.label}</span>
                        <span className="font-[family-name:var(--font-mono)] text-[18px] font-bold text-[#E5B6C7]">
                          {value} {field.unit}
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={field.max}
                          value={value}
                          onChange={(event) => setValue(field.key, Number(event.target.value), { shouldDirty: true })}
                          className="accent-[#D89AAE]"
                        />
                        <span className="text-[11px] font-medium text-[#8F8884]">Đơn vị: {field.unit}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex w-full flex-col gap-[18px]">
                  <h2 className="text-[18px] font-semibold text-[#F4ECE7]">{content.shapeTitle}</h2>

                  <div className="grid grid-cols-2 gap-[14px]">
                    {content.bodyShapes.map((shape) => (
                      <div
                        key={shape.id}
                        className={cn(
                          "flex flex-col gap-[10px] rounded-[24px] border p-4",
                          shape.active
                            ? "border-[#F0C1D233] bg-linear-to-b from-[#F6D2DB22] to-[#D89AAE22]"
                            : "border-white/[0.06] bg-[#17161D]",
                        )}
                      >
                        <div className="relative h-[140px] overflow-hidden rounded-[20px] bg-[#1c1a22]">
                          <Image src={shape.image} alt={shape.label} fill className="object-cover" sizes="220px" />
                        </div>
                        <span className={cn("text-[13px] font-semibold", shape.active ? "text-[#FFF4EF]" : "text-[#F4ECE7]")}>
                          {shape.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 rounded-[28px] border border-white/[0.06] bg-[#17161D] p-[18px] xl:flex-row">
                    <div className="relative h-[320px] w-full overflow-hidden rounded-[24px] bg-[#10121a] xl:w-[260px] xl:flex-none">
                      <Image src={content.bodyModelImage} alt="Body model" fill className="object-cover" sizes="260px" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[15px] font-semibold text-[#F4ECE7]">{content.insight.title}</h3>
                      <p className="max-w-[340px] text-[14px] leading-[1.55] text-[#CEC6C1]">{content.insight.description}</p>
                      <div className="flex flex-col gap-2 pt-1">
                        {content.insight.tags.map((tag) => (
                          <div key={tag} className="w-fit rounded-full border border-white/[0.08] bg-white/[0.05] px-[14px] py-[10px] font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#E4B8C8]">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 xl:w-fit">
                <button
                  type="submit"
                  className="w-fit rounded-full bg-linear-to-b from-[#F6D2DB] to-[#D89AAE] px-6 py-4 text-[15px] font-bold text-[#140E12] shadow-[0_18px_38px_rgba(241,196,214,0.26)]"
                >
                  {content.saveLabel}
                </button>
                <div className="w-fit rounded-full border border-white/[0.08] bg-[#121218CC] px-[18px] py-[14px] text-[13px] font-semibold text-[#F4ECE7]">
                  {content.savedMessage}
                </div>
              </div>
            </form>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
