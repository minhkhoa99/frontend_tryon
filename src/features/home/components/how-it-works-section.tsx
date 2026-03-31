import type { HowStep } from "@/features/home/types/home.types";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { SectionHeading } from "@/shared/components/ui/section-heading";

type HowItWorksSectionProps = {
  steps: HowStep[];
};

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="scroll-mt-28 bg-[#0b0b10] py-16 md:py-20">
      <SiteShell>
        <div className="flex flex-col gap-6 px-2 md:px-4 xl:px-16">
          <SectionHeading eyebrow="HOW IT WORKS" title="Ba bước để lên outfit nhanh, đẹp và đúng vibe." />
          <ol className="grid gap-[22px] lg:grid-cols-3">
            {steps.map((step) => (
              <li key={step.index}>
                <article className="flex h-full flex-col gap-[14px] rounded-[28px] border border-white/8 bg-[#13131a] px-6 py-6 pb-7">
                  <p className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[#e2afc2]">{step.index}</p>
                  <h3 className="text-[22px] font-semibold leading-8 text-[#fff4ef]">{step.title}</h3>
                  <p className="text-[15px] leading-7 text-[#c7c0bb]">{step.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </SiteShell>
    </section>
  );
}
