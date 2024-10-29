import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import './label.css'; // Import your CSS file

const Label = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={`label ${className}`} // Apply CSS classes
      {...rest}
    />
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
