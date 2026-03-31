"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Lock, ArrowRight, Globe as GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    toast.loading("Authenticating with Nigrani Security Node...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("Access Granted. Welcome back, Admin.");
      router.push("/dashboard");
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-violet-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center gap-3 group justify-center mb-12">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold tracking-tight">
              Nigrani AI
            </span>
            <span className="text-[10px] text-cyan-400 font-medium tracking-widest mt-[-4px]">
              निगरानी AI
            </span>
          </div>
        </Link>

        <GlassCard className="space-y-8 p-8 border-white/5 glow-purple">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold font-heading">Welcome Back</h1>
            <p className="text-sm text-gray-500">Enter your credentials to access the security portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Work Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="admin@nigrani.ai"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-violet-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
                  <Link href="#" className="text-[10px] text-violet-400 font-bold hover:underline">Forgot?</Link>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-violet-500/50 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 group">
                {loading ? "Authenticating..." : "Login to Portal"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <Button variant="outline" className="w-full flex items-center justify-center gap-3">
              <GlobeIcon size={18} /> SSO Single Sign-on
            </Button>
        </GlassCard>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have an account? <Link href="/signup" className="text-violet-400 font-bold hover:underline">Request Access</Link>
        </p>
      </div>
    </div>
  );
}
