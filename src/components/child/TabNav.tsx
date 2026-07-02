"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  Home,
  CheckSquare,
  Globe,
  Gift,
  User,
} from "lucide-react";

interface NavTab {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  baseHref: string;
}

const childTabs: NavTab[] = [
  { href: "/home", label: "Home", icon: Home, baseHref: "/home" },
  { href: "/chores", label: "Chores", icon: CheckSquare, baseHref: "/chores" },
  { href: "/world", label: "World", icon: Globe, baseHref: "/world" },
  { href: "/rewards", label: "Rewards", icon: Gift, baseHref: "/rewards" },
  { href: "/profile", label: "Profile", icon: User, baseHref: "/profile" },
];

export function ChildTabNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#161629]/95 backdrop-blur-md border-t border-gray-100 dark:border-[#2d2d4a] pb-safe"
      aria-label="Main navigation"
    >
      <div className="max-w-lg mx-auto">
        <ul className="flex" role="list">
          {childTabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.startsWith(tab.baseHref + "/");
            const Icon = tab.icon;

            return (
              <li key={tab.href} className="flex-1">
                <Link
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "flex flex-col items-center justify-center gap-1 py-3 px-1",
                    "transition-all duration-150 select-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-500",
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  )}
                >
                  <span className="relative">
                    {isActive && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-500" aria-hidden="true" />
                    )}
                    <Icon
                      className={clsx(
                        "w-5 h-5 transition-transform duration-200",
                        isActive && "scale-110"
                      )}
                    />
                  </span>
                  <span
                    className={clsx(
                      "text-[10px] font-semibold leading-none",
                      isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-400 dark:text-gray-500"
                    )}
                  >
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
