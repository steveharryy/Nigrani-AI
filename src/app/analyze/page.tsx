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
  const [explanation, setExplanation] = useState<string>("");
  const [formData, setFormData] = useState({
    amount: "",
    location: "Mumbai, IN",
    device: "iPhone 15 Pro",
    ip: "192.168.1.1",
    merchant_category: "Groceries",
    is_new_device: false
  });

  const handleAnalyze = async () => {
    if (!formData.amount) {
      toast.error("Please enter a transaction amount");
      return;
    }

    setAnalyzing(true);
    setResult(null);
    setExplanation("");
    
    try {
      // 1. Call Prediction API
      const predictRes = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(formData.amount.replace(/,/g, '')),
          timestamp: new Date().toISOString(),
          location: formData.location,
          device_type: formData.device,
          merchant_category: formData.merchant_category,
          is_new_device: formData.is_new_device
        })
      });

      if (!predictRes.ok) throw new Error("Backend connection failed during prediction");
      
      const predictData = await predictRes.json();
      setResult(predictData);

      // 2. Call Explanation API (immediately after)
      const explainRes = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(formData.amount.replace(/,/g, '')),
          risk_level: predictData.risk_level,
          merchant_category: formData.merchant_category,
          location: formData.location,
          device_type: formData.device,
          confidence_score: predictData.confidence_score
        })
      });

      if (explainRes.ok) {
        const explainData = await explainRes.json();
        setExplanation(explainData.explanation);
      }

      if (predictData.risk_level === "high") {
        toast.error("Security Alert: High-risk anomaly detected!");
      } else {
        toast.success("Transaction verified successfully.");
      }

    } catch (error) {
      console.error(error);
      toast.error("System connection error. Verify backend status.");
    } finally {
      setAnalyzing(false);
    }
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
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">merchant category</label>
                       <div className="relative">
                          <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <select 
                              value={formData.merchant_category}
                              onChange={(e) => setFormData({...formData, merchant_category: e.target.value})}
                              className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-12 pr-6 outline-none focus:border-[#00FF00]/30 transition-all text-sm font-bold appearance-none cursor-pointer"
                           >
                              {["Groceries", "Electronics", "Jewelry", "Gambling", "Transfer", "QR-Scan", "Food", "Entertainment"].map(cat => (
                                <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                              ))}
                          </select>
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">security flags</label>
                       <div 
                          onClick={() => setFormData({...formData, is_new_device: !formData.is_new_device})}
                          className="flex items-center space-x-4 bg-white/[0.03] border border-white/5 rounded-full py-4 px-6 cursor-pointer hover:border-white/10 transition-all"
                       >
                          <div className={cn(
                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                            formData.is_new_device ? "bg-[#00FF00] border-[#00FF00]" : "border-white/20"
                          )}>
                            {formData.is_new_device && <Zap size={12} className="text-black" />}
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Device / IP</span>
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
           <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
              {!result && !analyzing ? (
                <GlassCard className="h-[520px] flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                      <Cpu size={32} className="text-gray-600" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xl font-bold font-heading lowercase tracking-tighter">engine standby</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[200px] mx-auto">awaiting meta-data input for real-time risk assessment.</p>
                   </div>
                </GlassCard>
              ) : analyzing ? (
                <GlassCard className="h-[520px] flex flex-col items-center justify-center space-y-8">
                   <div className="relative">
                      <div className="w-24 h-24 border-2 border-[#00FF00]/20 rounded-full animate-spin border-t-[#00FF00]" />
                      <Cpu size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00FF00]" />
                   </div>
                   <div className="text-center space-y-2">
                      <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-widest animate-pulse">scanning nodes</p>
                      <p className="text-gray-500 text-[8px] font-bold uppercase tracking-widest">verifying behavior patterns against gemini ai...</p>
                   </div>
                </GlassCard>
              ) : (
                <>
                   <GlassCard className={cn(
                     "space-y-8 glow-neon transition-all duration-700",
                     result.prediction === "fraud" || result.risk_level === "high" ? "border-red-500/50 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]" : "border-[#00FF00]/50 shadow-[0_0_30px_-5px_rgba(0,255,0,0.3)]"
                   )}>
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <p className={cn(
                              "text-[10px] font-black uppercase tracking-widest",
                              result.risk_level === "high" ? "text-red-500" : "text-[#00FF00]"
                            )}>{result.risk_level === "high" ? "anomaly detected" : "transaction verified"}</p>
                            <h3 className="text-5xl font-bold font-heading tracking-tighter lowercase">{Math.round(result.confidence_score)}%</h3>
                            <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">confidence score</p>
                         </div>
                         <StatusBadge status={result.prediction === "fraud" ? "Fraud" : "Safe"} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Risk Level</p>
                          <p className={cn(
                            "text-xs font-bold uppercase tracking-tighter",
                            result.risk_level === "high" ? "text-red-400" : "text-emerald-400"
                          )}>{result.risk_level}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Probability</p>
                          <p className="text-xs font-bold font-mono tracking-tighter text-gray-300">{(result.probability * 100).toFixed(2)}%</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                           <ShieldAlert size={12} className="text-[#00FF00]" /> signal summary
                         </p>
                         <p className="text-xs font-bold uppercase tracking-tighter text-gray-300 leading-relaxed italic">
                           "{result.message}"
                         </p>
                      </div>
                   </GlassCard>

                   {/* NEW: AI Explanation Card */}
                   <GlassCard className="bg-white/[0.02] border-white/5 space-y-4">
                      <div className="flex items-center gap-2 text-[#00FF00]">
                         <Cpu size={16} className="animate-pulse" />
                         <p className="text-[10px] font-black uppercase tracking-widest">AI Intelligence Reasoning</p>
                      </div>
                      <div className="relative">
                         {!explanation ? (
                           <div className="space-y-2 py-2">
                             <div className="h-2 w-full bg-white/5 rounded-full animate-pulse" />
                             <div className="h-2 w-3/4 bg-white/5 rounded-full animate-pulse" />
                             <div className="h-2 w-1/2 bg-white/5 rounded-full animate-pulse" />
                           </div>
                         ) : (
                           <p className="text-sm font-medium text-gray-400 lowercase leading-relaxed">
                             {explanation}
                           </p>
                         )}
                      </div>
                   </GlassCard>

                   <GlassCard 
                     onClick={handleFreeze}
                     className={cn(
                       "bg-[#00FF00] text-black border-none group cursor-pointer overflow-hidden transition-all active:scale-[0.98]",
                       result.risk_level !== "high" && "opacity-50 pointer-events-none grayscale"
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
