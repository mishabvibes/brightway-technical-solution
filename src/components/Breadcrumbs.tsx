import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.9375rem] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-11 min-w-11 items-center justify-center underline underline-offset-4 hover:text-ink">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-bold text-ink">{item.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
