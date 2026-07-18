import Link from "next/link";

import { navigation } from "@/data/navigation";

export function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
