import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-purple text-white hover:bg-accent-purple/90 shadow-sm",
        destructive: "bg-error text-white hover:bg-error/90 shadow-sm",
        outline:
          "border border-accent-purple bg-transparent text-accent-purple hover:bg-accent-purple/10",
        secondary:
          "bg-secondary-main text-white hover:bg-secondary-main/90 shadow-sm",
        ghost: "text-accent-purple hover:bg-accent-purple/10",
        link: "text-accent-purple underline-offset-4 hover:underline",
        teal: "bg-accent-teal text-white hover:bg-accent-teal/90 shadow-sm",
        "teal-outline":
          "border border-accent-teal bg-transparent text-accent-teal hover:bg-accent-teal/10",
        "gradient": "bg-gradient-to-r from-accent-teal to-accent-purple text-white hover:from-accent-teal/90 hover:to-accent-purple/90 shadow-sm",
        "white": "bg-neutral-lightest text-primary-dark hover:bg-neutral-lightest/90 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
