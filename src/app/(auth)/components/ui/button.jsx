import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import './Button.css'; // Import your CSS file

const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={`button ${variant} ${size} ${className}`} // Apply CSS classes
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

