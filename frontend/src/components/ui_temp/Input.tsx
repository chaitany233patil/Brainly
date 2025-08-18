import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  reference?: React.Ref<HTMLInputElement>;
  className?: string;
  type?: string;
  disabled?: boolean;
  id?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: any) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      size = "md",
      type = "text",
      className = "",
      disabled = false,
      reference,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Use either the forwarded ref or the reference prop
    const inputRef = ref || reference;

    // Handle password visibility toggle
    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;

    // Size classes
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-sm",
      lg: "px-4 py-4 text-base",
    };

    // Variant classes
    const variantClasses = {
      default: "border border-gray-300 bg-white",
      filled: "border border-transparent bg-gray-50",
      outlined: "border-2 border-gray-300 bg-transparent",
    };

    // Dynamic classes based on state
    const getInputClasses = () => {
      let classes = `
        w-full rounded-lg font-medium transition-all duration-200 ease-in-out
        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `;

      if (error) {
        classes += " border-red-500 focus:ring-red-500 focus:border-red-500";
      } else if (isFocused) {
        classes += " border-blue-500 focus:ring-blue-500 focus:border-blue-500";
      } else {
        classes +=
          " hover:border-gray-400 focus:ring-blue-500 focus:border-blue-500";
      }

      if (disabled) {
        classes += " bg-gray-100 cursor-not-allowed opacity-60";
      }

      if (leftIcon) {
        classes += " pl-11";
      }

      if (rightIcon || isPasswordType) {
        classes += " pr-11";
      }

      return classes.replace(/\s+/g, " ").trim();
    };

    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium mb-2 transition-colors ${
              error ? "text-red-700" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={inputRef}
            id={inputId}
            type={inputType}
            className={getInputClasses()}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* Right Icon or Password Toggle */}
          {(rightIcon || isPasswordType) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isPasswordType ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors p-1"
                  disabled={disabled}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              ) : (
                <div className="text-gray-400 pointer-events-none">
                  {rightIcon}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Helper Text or Error Message */}
        {(error || helperText) && (
          <div className="mt-2">
            {error ? (
              <p className="text-sm text-red-600 flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            ) : (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Example usage component for demonstration
export const InputExamples = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-8">
        Input Component Examples
      </h2>

      {/* Default Input */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, email: e.target.value }))
        }
        helperText="We'll never share your email with anyone else."
      />

      {/* Password Input with toggle */}
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, password: e.target.value }))
        }
        helperText="Must be at least 8 characters long."
      />

      {/* Input with error */}
      <Input
        label="Username"
        type="text"
        placeholder="Choose a username"
        value={values.username}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, username: e.target.value }))
        }
        error="Username is already taken"
      />

      {/* Different variants */}
      <div className="space-y-4">
        <Input
          label="Filled Variant"
          variant="filled"
          placeholder="Type something..."
        />

        <Input
          label="Outlined Variant"
          variant="outlined"
          placeholder="Type something..."
        />

        <Input label="Large Size" size="lg" placeholder="Large input..." />
      </div>

      {/* Disabled state */}
      <Input
        label="Disabled Input"
        placeholder="This is disabled"
        disabled
        value="Cannot edit this"
      />
    </div>
  );
};
