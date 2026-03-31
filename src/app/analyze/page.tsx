"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { 
  Zap, ShieldAlert, Globe as GlobeIcon, Smartphone, 
  MapPin, IndianRupee, Cpu, ArrowRight, CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

import { toast } from "sonner";

export default function AnalyzePage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    amount: "",
    location: "Mumbai, IN",
    device: "iPhone 15 Pro",
    ip: "192.168.1.1"
  });

  const handleAnalyze = () => {
    if (!formData.amount) {
      toast.error("Please enter a transaction amount");
      return;
    }

    setAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      const amountNum = parseInt(formData.amount.replace(/,/g, ''));
      const isHighRisk = amountNum > 50000;
      
      setResult({
        score: isHighRisk ? 92 : 12,
        status: isHighRisk ? "Fraud" : "Safe",
        explanation: isHighRisk 
          ? `Transaction of ₹${formData.amount} flagged due to unusual high-value velocity from ${formData.location}. Behavior deviates from historical patterns.`
          : `Transaction of ₹${formData.amount} from ${formData.location} verified against device signature ${formData.device}. No anomalies detected.`,
        riskFactors: isHighRisk 
          ? ["High Value", "Velocity Spike", "Location Jump"] 
          : ["Verified Device", "Trusted IP", "Standard Amount"]
      });
      setAnalyzing(false);
      
      if (isHighRisk) {
        toast.warning("High risk transaction detected!");
      } else {
        toast.success("Transaction verified as safe");
      }
    }, 2000);
  };

  const handleFreeze = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Executing freeze protocol...',
        success: 'Transaction frozen successfully. NPCI notified.',
        error: 'System override failed. Please try again.',
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-[#000000] text-white nitro-grid">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <header className="mb-16 border-b border-white/5 pb-8">
           <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-[0.3em] mb-2">engine v4.2 parity</p>
           <h1 className="text-6xl font-bold font-heading tracking-tighter lowercase">risk <br /> <span className="text-gray-600">audit.</span></h1>
        </header>

        <div className="grid grid-cols-12 gap-1 items-start">
           {/* Left: Input Form */}
           <div className="col-span-12 md:col-span-7">
              <GlassCard className="space-y-12">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">input vector</p>
                    <h2 className="text-3xl font-bold font-heading tracking-tighter lowercase">transaction metadata</h2>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">amount (inr)</label>
                       <div className="relative">
                          <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input 
                              type="text" 
                              value={formData.amount}
                              onChange={(e) => setFormData({...formData, amount: e.target.value})}
                              placeholder="12,000" 
                              className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-12 pr-6 outline-none focus:border-[#00FF00]/30 transition-all font-mono text-sm" 
                           />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">location</label>
                       <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input 
                              type="text" 
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                              placeholder="Mumbai, IN" 
                              className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-12 pr-6 outline-none focus:border-[#00FF00]/30 transition-all text-sm uppercase tracking-tighter font-bold" 
                           />
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">device signature</label>
                       <div className="relative">
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input 
                              type="text" 
                              value={formData.device}
                              onChange={(e) => setFormData({...formData, device: e.target.value})}
                              placeholder="iPhone 15 Pro" 
                              className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-12 pr-6 outline-none focus:border-[#00FF00]/30 transition-all text-sm uppercase tracking-tighter font-bold" 
                           />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">ip address</label>
                       <div className="relative">
                          <GlobeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input 
                              type="text" 
                              value={formData.ip}
                              onChange={(e) => setFormData({...formData, ip: e.target.value})}
                              placeholder="192.168.1.1" 
                              className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-12 pr-6 outline-none focus:border-[#00FF00]/30 transition-all font-mono text-sm" 
                           />
                       </div>
                    </div>
                 </div>

                 <Button 
                    onClick={handleAnalyze} 
                    disabled={analyzing}
                    className="w-full h-16 rounded-full text-lg group"
                 >
                    {analyzing ? "scanning vector..." : "execute analysis"} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </GlassCard>
           </div>

           {/* Right: Results / Status */}
           <div className="col-span-12 md:col-span-5 flex flex-col gap-1">
              {!result && !analyzing ? (
                <GlassCard className="h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                      <Cpu size={32} className="text-gray-600" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xl font-bold font-heading lowercase tracking-tighter">engine standby</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[200px] mx-auto">awaiting meta-data input for real-time risk assessment.</p>
                   </div>
                </GlassCard>
              ) : analyzing ? (
                <GlassCard className="h-[400px] flex flex-col items-center justify-center space-y-8">
                   <div className="relative">
                      <div className="w-24 h-24 border-2 border-[#00FF00]/20 rounded-full animate-spin border-t-[#00FF00]" />
                      <Cpu size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00FF00]" />
                   </div>
                   <div className="text-center space-y-2">
                      <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-widest animate-pulse">scanning nodes</p>
                      <p className="text-gray-500 text-[8px] font-bold uppercase tracking-widest">verifying behavior patterns...</p>
                   </div>
                </GlassCard>
              ) : (
                <>
                   <GlassCard className={cn(
                     "space-y-8 glow-neon",
                     result.status === "Fraud" ? "border-red-500/30" : "border-[#00FF00]/30"
                   )}>
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <p className={cn(
                              "text-[10px] font-black uppercase tracking-widest",
                              result.status === "Fraud" ? "text-red-500" : "text-[#00FF00]"
                            )}>{result.status === "Fraud" ? "high-risk detected" : "transaction verified"}</p>
                            <h3 className="text-5xl font-bold font-heading tracking-tighter lowercase">{result.score}%</h3>
                         </div>
                         <StatusBadge status={result.status} />
                      </div>
                      
                      <div className="space-y-4 pt-4 border-t border-white/5">
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">intelligence summary</p>
                         <p className="text-sm font-bold uppercase tracking-tighter text-gray-300 leading-relaxed italic">
                           "{result.explanation}"
                         </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                         {result.riskFactors.map((f: string, i: number) => (
                           <span key={i} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                             {f}
                           </span>
                         ))}
                      </div>
                   </GlassCard>

                   <GlassCard 
                     onClick={handleFreeze}
                     className={cn(
                       "bg-[#00FF00] text-black border-none mt-1 group cursor-pointer overflow-hidden transition-all active:scale-[0.98]",
                       result.status === "Safe" && "opacity-50 pointer-events-none grayscale"
                     )}
                   >
                      <div className="flex justify-between items-center relative z-10">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-black/40 uppercase tracking-widest">action protocol</p>
                            <h4 className="text-2xl font-bold font-heading tracking-tighter lowercase">freeze transaction</h4>
                         </div>
                         <ShieldAlert size={32} className="text-black/20 group-hover:scale-110 transition-transform" />
                      </div>
                   </GlassCard>
                </>
              )}
           </div>
        </div>
      </main>
    </div>
  );
}
