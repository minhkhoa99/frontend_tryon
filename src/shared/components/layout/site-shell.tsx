import { cn } from "@/shared/lib/cn";

type SiteShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function SiteShell({ children, className }: SiteShellProps) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-4 md:px-8 xl:px-0", className)}>{children}</div>;
}
