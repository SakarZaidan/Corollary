import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../utils/cn";
import katex from "katex";

// Import KaTeX CSS in your main CSS file or add it here
import "katex/dist/katex.min.css";

interface MathEquationProps {
  equation: string;
  description?: string;
  className?: string;
  animated?: boolean;
  displayMode?: boolean;
  onHover?: () => void;
  animationVariant?: "fade" | "scale" | "highlight" | "pulse";
  animationDelay?: number;
}

const MathEquation: React.FC<MathEquationProps> = ({
  equation,
  description,
  className,
  animated = true,
  displayMode = true,
  onHover,
  animationVariant = "fade",
  animationDelay = 0,
}) => {
  const katexElementRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Define animation variants
  const variants = {
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      hover: { scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      hover: { scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" },
    },
    highlight: {
      initial: { opacity: 0, backgroundColor: "rgba(255, 255, 255, 0)" },
      animate: { opacity: 1, backgroundColor: "rgba(255, 255, 255, 0)" },
      hover: {
        backgroundColor: [
          "rgba(255, 255, 255, 0)",
          "rgba(124, 58, 237, 0.1)",
          "rgba(255, 255, 255, 0)",
        ],
        transition: { duration: 1.5, repeat: 0 },
      },
    },
    pulse: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      hover: {
        scale: [1, 1.02, 1],
        boxShadow: [
          "0 4px 12px rgba(0, 0, 0, 0.05)",
          "0 12px 24px rgba(0, 0, 0, 0.15)",
          "0 4px 12px rgba(0, 0, 0, 0.05)",
        ],
        transition: { duration: 1.2, repeat: Infinity, repeatType: "reverse" },
      },
    },
  };

  // Get the current variant
  const currentVariant = variants[animationVariant];

  useEffect(() => {
    if (katexElementRef.current) {
      try {
        katex.render(equation, katexElementRef.current, {
          displayMode: displayMode,
          throwOnError: false,
          errorColor: "#f44336",
          macros: {
            "\\RR": "\\mathbb{R}",
            "\\NN": "\\mathbb{N}",
            "\\ZZ": "\\mathbb{Z}",
          },
        });
      } catch (error) {
        console.error("KaTeX rendering error:", error);
      }
    }
  }, [equation, displayMode]);

  useEffect(() => {
    if (animated) {
      controls.start("animate");
    }
  }, [animated, controls]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover();
    if (animated) controls.start("hover");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (animated) controls.start("animate");
  };

  return (
    <motion.div
      className={cn(
        "rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 transition-all",
        isHovered ? "z-10" : "z-0",
        className
      )}
      initial={animated ? currentVariant.initial : false}
      animate={controls}
      variants={currentVariant}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: animationDelay }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-x-auto">
        {/* Decorative elements that appear on hover */}
        {animated && isHovered && (
          <>
            <motion.div
              className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-purple-500 opacity-70"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-teal-500 opacity-70"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </>
        )}

        <div
          ref={katexElementRef}
          className={cn(
            "text-primary-dark dark:text-primary-light transition-all",
            isHovered ? "text-black dark:text-white" : ""
          )}
        />
      </div>
      {description && (
        <motion.p
          className="text-sm text-neutral dark:text-neutral-light mt-3"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default MathEquation;
