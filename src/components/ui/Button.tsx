import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-[#00FF00] text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 glow-neon",
    secondary: "bg-white text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95",
    outline: "border border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold",
    ghost: "hover:bg-white/5 text-white uppercase tracking-widest text-[10px] font-bold",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-10 py-5 text-sm",
  };

  return (
    <button
      className={cn(
        "rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
