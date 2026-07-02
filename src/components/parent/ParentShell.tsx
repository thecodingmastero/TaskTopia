import { type ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { LayoutDashboard, CheckSquare, Users, Settings } from "lucide-react";

interface ParentNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: ParentNavItem[] = [
  { href: "/parent/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/parent/chores", label: "Chores", icon: CheckSquare },
  { href: "/parent/kids", label: "Kids", icon: Users },
  { href: "/parent/settings", label: "Settings", icon: Settings },
];

export function ParentShell({
  children,
  currentPath,
}: {
  children: ReactNode;
  currentPath?: string;
}) {
  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white dark:bg-[#161629] border-r border-gray-100 dark:border-[#2d2d4a] p-4">
        <div className="mb-8 px-2">
          <h1 className="text-lg font-extrabold text-purple-700 dark:text-purple-300">
            🏡 TaskTopia
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Parent Dashboard</p>
        </div>
        <nav aria-label="Parent navigation">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        {children}
      </main>

      {/* Bottom nav (mobile) */}
      <nav
        className="fixed md:hidden bottom-0 left-0 right-0 bg-white/95 dark:bg-[#161629]/95 backdrop-blur-md border-t border-gray-100 dark:border-[#2d2d4a] z-50"
        aria-label="Parent navigation"
      >
        <ul className="flex">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "flex flex-col items-center justify-center gap-1 py-3",
                    "transition-colors duration-150",
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-400 dark:text-gray-500"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-semibold">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
