import { getTryOnContent } from "@/features/try-on/services/try-on-content.service";
import { TryOnBody } from "@/features/try-on/components/try-on-body";

export function TryOnPage() {
  const content = getTryOnContent();

  return (
    <main className="min-h-screen text-[#fff7f2]">
      <TryOnBody content={content} />
    </main>
  );
}
