"use client";
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { 
  ShieldCheck, ShieldAlert, Activity, TrendingUp, 
  Search, Bell, ArrowUpRight, ArrowDownRight, 
  BarChart3, PieChart as PieChartIcon, Clock, Filter
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { toast } from "sonner";

const mockData = [
  { name: "00:00", alerts: 12 },
  { name: "04:00", alerts: 8 },
  { name: "08:00", alerts: 25 },
  { name: "12:00", alerts: 18 },
  { name: "16:00", alerts: 45 },
  { name: "20:00", alerts: 30 },
  { name: "23:59", alerts: 15 },
];

const pieData = [
  { name: "Safe", value: 85, color: "#22c55e" },
  { name: "Suspicious", value: 10, color: "#eab308" },
  { name: "Fraud", value: 5, color: "#ef4444" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#000000] text-white nitro-grid">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        {/* Header */}
        <header className="flex justify-between items-end mb-16 border-b border-white/5 pb-8">
          <div>
            <p className="text-[10px] font-black text-[#00FF00] uppercase tracking-[0.3em] mb-2">node status: active</p>
            <h1 className="text-6xl font-bold font-heading tracking-tighter lowercase">surveillance <br /> <span className="text-gray-600">overview.</span></h1>
          </div>
          <div className="flex gap-4">
             <div 
                onClick={() => toast.info("Global Search: System indexed 10k nodes.")}
                className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-[#00FF00]/50 transition-all cursor-pointer active:scale-95"
             >
                <Search size={20} className="text-gray-400" />
             </div>
             <div 
                onClick={() => toast.success("No new critical alerts in the last 15 mins.")}
                className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-[#00FF00]/50 transition-all cursor-pointer relative active:scale-95"
             >
                <Bell size={20} className="text-gray-400" />
                <span className="absolute top-4 right-4 w-2 h-2 bg-[#00FF00] rounded-full border-2 border-black" />
             </div>
          </div>
        </header>

        {/* --- NITRO GRID LAYOUT --- */}
        <div className="grid grid-cols-12 gap-1">
           {/* Main Chart - Large Card */}
           <div className="col-span-12 md:col-span-8">
              <GlassCard className="h-[450px] flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">surveillance metrics</p>
                      <h3 className="text-3xl font-bold font-heading tracking-tighter lowercase">fraud alerts trend</h3>
                   </div>
                   <div className="flex gap-2 text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 rounded-full px-3 py-1">
                      <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full" /> live feed
                   </div>
                </div>
                <div className="h-[250px] w-full mt-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#4b5563" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        tick={{ fill: '#4b5563', fontWeight: 'bold' }}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#000', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '1rem',
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          fontWeight: '900',
                          letterSpacing: '0.1em'
                        }}
                        itemStyle={{ color: '#00FF00' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="alerts" 
                        stroke="#00FF00" 
                        strokeWidth={3} 
                        dot={{ fill: '#00FF00', strokeWidth: 2, r: 4, stroke: '#000' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
           </div>

           {/* Distribution - Medium Card */}
           <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
              <GlassCard className="h-[224px] flex flex-col justify-between group">
                 <div className="flex justify-between">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">risk vector</p>
                    <PieChartIcon size={18} className="text-gray-600 group-hover:text-[#00FF00] transition-colors" />
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="w-24 h-24">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie data={pieData} innerRadius={30} outerRadius={45} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                             </Pie>
                          </PieChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="space-y-1">
                       <p className="text-3xl font-bold font-heading tracking-tighter">98.2%</p>
                       <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">network integrity</p>
                    </div>
                 </div>
              </GlassCard>

              <GlassCard className="h-[225px] flex flex-col justify-between bg-white text-black border-none">
                 <div className="flex justify-between">
                    <p className="text-[10px] font-black text-black/40 uppercase tracking-widest">threat level</p>
                    <ShieldAlert size={18} className="text-black/20" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-4xl font-bold font-heading tracking-tighter">stable</p>
                    <p className="text-[8px] text-black/40 font-bold uppercase tracking-widest">no critical breaches</p>
                 </div>
              </GlassCard>
           </div>

           {/* Metrics Row */}
           <div className="col-span-12 md:col-span-3 mt-1">
              <GlassCard className="h-[180px] flex flex-col justify-between">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">scanned txn</p>
                 <div className="space-y-1">
                    <p className="text-4xl font-bold font-heading tracking-tighter">128.4k</p>
                    <div className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                       <ArrowUpRight size={10} /> +12.5% vs avg
                    </div>
                 </div>
              </GlassCard>
           </div>
           <div className="col-span-12 md:col-span-3 mt-1">
              <GlassCard className="h-[180px] flex flex-col justify-between">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">fraud nodes</p>
                 <div className="space-y-1">
                    <p className="text-4xl font-bold font-heading tracking-tighter">042</p>
                    <div className="flex items-center gap-1 text-[8px] font-black text-red-500 uppercase tracking-widest">
                       <ArrowDownRight size={10} /> -2.1% low risk
                    </div>
                 </div>
              </GlassCard>
           </div>

           <div className="col-span-12 md:col-span-6 mt-1">
              <GlassCard className="h-[180px] flex flex-col justify-between overflow-hidden relative group">
                 <div className="z-10">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">system latency</p>
                    <p className="text-4xl font-bold font-heading tracking-tighter">0.014s</p>
                 </div>
                 <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#00FF00]/10 to-transparent" />
                 <Activity size={80} className="absolute right-[-20px] bottom-[-20px] text-white/5 group-hover:text-[#00FF00]/10 transition-colors duration-500" />
              </GlassCard>
           </div>

           {/* Surveillance Log Table */}
           <div className="col-span-12 mt-1">
              <GlassCard className="p-0 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                   <h3 className="text-2xl font-bold font-heading tracking-tighter lowercase">surveillance log</h3>
                   <div className="flex gap-4">
                      <button 
                         onClick={() => toast.info("Applying filters to surveillance log...")}
                         className="text-[8px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1 hover:text-white transition-colors active:translate-y-px"
                      >
                         <Filter size={10} /> filter
                      </button>
                      <button 
                         onClick={() => toast.info("Fetching transaction history...")}
                         className="text-[8px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1 hover:text-white transition-colors active:translate-y-px"
                      >
                         <Clock size={10} /> history
                      </button>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5 text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">
                          <th className="px-8 py-4">metadata id</th>
                          <th className="px-8 py-4">origin point</th>
                          <th className="px-8 py-4">val (inr)</th>
                          <th className="px-8 py-4">vector risk</th>
                          <th className="px-8 py-4">status</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs font-bold uppercase tracking-tighter">
                        {[
                          { id: "tx_091k2", origin: "mumbai_node_7", val: "12,450", risk: "0.02", status: "Safe" },
                          { id: "tx_091k3", origin: "delhi_ops_2", val: "4,500", risk: "0.45", status: "Suspicious" },
                          { id: "tx_091k4", origin: "blr_edge_1", val: "89,000", risk: "0.89", status: "Fraud" },
                          { id: "tx_091k5", origin: "hyd_node_9", val: "1,200", risk: "0.01", status: "Safe" },
                        ].map((row, i) => (
                          <tr 
                             key={i} 
                             onClick={() => toast.info(`Viewing details for ${row.id}`)}
                             className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                          >
                            <td className="px-8 py-6 font-mono text-gray-500">{row.id}</td>
                            <td className="px-8 py-6 text-white">{row.origin}</td>
                            <td className="px-8 py-6 font-mono">₹{row.val}</td>
                            <td className="px-8 py-6">
                               <div className="w-16 h-1 bg-white/10 rounded-full">
                                  <div 
                                    className={cn("h-full rounded-full", Number(row.risk) > 0.8 ? "bg-red-500" : Number(row.risk) > 0.4 ? "bg-amber-500" : "bg-emerald-500")} 
                                    style={{ width: `${Number(row.risk)*100}%` }} 
                                  />
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <StatusBadge status={row.status as any} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </GlassCard>
           </div>
        </div>
      </main>
    </div>
  );
}
