import { z } from "zod";

export const bodyMetricsSchema = z.object({
  height: z.number().min(120).max(210),
  weight: z.number().min(30).max(150),
  bust: z.number().min(60).max(140),
  waist: z.number().min(40).max(120),
  hips: z.number().min(70).max(160),
  shoulder: z.number().min(25).max(70),
  thigh: z.number().min(30).max(100),
  fitPreference: z.enum(["om", "regular", "oversized"]),
});

export type BodyMetricsSchema = z.infer<typeof bodyMetricsSchema>;
