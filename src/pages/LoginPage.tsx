import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleButton } from "../components/auth/GoogleButton";
import { Button } from "../components/ui/Button";
import { useUserStore } from "../store/userStore";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loginWithGoogle, isAuthenticated, isLoading } = useUserStore();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    
    const { error: loginError } = await login(email, password);
    
    if (loginError) {
      setError(loginError.message || "An error occurred during login");
    }
  }

  async function handleGoogleLogin() {
    setError("");
    const { error: googleError } = await loginWithGoogle();
    
    if (googleError) {
      setError(googleError.message || "An error occurred with Google login");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-purple to-accent-teal p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center text-white"
        >
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome to Corollary</h1>
            <p className="text-xl opacity-90 max-w-md mx-auto leading-relaxed">
              Visualize complex mathematical concepts with interactive 3D models and real-time parameter controls.
            </p>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-8 w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm animate-pulse delay-700"></div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="lg:hidden mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-purple to-accent-teal rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-50/80 rounded-2xl flex items-center justify-center z-10">
                <div className="w-8 h-8 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-400"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                </div>
              </div>

              <GoogleButton onClick={handleGoogleLogin} className="w-full" />
            </form>

            <div className="mt-6 text-center">
               <p className="text-gray-600">
                 Don't have an account?{' '}
                 <Link to="/signup" className="text-accent-purple hover:text-accent-purple/80 font-medium transition-colors">
                   Sign up
                 </Link>
               </p>
             </div>
           </div>
         </motion.div>
       </div>
    </div>
  );
}
