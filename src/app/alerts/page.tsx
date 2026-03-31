"use client";
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldAlert, Bell, Settings, Filter } from "lucide-react";
import { toast } from "sonner";

export default function AlertsPage() {
  return (
    <div className="flex min-h-screen bg-[#000000] text-white nitro-grid">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <header className="mb-16 border-b border-white/5 pb-8 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-2">monitoring: critical</p>
            <h1 className="text-6xl font-bold font-heading tracking-tighter lowercase">threat <br /> <span className="text-gray-600">monitor.</span></h1>
          </div>
          <button 
            onClick={() => toast.info("Alert notifications are active on system node.")}
            className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-red-500/50 transition-all cursor-pointer group"
          >
            <Bell size={20} className="text-gray-400 group-hover:text-red-500" />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
           <GlassCard className="border-red-500/10 hover:border-red-500/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-red-500/10 rounded-full border border-red-500/20">
                    <ShieldAlert size={24} className="text-red-500" />
                 </div>
                 <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">crit 0</span>
              </div>
              <h3 className="text-2xl font-bold font-heading tracking-tighter mb-2">no active breaches</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">all network nodes are operating within normal risk parameters.</p>
           </GlassCard>

           <GlassCard className="border-white/5 hover:border-white/20 transition-all cursor-pointer group flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-white/5 rounded-full border border-white/10">
                    <Settings size={24} className="text-gray-400" />
                 </div>
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">config v1.0</span>
              </div>
              <div>
                 <h3 className="text-2xl font-bold font-heading tracking-tighter mb-2">alert settings</h3>
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">configure automated response protocols for high-risk vectors.</p>
              </div>
           </GlassCard>
        </div>

        <GlassCard className="p-0 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h4 className="text-xl font-bold font-heading lowercase tracking-tighter">recent activity</h4>
            <div className="flex gap-4">
               <button className="text-[8px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1 hover:text-white transition-colors">
                  <Filter size={10} /> filter
               </button>
            </div>
          </div>
          <div className="p-20 flex flex-col items-center justify-center text-center space-y-4">
             <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em]">silence is security</p>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
