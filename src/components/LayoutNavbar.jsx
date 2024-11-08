"use client";
import Image from "next/image";
import Link from "next/link";
import { Home, LineChart, Package, Users } from "lucide-react";
import { usePathname } from "next/navigation";
export default function LayoutNavbar() {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex flex-col bg-sidebackground pt-1 ">
      <nav className=" overflow-y-auto px-2 py-[38px] lg:px-6">
        <div className="grid items-start text-sm font-medium gap-3">
          {[
            { href: "/project", icon: Home, label: "Projects" },
            { href: "/dashboard", icon: Package, label: "Dashboards" },
            { href: "/dataset", icon: Users, label: "Datasets" },
            { href: "/saved-chart", icon: LineChart, label: "Saved Charts" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-sm px-5 py-3 transition-all ${
                pathname === href || pathname.startsWith(`${href}`)
                  ? "bg-primary1 text-white"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
