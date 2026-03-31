import Link from "next/link";

type CheckoutBreadcrumbProps = {
  items: string[];
};

export function CheckoutBreadcrumb({ items }: CheckoutBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2.5 px-4 pt-[18px] text-xs md:px-8 xl:px-12" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item}-${index}`} className="flex items-center gap-2.5">
              {index === 0 ? (
                <Link href="/cart" className="font-medium text-[#AFA7A2] transition-colors hover:text-[#d9afc0]">
                  {item}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-[#F2E4EA]" : "font-medium text-[#AFA7A2]"}>{item}</span>
              )}
              {!isLast ? <span className="font-medium text-[#756F6A]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
