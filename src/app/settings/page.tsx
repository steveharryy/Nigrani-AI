"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Shield, User, Bell, Lock, Smartphone, Globe, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Syncing settings with cloud node...',
        success: 'Settings updated successfully.',
        error: 'Sync failed. Retry in 1m.',
      }
    );
  };

  const tabs = [
    { id: "profile", icon: User, label: "profile" },
    { id: "security", icon: Shield, label: "security" },
    { id: "alerts", icon: Bell, label: "notifications" },
    { id: "system", icon: Globe, label: "system nodes" },
  ];

  return (
    <div className="flex min-h-screen bg-[#000000] text-white nitro-grid">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <header className="mb-16 border-b border-white/5 pb-8 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">config node v4.0</p>
            <h1 className="text-6xl font-bold font-heading tracking-tighter lowercase">system <br /> <span className="text-gray-600">settings.</span></h1>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-4 bg-[#00FF00] text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#00FF00]/90 transition-all active:scale-95 glow-neon"
          >
            <Save size={16} /> Save Changes
          </button>
        </header>

        <div className="grid grid-cols-12 gap-1">
           {/* Sidebar Tabs */}
           <div className="col-span-12 md:col-span-3">
              <GlassCard className="p-2 space-y-1">
                 {tabs.map((tab) => (
                    <button 
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={cn(
                          "w-full flex items-center gap-3 px-6 py-4 rounded-3xl transition-all text-[10px] font-black uppercase tracking-widest",
                          activeTab === tab.id ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                       )}
                    >
                       <tab.icon size={16} /> {tab.label}
                    </button>
                 ))}
              </GlassCard>
           </div>

           {/* Content Area */}
           <div className="col-span-12 md:col-span-9">
              <GlassCard className="min-h-[500px] space-y-12">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-widest italic">{activeTab} configuration</p>
                    <h2 className="text-3xl font-bold font-heading tracking-tighter lowercase">edit {activeTab}</h2>
                 </div>

                 <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">full identity</label>
                       <input type="text" defaultValue="Admin User" className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 px-8 outline-none focus:border-[#00FF00]/30 transition-all text-sm font-bold uppercase tracking-tighter" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">system email</label>
                       <input type="email" defaultValue="admin@nigrani.ai" className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 px-8 outline-none focus:border-[#00FF00]/30 transition-all text-sm font-bold tracking-tight lowercase" />
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/5 space-y-8">
                    <div className="flex justify-between items-center group">
                       <div>
                          <p className="text-xs font-bold uppercase tracking-tighter text-white">two-factor authentication</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">secure your node with biometric verification.</p>
                       </div>
                       <div className="w-12 h-6 bg-[#00FF00] rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-black rounded-full ml-auto" />
                       </div>
                    </div>
                    <div className="flex justify-between items-center group">
                       <div>
                          <p className="text-xs font-bold uppercase tracking-tighter text-white">automatic fraud freeze</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">nodes with {">"}0.9 risk are frozen automatically.</p>
                       </div>
                       <div className="w-12 h-6 bg-white/10 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-gray-600 rounded-full" />
                       </div>
                    </div>
                 </div>
              </GlassCard>
           </div>
        </div>
      </main>
    </div>
  );
}
