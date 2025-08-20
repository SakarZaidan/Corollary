import React from "react";
import { cn } from "../../utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hover?: boolean;
  interactive?: boolean;
  glowOnHover?: boolean;
  borderGradient?: boolean;
  elevate?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      gradient = false,
      hover = false,
      interactive = false,
      glowOnHover = false,
      borderGradient = false,
      elevate = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-neutral-light/20 bg-secondary-dark p-6 shadow-sm relative",
          gradient && "bg-gradient-to-br from-primary-dark to-secondary-dark",
          hover && "transition-all duration-300 ease-out hover:shadow-md",
          interactive &&
            "cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md",
          glowOnHover && "group overflow-hidden",
          borderGradient &&
            "border-transparent before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-br before:from-accent-purple before:to-accent-teal before:-z-10",
          elevate &&
            "transition-all duration-500 hover:shadow-xl hover:-translate-y-2",
          className
        )}
        {...props}
      >
        {glowOnHover && (
          <div className="absolute -inset-40 opacity-0 group-hover:opacity-100 blur-3xl bg-gradient-to-br from-accent-purple/30 via-transparent to-accent-teal/30 transition-opacity duration-500 -z-10"></div>
        )}
        {props.children}
      </div>
    );
  }
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold leading-tight tracking-tight text-white",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-neutral-light", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
