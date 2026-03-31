import React from "react";

export const GrainyOverlay = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-150 z-[9999]" 
      style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
    />
  );
};
