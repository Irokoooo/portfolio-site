'use client';
// 通用外链按钮组件：欧式 Emboss 填充效果
// Hover：背景填满 seed-shadow，文字反色 milk-white，轻微按压感 scale-95
import { motion } from "framer-motion";

interface ExternalLinkButtonProps {
  href: string;
  label: string;
}

export function ExternalLinkButton({ href, label }: ExternalLinkButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 0.97 }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="inline-flex items-center gap-1.5 text-xs
        text-seed-shadow border border-seed-shadow/30
        px-3 py-1.5 rounded
        bg-transparent
        hover:bg-seed-shadow hover:text-milk-white hover:border-seed-shadow
        transition-all duration-300 group"
    >
      {label}
      <svg
        className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </motion.a>
  );
}
