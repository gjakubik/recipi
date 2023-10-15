import React from "react";
import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn(className, "container mt-12")} {...props}>
      {children}
    </div>
  );
};

export { Container };
