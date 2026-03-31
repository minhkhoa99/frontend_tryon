import { CategoriesSection } from "@/features/home/components/categories-section";
import { ChatbotPromoSection } from "@/features/home/components/chatbot-promo-section";
import { DemoSection } from "@/features/home/components/demo-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { HowItWorksSection } from "@/features/home/components/how-it-works-section";
import { TrendingSection } from "@/features/home/components/trending-section";
import { getHomeViewModel } from "@/features/home/mappers/home.mapper";

export function HomePage() {
  const content = getHomeViewModel();

  return (
    <main className="min-h-screen bg-transparent text-[#fff7f2]">
      <HeroSection actions={content.heroActions} />
      <DemoSection />
      <HowItWorksSection steps={content.howSteps} />
      <CategoriesSection categories={content.categories} />
      <TrendingSection products={content.products} />
      <ChatbotPromoSection messages={content.chatMessages} />
    </main>
  );
}
