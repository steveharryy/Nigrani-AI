import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  status: "Safe" | "Suspicious" | "Fraud";
  className?: string;
}

export const StatusBadge = ({ status, className }: BadgeProps) => {
  const colors = {
    Safe: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Suspicious: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Fraud: "bg-red-500/10 text-red-500 border-red-500/20 font-bold",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-semibold border",
        colors[status],
        className
      )}
    >
      {status}
    </span>
  );
};
