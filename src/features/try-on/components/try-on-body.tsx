"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { TryOnContent } from "@/features/try-on/types/try-on.types";
import { ViewerPanel } from "@/features/try-on/components/viewer-panel";
import { ProductPanel } from "@/features/try-on/components/product-panel";
import { SwatchPanel } from "@/features/try-on/components/swatch-panel";
import { ActionsRow } from "@/features/try-on/components/actions-row";
import { StyleRail } from "@/features/try-on/components/style-rail";
import { FitNotePanel } from "@/features/try-on/components/fit-note-panel";

type TryOnBodyProps = {
  content: TryOnContent;
};

export function TryOnBody({ content }: TryOnBodyProps) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion === false ? 18 : 0 },
    visible: { opacity: 1, y: 0 },
  };
  const motionProps = shouldReduceMotion === false
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
        variants: reveal,
        transition: { duration: 0.6, ease: "easeOut" as const },
      }
    : { initial: false as const };

  return (
    <div className="px-7 py-7">
      <div className="grid gap-6 xl:grid-cols-[620px_minmax(0,1fr)]">
        <ViewerPanel viewerImage={content.viewerImage} viewerImageAlt={content.viewerImageAlt} />
        <div className="flex flex-col gap-[18px]">
          <motion.div {...motionProps}>
            <ProductPanel product={content.product} />
          </motion.div>
          <motion.div {...motionProps}>
            <SwatchPanel swatches={content.swatches} sizes={content.sizes} />
          </motion.div>
          <ActionsRow />
          <motion.div {...motionProps}>
            <StyleRail pairings={content.pairings} />
          </motion.div>
          <motion.div {...motionProps}>
            <FitNotePanel fitNote={content.fitNote} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
