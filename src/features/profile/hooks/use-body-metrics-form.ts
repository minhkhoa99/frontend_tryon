"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bodyMetricsSchema, type BodyMetricsSchema } from "@/features/profile/schemas/body-metrics.schema";
import type { BodyMetricsContent } from "@/features/profile/types/profile.types";

export function useBodyMetricsForm(content: BodyMetricsContent) {
  return useForm<BodyMetricsSchema>({
    resolver: zodResolver(bodyMetricsSchema),
    defaultValues: {
      height: content.metricFields.find((field) => field.key === "height")?.value ?? 168,
      weight: content.metricFields.find((field) => field.key === "weight")?.value ?? 54,
      bust: content.metricFields.find((field) => field.key === "bust")?.value ?? 84,
      waist: content.metricFields.find((field) => field.key === "waist")?.value ?? 66,
      hips: content.metricFields.find((field) => field.key === "hips")?.value ?? 92,
      shoulder: content.metricFields.find((field) => field.key === "shoulder")?.value ?? 38,
      thigh: content.metricFields.find((field) => field.key === "thigh")?.value ?? 52,
      fitPreference: content.fitPreferences.find((item) => item.active)?.id as "om" | "regular" | "oversized",
    },
    mode: "onBlur",
  });
}
