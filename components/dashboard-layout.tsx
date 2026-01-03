"use client";

import { Sidebar } from "./sidebar";

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="w-full lg:ml-64 xl:ml-72 flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pt-16 sm:pt-20 lg:pt-8 pb-6 sm:pb-8">
        {children}
      </main>
    </div>
  );
}

