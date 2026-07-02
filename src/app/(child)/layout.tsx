import { type ReactNode } from "react";
import { ChildTabNav } from "@/components/child/TabNav";

export default function ChildLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20 max-w-lg mx-auto w-full">
        {children}
      </main>
      <ChildTabNav />
    </div>
  );
}
