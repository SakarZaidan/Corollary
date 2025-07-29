import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent-purple text-white',
        secondary: 'border-transparent bg-secondary-light text-primary-dark',
        destructive: 'border-transparent bg-red-500 text-white',
        outline: 'text-primary-dark',
        teal: 'border-transparent bg-accent-teal text-white',
        purple: 'border-transparent bg-accent-purple/10 text-accent-purple',
        'purple-solid': 'border-transparent bg-accent-purple text-white',
        'teal-light': 'border-transparent bg-accent-teal/10 text-accent-teal',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };