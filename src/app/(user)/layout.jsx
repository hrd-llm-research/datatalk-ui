"use client";

import { usePathname } from "next/navigation";
import LayoutNavbar from "@/components/LayoutNavbar";
import Navbar from "@/components/workspace/Navbar";

export const description =
  "A products dashboard with a top navbar, wider sidebar navigation, and a main content area. The layout uses CSS Grid for precise control over component placement. The navbar spans the full width at the top, with the sidebar and main content below it. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows content with scrolling.";

export default function Dashboard({ children }) {
  const pathname = usePathname();
  const showLayoutNavbar = !(
    pathname.startsWith("/project") && pathname !== "/project"
  );

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] h-screen overflow-hidden">
      <Navbar />

      <div
        className={`grid gap-4 rounded-md bg  ${
          showLayoutNavbar
            ? "grid-cols-[280px_1fr] md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr]"
            : "grid-cols-1"
        }`}
      >
        {showLayoutNavbar && <LayoutNavbar className="overflow-y-auto" />}
        <div className="bg-mainbackground p-4 rounded-md">
          <main
            className={`  ${
              showLayoutNavbar ? "rounded-tl-md" : ""
            } overflow-y-auto scrollbar-hide`}
          >
            <div className="h-full mx-auto  ">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
