import React from "react";
import './Input.css'; // Import your CSS file

const Input = React.forwardRef((props, ref) => {
  const { className, type, ...rest } = props;

  return (
    <input
      type={type}
      className={`input ${className}`} // Apply CSS classes
      ref={ref}
      {...rest}
    />
  );
});

Input.displayName = "Input";

export { Input };
