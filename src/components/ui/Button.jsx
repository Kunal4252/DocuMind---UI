import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const Button = ({
  children,
  variant = "primary",
  loading = false,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200 relative";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner size="sm" />
        </span>
      )}
      <span className={loading ? "opacity-0" : ""}>{children}</span>
    </button>
  );
};

export default Button;
