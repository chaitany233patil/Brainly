import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

export const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/signup`,
        {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }
      );
      if (response.data.success) {
        setSuccess("Account created successfully! Redirecting to DashBoard...");
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

          // Navigate to dashboard/home
          navigate("/");
        } else {
          setTimeout(() => {
            navigate("/singin");
          }, 1000);
        }
      }
    } catch (err: any) {
      console.error("Signup error:", err);

      // Handle different error scenarios
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 411) {
        setError("Please check your input and try again");
      } else if (err.response?.status === 400) {
        setError("User already exists!");
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
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-90"></div>

      {/* Main container */}
      <div className="fixed inset-0 flex flex-col gap-4 justify-center items-center p-4">
        {/* note */}
        <div className="max-w-sm bg-neutral-100/30 bg-opacity-70 backdrop-blur-md rounded-lg p-4">
          <p className="text-sm leading-4 text-center">
            <b>Note:</b> Our app is hosted on a free server. The first request
            may take 50–60 seconds to load, but it will be fast after that.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join us today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e: { target: { value: string } }) =>
                  handleInputChange("username", e.target.value)
                }
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

            {/* Success message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm"
              >
                {success}
              </motion.div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              varient="primary"
              size="lg"
              text={isLoading ? "Creating Account..." : "Sign up"}
              fullsize="w-full"
              loading={isLoading}
              className="mt-6"
            />

            {/* Sign in link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                  disabled={isLoading}
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};
