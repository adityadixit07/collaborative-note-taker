import React, { useState } from "react";
import { BookOpen, Users, Share2, ChevronRight, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import logo from "../../assets/images/logo.webp";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const response = await axios.post(
        `http://localhost:4000/user${endpoint}`,
        payload
      );

      if (response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        window.location.href = "/notes";
      }
    } catch (err) {
      setError(err?.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const FeatureCard = ({ icon: Icon, title, description, index }) => (
    <div
      className="relative p-6 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm
        border border-white border-opacity-20 hover:bg-opacity-20"
      onMouseEnter={() => setIsHovered(index)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2">{title}</h3>
          <p className="text-blue-100">{description}</p>
        </div>
      </div>
      <ChevronRight
        className={`absolute right-4 bottom-4 w-5 h-5 transition-opacity
          ${isHovered === index ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3">CollabNote</h1>
              <p className="text-xl text-blue-100">
                Your collaborative note-taking workspace
              </p>
            </div>
            <img
              src={logo}
              alt="logo"
              className="h-32 w-32 rounded-md border-2 border-white"
            />
          </div>
        </div>

        <div className="space-y-6">
          <FeatureCard
            icon={Users}
            title="Real-time Collaboration"
            description="Work together with your team in real-time."
            index={0}
          />
          <FeatureCard
            icon={BookOpen}
            title="Smart Organization"
            description="Organize notes with tags and folders."
            index={1}
          />
          <FeatureCard
            icon={Share2}
            title="Easy Sharing"
            description="Share notes with anyone, anywhere."
            index={2}
          />
        </div>

        <div className="text-sm text-blue-100">
          © 2024 CollabNote. All rights reserved.
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-lg text-gray-600">
              {isLogin ? "Sign in to your account" : "Start your journey"}
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-50">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-lg"
          >
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium
                ${isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </div>
              ) : isLogin ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setEmail("");
                setPassword("");
                setName("");
              }}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
