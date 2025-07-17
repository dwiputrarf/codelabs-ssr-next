"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, ChevronLeftCircle, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-20">
          <div className="w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse absolute top-1/4 right-1/4"></div>
          <div className="w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000 absolute bottom-1/4 left-1/4"></div>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-card/80 backdrop-blur-xl border-border shadow-2xl shadow-primary/10">
        <CardHeader className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-2 text-foreground transition-all"
            >
              <ChevronLeftCircle className="w-6 h-6" />
            </Button>
          </CardHeader>

          <CardHeader className="flex flex-col items-center space-y-4 text-center">
            <Link href="/" className="block">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg shadow-primary/25 flex items-center justify-center">
                <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Link>

            <CardTitle className="text-2xl font-bold text-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-muted-foreground"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-muted/50 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 focus:ring-primary/20"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-muted-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-muted/50 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 focus:ring-primary/20"
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Button
                variant="link"
                className="text-sm text-primary hover:text-primary/80 p-0 h-auto"
              >
                Forgot password?
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary text-background font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none shadow-lg shadow-primary/25"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card/80 px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <Button
              variant="outline"
              className="w-full bg-muted/50 border-border text-foreground hover:bg-muted hover:text-foreground flex items-center justify-center space-x-2"
            >
              <Image
                src="/icons/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              <span>Continue with Google</span>
            </Button>
          </CardContent>

          <CardFooter>
            <div className="w-full text-center">
              <p className="text-muted-foreground text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register">
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                  >
                    Sign up
                  </Button>
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
