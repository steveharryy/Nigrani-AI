"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  MessageSquareCode, 
  Settings, 
  LogOut,
  ShieldAlert,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Search, label: "ML Analysis", href: "/analyze" },
  { icon: MessageSquareCode, label: "AI Insights", href: "/insights" },
  { icon: History, label: "History", href: "/history" },
  { icon: ShieldAlert, label: "Alerts", href: "/alerts" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    toast.loading("Terminating secure session...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Logged out successfully.");
      router.push("/login");
    }, 1500);
  };

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 pt-24 pb-8 px-4 glass-dark border-r border-white/5 flex flex-col justify-between">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-violet-600/10 text-violet-400 border border-violet-500/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn("transition-colors", isActive ? "text-violet-400" : "group-hover:text-white")} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <Settings size={20} />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-medium text-sm"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};
