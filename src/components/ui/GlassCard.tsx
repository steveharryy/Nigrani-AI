import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const GlassCard = ({ children, className, active, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-[2rem] p-8 transition-all duration-500 hover:scale-[1.02] hover:border-white/20",
        active && "border-[#00FF00]/50 glow-neon",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
