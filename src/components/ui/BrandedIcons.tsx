import React from 'react';
import { motion } from 'framer-motion';

// Base icon props interface
interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  secondaryColor?: string;
  animated?: boolean;
}

// Animation variants for icons
const iconAnimationVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.95,
    rotate: 0,
    transition: { duration: 0.1 },
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
  wave: {
    y: [0, -5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// Base icon component with animation
const AnimatedIcon: React.FC<IconProps & { children: React.ReactNode }> = ({
  className = '',
  size = 24,
  animated = true,
  children,
}) => {
  return animated ? (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover="hover"
      whileTap="tap"
      variants={iconAnimationVariants}
    >
      {children}
    </motion.svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {children}
    </svg>
  );
};

// Visualization Icon
export const VisualizationIcon: React.FC<IconProps> = (props) => {
  const { color = 'currentColor', secondaryColor = '#14b8a6', animated = true } = props;
  
  return (
    <AnimatedIcon {...props} animated={animated}>
      <motion.path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M4 9h16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M8 16s1.5-2 4-2 4 2 4 2"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={animated ? 'wave' : undefined}
        variants={iconAnimationVariants}
      />
    </AnimatedIcon>
  );
};

// Code Icon
export const CodeIcon: React.FC<IconProps> = (props) => {
  const { color = 'currentColor', secondaryColor = '#6d28d9', animated = true } = props;
  
  return (
    <AnimatedIcon {...props} animated={animated}>
      <motion.path
        d="M16 18l6-6-6-6"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={animated ? 'pulse' : undefined}
        variants={iconAnimationVariants}
      />
      <motion.path
        d="M8 6l-6 6 6 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </AnimatedIcon>
  );
};

// Math Icon
export const MathIcon: React.FC<IconProps> = (props) => {
  const { color = 'currentColor', secondaryColor = '#6d28d9', animated = true } = props;
  
  return (
    <AnimatedIcon {...props} animated={animated}>
      <motion.path
        d="M5 12h14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M12 5v14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={animated ? 'pulse' : undefined}
        variants={iconAnimationVariants}
      />
    </AnimatedIcon>
  );
};

// Graph Icon
export const GraphIcon: React.FC<IconProps> = (props) => {
  const { color = 'currentColor', secondaryColor = '#14b8a6', animated = true } = props;
  
  return (
    <AnimatedIcon {...props} animated={animated}>
      <motion.path
        d="M21 21H3V3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M21 9L15 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M7 14l4-4 3 3 4-4"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={animated ? 'wave' : undefined}
        variants={iconAnimationVariants}
      />
    </AnimatedIcon>
  );
};

// Data Icon
export const DataIcon: React.FC<IconProps> = (props) => {
  const { color = 'currentColor', secondaryColor = '#6d28d9', animated = true } = props;
  
  return (
    <AnimatedIcon {...props} animated={animated}>
      <motion.path
        d="M12 3v18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.rect
        x="5"
        y="8"
        width="4"
        height="8"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <motion.rect
        x="15"
        y="6"
        width="4"
        height="12"
        rx="1"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={animated ? 'pulse' : undefined}
        variants={iconAnimationVariants}
      />
    </AnimatedIcon>
  );
};

// Interactive Icon
export const InteractiveIcon: React.FC<IconProps> = (props) => {
  const { color = 'currentColor', secondaryColor = '#14b8a6', animated = true } = props;
  
  return (
    <AnimatedIcon {...props} animated={animated}>
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        stroke={secondaryColor}
        strokeWidth="1.5"
        fill="none"
        animate={animated ? 'pulse' : undefined}
        variants={iconAnimationVariants}
      />
      <motion.path
        d="M12 5V3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M12 21v-2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M5 12H3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M21 12h-2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </AnimatedIcon>
  );
};

// Export all icons as a collection
export const BrandedIcons = {
  Visualization: VisualizationIcon,
  Code: CodeIcon,
  Math: MathIcon,
  Graph: GraphIcon,
  Data: DataIcon,
  Interactive: InteractiveIcon,
};

export default BrandedIcons;