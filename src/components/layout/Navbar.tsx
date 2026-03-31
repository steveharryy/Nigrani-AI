"use client";
import React from "react";
import Link from "next/link";
import { ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar = () => {
  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-6 flex justify-center">
      <nav className="glass-dark border border-white/5 px-6 py-2 rounded-full flex items-center justify-between gap-12 max-w-fit shadow-2xl">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#00FF00] p-1.5 rounded-full shadow-[0_0_10px_rgba(0,255,0,0.3)]">
            <ShieldCheck size={18} className="text-black" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tighter text-white lowercase">
            nigrani
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
            dashboard
          </Link>
          <Link href="/analyze" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
            analyze
          </Link>
          <Link href="/insights" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
            insights
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button size="sm" className="bg-[#00FF00] text-black hover:bg-[#00FF00]/90 rounded-full px-5 text-xs font-black uppercase tracking-widest h-9 border-none glow-neon">
              login
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};
