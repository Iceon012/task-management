"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
// import { useRouter } from 'next/router';
import { Eye } from "lucide-react";
import {} from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data);
    if (error) {
      setError(error.message);
    }
    else {
        router.push('/portal/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950">
      <Card className="w-full max-w-[1000px] grid md:grid-cols-2 overflow-hidden">
        <div className="relative hidden md:flex items-center justify-center p-6 bg-white">
          {/* <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-g0wOzHBtqFJsUOfLjx8TEWvBLDnCix.png"
          alt="Login illustration"
          width={400}
          height={400}
          className="w-full max-w-[400px]"
        /> */}
        </div>
        <div className="p-8 md:p-12">
          <div className="flex justify-end mb-8">
            <div className="size-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M12 4L4 20M12 4L20 20M12 4V20"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome back!
              </h1>
              <p className="text-gray-500">Please enter your details</p>
            </div>
            {error ? (
              <div className="space-y-2">
                <div className="p-4 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              </div>
            ) : null}

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Eye className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-500">
                    Remember for 30 days
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  Log In
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2">
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  Log in with Google
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-gray-900 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
