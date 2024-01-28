import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  InputProps & { icon: React.ReactNode }
>(({ className, type, icon, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background pr-2 gap-2 items-center focus-visible:outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      <input
        type={type}
        className={cn(
          "px-3 py-2 text-sm  placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full",
          className
        )}
        ref={ref}
        {...props}
      />
      {icon}
    </div>
  );
});

export { Input, InputWithIcon };
