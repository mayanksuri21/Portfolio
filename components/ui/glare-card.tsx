"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function GlareCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });
    setIsHovered(true);
  };

  const handleLeave = () => setIsHovered(false);

  return (
    <motion.article
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -4, scale: 1.004, transition: { duration: 0.25 } }}
      initial={false}
      className={`glare-card ${className}`.trim()}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="glare-layer"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.24), rgba(255,255,255,0.08) 28%, transparent 62%)`,
        }}
      />
      {children}
    </motion.article>
  );
}
