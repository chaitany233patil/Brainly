import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SigninFormData {
  username: string;
  password: string;
}

export const Signin = () => {
  const [formData, setFormData] = useState<SigninFormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (field: keyof SigninFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setError("Username or email is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/signin`,
        {
          username: formData.username.trim(),
          password: formData.password,
        }
      );
      if (response.data.success && response.data?.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);

        // Clear form
        setFormData({ username: "", password: "" });

        // Navigate to dashboard/home
        navigate("/");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Signin error:", err);

      // Handle different error scenarios
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError("Invalid username or password");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (err.code === "NETWORK_ERROR") {
        setError("Network error. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-400 to-blue-600 opacity-90"></div>

      {/* Main container */}
      <div className="fixed inset-0 flex justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              varient="primary"
              size="lg"
              text={isLoading ? "Signing In..." : "Sign In"}
              fullsize="w-full"
              loading={isLoading}
              className="mt-6"
            />

            {/* Forgot password & Sign up links */}
            <div className="text-center space-y-2 mt-4">
              <div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                  disabled={isLoading}
                >
                  Forgot your password?
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                    disabled={isLoading}
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};
