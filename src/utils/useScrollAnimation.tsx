import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Types for animation variants
export type ScrollAnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "zoomIn"
  | "scaleIn"
  | "staggered";

// Animation variants
export const scrollAnimationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  },
  staggered: {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  },
};

// Hook for scroll animations
export const useScrollAnimation = (
  variant: ScrollAnimationVariant = "fadeInUp",
  threshold = 0.1,
  triggerOnce = true
) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return { ref, controls, variants: scrollAnimationVariants[variant] };
};

// Component for animated elements
interface AnimatedElementProps {
  children: React.ReactNode;
  variant?: ScrollAnimationVariant;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  index?: number; // For staggered animations
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  variant = "fadeInUp",
  className = "",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  index = 0,
}) => {
  const { ref, controls, variants } = useScrollAnimation(
    variant,
    threshold,
    triggerOnce
  );

  // Custom transition with delay and duration
  const transition = {
    delay,
    duration,
    ease: "easeOut",
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      custom={index} // For staggered animations
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Component for staggered animations (for lists, grids, etc.)
interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  className = "",
  staggerDelay = 0.1,
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * staggerDelay,
          duration: 0.6,
        },
      }));
    }
  }, [controls, inView, staggerDelay]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {React.Children.map(children, (child, i) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            initial: { opacity: 0, y: 20 },
            custom: i,
          });
        }
        return child;
      })}
    </motion.div>
  );
};

export default useScrollAnimation;
