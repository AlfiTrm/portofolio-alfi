"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 overflow-hidden";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-purple-500 to-cyan-500 
      text-white 
      hover:shadow-lg hover:shadow-purple-500/30
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500 before:to-purple-500 
      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
    `,
    glass: `
      bg-white/10 backdrop-blur-md 
      border border-white/20 
      text-white 
      hover:bg-white/20 hover:border-white/30
    `,
    outline: `
      bg-transparent 
      border-2 border-purple-500 
      text-purple-400 
      hover:bg-purple-500/10 hover:text-purple-300
    `,
  };

  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
}
