"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  ShieldAlert, ShieldCheck, Zap, Cpu, Search, Mail, Lock, 
  ArrowRight, Globe as GlobeIcon, Activity, CheckCircle2, 
  Target, Fingerprint, Database, BarChart3, HelpCircle,
  Sparkles, Bot, ChevronRight, Binary, Radar, Server
} from "lucide-react";
import { cn } from "@/lib/utils";

const Waveform = () => (
  <svg viewBox="0 0 200 60" className="w-full h-24 opacity-30">
    <motion.path
      d="M0 30 Q 25 10, 50 30 T 100 30 T 150 30 T 200 30"
      fill="none"
      stroke="#00FF00"
      strokeWidth="2"
      animate={{
        d: [
          "M0 30 Q 25 10, 50 30 T 100 30 T 150 30 T 200 30",
          "M0 30 Q 25 50, 50 30 T 100 30 T 150 30 T 200 30",
          "M0 30 Q 25 10, 50 30 T 100 30 T 150 30 T 200 30",
        ]
      }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    />
    <motion.path
      d="M0 35 Q 25 15, 50 35 T 100 35 T 150 35 T 200 35"
      fill="none"
      stroke="#00FF00"
      strokeWidth="1"
      className="opacity-50"
      animate={{
        d: [
          "M0 35 Q 25 15, 50 35 T 100 35 T 150 35 T 200 35",
          "M0 35 Q 25 55, 50 35 T 100 35 T 150 35 T 200 35",
          "M0 35 Q 25 15, 50 35 T 100 35 T 150 35 T 200 35",
        ]
      }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
    />
  </svg>
);

const HexStream = () => {
    const [hex, setHex] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            setHex(Math.random().toString(16).slice(2, 10).toUpperCase());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <span className="font-mono text-[8px] text-[#00FF00]/40 uppercase tracking-widest">{hex}</span>;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#00FF00]/30 overflow-x-hidden relative nitro-grid">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 px-6 py-2" />
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-12"
          >
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              v4.0 deployment
            </span>
            <span className="w-1.5 h-1.5 bg-[#00FF00] rounded-full animate-pulse" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[12vw] md:text-[8vw] font-bold font-heading leading-[0.9] tracking-tighter text-white lowercase mb-16"
          >
            protecting <br />
            <span className="text-gray-500">the next billion</span> <br />
            upi txn.
          </motion.h1>

          <div className="grid grid-cols-12 gap-8 items-end">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-12 md:col-span-4"
            >
              <p className="text-gray-400 text-sm md:text-base font-inter leading-relaxed max-w-sm uppercase tracking-tighter font-bold">
                nigrani ai (निगरानी AI) is the definitive ml-shield for bharat&apos;s digital payment economy.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="col-span-12 md:col-span-8 flex flex-wrap gap-4"
            >
              <Link href="/dashboard">
                <Button size="lg" className="h-20 px-12 rounded-full text-lg">
                  launch security portal <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/analyze">
                <Button variant="outline" size="lg" className="h-20 px-12 rounded-full text-lg border-white/20 hover:border-white/40">
                  audit ecosystem
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID (NITRO WORK STYLE) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Row 1: ML Engine */}
          <Link href="/analyze" className="col-span-12 md:col-span-7 group block">
             <GlassCard className="h-[550px] flex flex-col justify-between relative overflow-hidden group hover:border-[#00FF00]/40 transition-all duration-500">
                {/* Background Render */}
                <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-110 transition-transform duration-[2s]">
                   <img src="/assets/ml_engine.png" className="w-full h-full object-cover" alt="ML Engine" />
                </div>
                
                {/* Live Scan Overlay */}
                <motion.div 
                   animate={{ top: ["0%", "100%", "0%"] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                   className="absolute left-0 right-0 h-[1px] bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10"
                />

                <div className="flex justify-between items-start z-10 relative">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-widest flex items-center gap-2">
                        <HexStream /> <span>feature 01</span>
                      </p>
                      <h3 className="text-5xl font-bold font-heading tracking-tighter lowercase">ml risk engine</h3>
                   </div>
                   <div className="p-4 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                      <Cpu size={24} className="text-[#00FF00]" />
                   </div>
                </div>

                <div className="z-10 relative">
                   <div className="p-6 bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl max-w-sm">
                      <p className="text-gray-400 font-bold uppercase tracking-tighter text-sm leading-snug">
                         proprietary deep-learning models processing 10k transactions per second with 99.8% precision.
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-[10px] font-black text-[#00FF00] uppercase tracking-widest">
                         <span className="flex items-center gap-1"><CheckCircle2 size={12}/> active</span>
                         <span className="flex items-center gap-1 text-gray-500"><Activity size={12}/> 14ms latency</span>
                      </div>
                   </div>
                </div>
             </GlassCard>
          </Link>
          {/* Row 1: AI Insights */}
          <Link href="/insights" className="col-span-12 md:col-span-5 group block">
             <GlassCard className="h-[550px] flex flex-col justify-between relative overflow-hidden group hover:border-violet-400/40 transition-all duration-500">
                 {/* Background Render */}
                <div className="absolute inset-0 z-0 opacity-30 group-hover:scale-110 transition-transform duration-[3s]">
                   <img src="/assets/ai_insights.png" className="w-full h-full object-cover" alt="AI Insights" />
                </div>

                <div className="flex justify-between items-start z-10 relative">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">feature 02</p>
                      <h3 className="text-5xl font-bold font-heading tracking-tighter lowercase">ai insights</h3>
                   </div>
                   <div className="p-4 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                      <Sparkles size={24} className="text-violet-400" />
                   </div>
                </div>

                <div className="z-10 relative">
                   <div className="space-y-4">
                      <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 italic">nigrani-llm v4 thread_#091</p>
                         <p className="text-xs text-white/70 font-bold tracking-tight uppercase leading-relaxed">
                           "potential sybil attack detected in cluster B-7. recommend immediate freeze."
                         </p>
                      </div>
                      <p className="text-gray-400 max-w-xs font-bold uppercase tracking-tighter text-sm">
                         human-readable audit trails for every flagged risk node.
                      </p>
                   </div>
                </div>
             </GlassCard>
          </Link>
          {/* Row 2: Real-time Feed */}
          <Link href="/dashboard" className="col-span-12 md:col-span-4 group block">
             <GlassCard className="h-[450px] flex flex-col justify-between relative overflow-hidden hover:border-[#00FF00]/40 transition-all duration-500">
                <div className="space-y-1 relative z-10">
                   <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-widest">feature 03</p>
                   <h3 className="text-4xl font-bold font-heading tracking-tighter lowercase">real-time feed</h3>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Waveform />
                </div>

                <div className="space-y-6 relative z-10">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                         <p className="text-[18px] font-bold font-heading">4.2k</p>
                         <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">scans/min</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                         <p className="text-[18px] font-bold font-heading text-[#00FF00]">0.0%</p>
                         <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">packet loss</p>
                      </div>
                   </div>
                   <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <Radar size={12} className="animate-spin" /> synced with npci gateway
                   </p>
                </div>
             </GlassCard>
          </Link>
          {/* Row 2: Compliance Node */}
          <Link href="/alerts" className="col-span-12 md:col-span-8 group block">
             <GlassCard className="h-[450px] flex flex-col justify-between relative overflow-hidden hover:border-cyan-400/40 transition-all duration-500">
                {/* Shield Background */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none group-hover:scale-105 transition-transform duration-1000">
                    <img src="/assets/security_shield.png" className="w-full h-full object-contain" alt="Security" />
                </div>

                <div className="flex justify-between items-start relative z-10">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">feature 04</p>
                      <h3 className="text-4xl font-bold font-heading tracking-tighter lowercase">compliance node</h3>
                   </div>
                   <div className="p-4 bg-white/5 rounded-full">
                      <ShieldCheck size={32} className="text-cyan-400" />
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                   {[
                      { l: "ISO 27001", d: "Secured Data" },
                      { l: "RBI GRID", d: "Reg. Certified" },
                      { l: "GDPR READY", d: "Global Standards" },
                      { l: "AES-256", d: "End-to-End" },
                   ].map((item, i) => (
                      <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors">
                         <p className="text-lg font-bold font-heading lowercase tracking-tighter text-white">{item.l}</p>
                         <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">{item.d}</p>
                      </div>
                   ))}
                </div>
                
                <div className="p-4 bg-cyan-400/5 border border-cyan-400/20 rounded-full flex items-center justify-center gap-4 relative z-10">
                   <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">security health: 100% stable</span>
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-cyan-400/20 rounded-full overflow-hidden relative">
                         <motion.div 
                           animate={{ height: ["20%", "100%", "20%"] }} 
                           transition={{ repeat: Infinity, duration: 1, delay: i*0.2 }}
                           className="absolute bottom-0 left-0 right-0 bg-cyan-400 shadow-[0_0_5px_cyan]" 
                         />
                      </div>)}
                   </div>
                </div>
             </GlassCard>
          </Link>
        </div>
      </section>

      {/* --- STATS SECTION (NITRO MINIMAL) --- */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none lowercase max-w-md">
             intelligence <br /> 
             <span className="text-gray-600">in numbers.</span>
           </h2>
           <div className="flex-1 grid grid-cols-2 gap-12 px-6">
              {[
                { label: "scanned", val: "1.2b+" },
                { label: "prevented", val: "450cr" },
                { label: "latency", val: "14ms" },
                { label: "accuracy", val: "99.8%" },
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-widest">{s.label}</p>
                  <p className="text-5xl font-bold font-heading tracking-tighter">{s.val}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-white/5 relative z-10 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-8">
               <h4 className="text-4xl font-bold font-heading tracking-tighter lowercase">nigrani ai</h4>
               <p className="text-gray-500 text-sm font-bold uppercase tracking-tighter max-w-xs">
                 redefining upi security for the digital age. built in bharat, for the world.
               </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
               <div className="space-y-4">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">links</p>
                  <ul className="space-y-2 text-xs text-gray-500 font-bold uppercase tracking-widest">
                     <li><Link href="/dashboard" className="hover:text-white transition-colors">dashboard</Link></li>
                     <li><Link href="/analyze" className="hover:text-white transition-colors">analyze</Link></li>
                     <li><Link href="/insights" className="hover:text-white transition-colors">insights</Link></li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">legal</p>
                  <ul className="space-y-2 text-xs text-gray-500 font-bold uppercase tracking-widest">
                     <li className="hover:text-white cursor-pointer">privacy</li>
                     <li className="hover:text-white cursor-pointer">compliance</li>
                     <li className="hover:text-white cursor-pointer">governance</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center">
            <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest">© 2026 nigrani ai labs</p>
            <p className="text-[8px] font-black text-[#00FF00] uppercase tracking-widest animate-pulse">system priority: active</p>
         </div>
      </footer>
    </main>
  );
}
