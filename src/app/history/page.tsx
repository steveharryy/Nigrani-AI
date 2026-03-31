"use client";
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Clock, Download, Filter, Search } from "lucide-react";
import { toast } from "sonner";

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen bg-[#000000] text-white nitro-grid">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <header className="mb-16 border-b border-white/5 pb-8 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-[0.3em] mb-2">archive node v2.4</p>
            <h1 className="text-6xl font-bold font-heading tracking-tighter lowercase">audit <br /> <span className="text-gray-600">history.</span></h1>
          </div>
          <button 
            onClick={() => toast.success("Exporting history to CSV...")}
            className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-[#00FF00]/50 transition-all cursor-pointer group"
          >
            <Download size={20} className="text-gray-400 group-hover:text-[#00FF00]" />
          </button>
        </header>

        <GlassCard className="p-0 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <div className="flex items-center gap-4 bg-white/5 rounded-full px-6 py-2 border border-white/5 text-gray-400">
               <Search size={14} />
               <input type="text" placeholder="search logs..." className="bg-transparent outline-none text-xs font-bold uppercase tracking-widest w-64" />
            </div>
            <div className="flex gap-4">
               <button className="text-[8px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1 hover:text-white transition-colors">
                  <Filter size={10} /> filter
               </button>
            </div>
          </div>
          
          <div className="p-20 flex flex-col items-center justify-center text-center space-y-6">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Clock size={32} className="text-gray-600" />
             </div>
             <div className="space-y-2">
                <h4 className="text-xl font-bold font-heading lowercase tracking-tighter text-gray-400">no recent archive fetches</h4>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest max-w-[200px] mx-auto">your audit history will appear here once transactions are processed.</p>
             </div>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
