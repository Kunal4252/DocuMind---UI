import React from "react";

const Button = ({ children, variant = "primary", ...props }) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-semibold text-sm transition-colors deuration-200";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
