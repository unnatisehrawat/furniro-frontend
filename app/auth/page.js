"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin 
        ? "http://localhost:5000/api/auth/login" 
        : "http://localhost:5000/api/auth/register";
      
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(endpoint, payload, { withCredentials: true });
      
      if (response.data.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      {isLogin ? (
        /* Login Form Container */
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-center mb-8">Login to access your account</p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand text-white py-3.5 rounded-xl font-semibold hover:bg-brand/90 transition-all shadow-md shadow-brand/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button 
              onClick={() => { setIsLogin(false); setError(""); }} 
              className="text-brand font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      ) : (
        /* Sign Up Form Container */
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
          <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-gray-500 text-center mb-8">Sign up to start shopping with us</p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand text-white py-3.5 rounded-xl font-semibold hover:bg-brand/90 transition-all shadow-md shadow-brand/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={() => { setIsLogin(true); setError(""); }} 
              className="text-brand font-semibold hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
