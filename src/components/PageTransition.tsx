"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = { children: ReactNode };

export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      // Scroll to top on route change
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return (
    <div
      key={pathname}
      className="page-enter"
    >
      {children}
    </div>
  );
}