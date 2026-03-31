"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
  Send, Bot, Sparkles, Search, History, 
  TrendingUp, AlertTriangle, MessageSquareCode,
  ArrowRight, Globe as GlobeIcon, Activity
} from "lucide-react";

type Message = {
  role: "bot" | "user";
  content: string;
  timestamp: string;
};

export default function InsightsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "scanning active upi nodes. i have identified a new laundering pattern in the bangalore-south cluster. would you like me to generate a risk-attribution report for the last 15 minutes?",
      timestamp: "10:14 AM"
    },
    {
      role: "user",
      content: "yes, proceed with cluster b-s audit. highlight nodes with >0.8 risk score.",
      timestamp: "10:15 AM"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      const botMessage: Message = {
        role: "bot",
        content: `Analyzing "${userMessage.content}"... Protocol B-7 initialized. I've cross-referenced this with the NPCI live-stream. Findings indicate a 94% pattern match with known cluster exploits.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleGenerateReport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Generating encrypted intelligence report...',
        success: 'Nigrani_Intel_Report_v4.pdf ready for download.',
        error: 'Report generation failed.',
      }
    );
  };
  return (
    <div className="flex min-h-screen bg-[#000000] text-white nitro-grid">
      <Sidebar />
      
      <main className="flex-1 flex flex-col p-8 ml-64">
        <header className="mb-12 border-b border-white/5 pb-8">
           <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-[0.3em] mb-2">intelligence node v4.0</p>
           <h1 className="text-6xl font-bold font-heading tracking-tighter lowercase">ai <br /> <span className="text-gray-600">research.</span></h1>
        </header>

        <div className="flex-1 grid grid-cols-12 gap-1 items-stretch mb-8 min-h-0">
           {/* Left: Chat Area */}
           <div className="col-span-12 md:col-span-8 flex flex-col">
              <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden">
                 <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-[#00FF00] flex items-center justify-center border-2 border-black">
                          <Bot size={20} className="text-black" />
                       </div>
                       <div className="space-y-0.5">
                          <p className="text-xs font-black uppercase tracking-widest text-white">nigrani bot</p>
                          <p className="text-[8px] font-bold text-[#00FF00] uppercase tracking-widest animate-pulse font-mono">analyzing network...</p>
                       </div>
                    </div>
                    <div className="p-3 hover:bg-white/5 rounded-full cursor-pointer transition-colors text-gray-500 hover:text-white">
                       <History size={18} />
                    </div>
                 </div>

                  <div ref={scrollRef} className="flex-1 p-8 space-y-12 overflow-y-auto max-h-[60vh]">
                     {messages.map((msg, i) => (
                        <div key={i} className={cn(
                           "flex gap-6 max-w-2xl",
                           msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}>
                           <div className={cn(
                              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
                              msg.role === "user" ? "bg-[#00FF00] border-black border-2" : "bg-white/5 border-white/10"
                           )}>
                              {msg.role === "bot" ? <Bot size={16} className="text-gray-400" /> : <span className="text-[10px] font-black text-black">ME</span>}
                           </div>
                           <div className={cn(
                              "space-y-2",
                              msg.role === "user" ? "text-right" : ""
                           )}>
                              <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">
                                 {msg.role === "bot" ? "nigrani intel" : "analyst override"} • {msg.timestamp}
                              </p>
                              <p className={cn(
                                 "text-xs font-bold uppercase tracking-tighter leading-relaxed",
                                 msg.role === "bot" ? "text-gray-400 italic" : "text-white"
                              )}>
                                 "{msg.content}"
                              </p>
                           </div>
                        </div>
                     ))}
                     
                     {isTyping && (
                        <div className="flex gap-6 max-w-2xl">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                              <Bot size={16} className="text-gray-400" />
                           </div>
                           <div className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" />
                              <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1 h-1 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                           </div>
                        </div>
                     )}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-8 border-t border-white/5">
                     <div className="relative">
                        <input 
                          type="text" 
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="query the intelligence node..."
                          className="w-full bg-white/[0.03] border border-white/5 rounded-full py-5 px-8 pr-20 outline-none focus:border-[#00FF00]/30 transition-all text-xs font-bold uppercase tracking-tighter"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                           <Button type="submit" size="sm" className="h-10 w-10 p-0 rounded-full flex items-center justify-center">
                              <Send size={16} />
                           </Button>
                        </div>
                     </div>
                  </form>
               </GlassCard>
           </div>

           {/* Right: Intel Sidebar */}
           <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
              <GlassCard className="space-y-6">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">active research</p>
                 <div className="space-y-4">
                    {[
                      { icon: Activity, label: "cluster audit", val: "active" },
                      { icon: TrendingUp, label: "pattern match", val: "94%" },
                      { icon: GlobeIcon, label: "origin drift", val: "detected" },
                    ].map((item, i) => (
                       <div key={i} className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-[#00FF00]/20 transition-all cursor-pointer group">
                          <div className="flex items-center gap-3">
                             <item.icon size={16} className="text-gray-500 group-hover:text-[#00FF00]" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#00FF00]">{item.val}</span>
                       </div>
                    ))}
                 </div>
              </GlassCard>

              <GlassCard 
                  onClick={handleGenerateReport}
                  className="flex-1 bg-[#00FF00] text-black border-none flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all active:scale-[0.98]"
               >
                 <div className="z-10">
                    <p className="text-[10px] font-black text-black/40 uppercase tracking-widest">quick action</p>
                    <h3 className="text-4xl font-bold font-heading tracking-tighter lowercase leading-tight">generate <br /> intel report</h3>
                 </div>
                 <div className="flex justify-between items-end z-10">
                    <p className="text-[8px] font-black uppercase tracking-widest text-black/60">pdf/json available</p>
                    <ArrowRight size={24} className="text-black/40 group-hover:translate-x-1 transition-transform" />
                 </div>
                 <Sparkles size={100} className="absolute right-[-20px] top-[-20px] text-black/5" />
              </GlassCard>
           </div>
        </div>
      </main>
    </div>
  );
}
