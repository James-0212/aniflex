import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", email, password);
    navigate("/login"); // Redirect to Login Page after signup
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div
        className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Sign Up
        </h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-warmOrange"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-warmOrange"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-warmOrange"
              required
            />
          </div>

          {/* Signup Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-warmRed transition-all"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="text-center text-white mt-4">
          Already have an account? 
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
