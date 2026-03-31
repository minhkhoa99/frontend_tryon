import { getHomeContent } from "@/features/home/services/home-content.service";
import type { HomeContent } from "@/features/home/types/home.types";

export function getHomeViewModel(): HomeContent {
  return getHomeContent();
}
