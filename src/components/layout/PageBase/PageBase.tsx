"use client";

import React, { useEffect, useMemo, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface PageBaseProps {
  children: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard/info" },
  { label: "Manage Customer", path: "/dashboard/customer" },
  { label: "Manage Banner", path: "/dashboard/banner" },
  { label: "Manage Category", path: "/dashboard/category" },
  { label: "Manage Product", path: "/dashboard/product" },
  { label: "Manage Content", path: "/dashboard/content" },
  { label: "Manage Voucher", path: "/dashboard/voucher" },
  { label: "Manage Flash Sales", path: "/dashboard/flash-sales" },
  { label: "Manage Order", path: "/dashboard/order" },
  { label: "Manage Transaction", path: "/dashboard/transaction" },
];

export default function PageBase({ children }: PageBaseProps) {
  useEffect(() => {
    const app = document.getElementById("app");
    if (app) {
      app.classList.add("dashboard");
      return () => app.classList.remove("dashboard");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppBar />
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

function AppBar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "DELETE" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 bg-card border-b border-border shadow-sm z-10">
      <Link
        href="/"
        className="flex items-center gap-4 transition-opacity hover:opacity-80"
      >
        <Image
          alt="Portfolio Logo"
          className="h-10 w-auto"
          height={40}
          src="/images/portfolio.png"
          width={40}
          priority
        />
        <div className="flex flex-row">
          <div className="text-2xl font-bold text-foreground">Port</div>
          <div className="text-2xl font-bold text-primary">folio</div>
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            Admin
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

function Sidebar() {
  const pathname = usePathname();

  const navItemsWithActiveState = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        isActive: pathname.startsWith(item.path),
      })),
    [pathname]
  );

  return (
    <aside className="w-64 bg-card border-r border-border overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-1">
          {navItemsWithActiveState.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={cn(
                  "block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors",
                  item.isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
