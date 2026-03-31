import { cn } from "@/shared/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7afc0]">{eyebrow}</p>
      <div className="flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.05] text-[#fff7f2] md:text-[42px]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-[560px] text-base leading-7 text-[#cec6c1] md:text-[17px]">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
