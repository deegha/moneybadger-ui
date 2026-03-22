import { Nav } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Money Badger | Dashboard",
  description: "let's get you back on track with your finances",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full overflow-hidden flex flex-col md:flex-row animate-slide-up">
      <Nav />
      {children}
    </main>
  );
}
