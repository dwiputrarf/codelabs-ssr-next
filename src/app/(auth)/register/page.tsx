"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Check,
  ChevronLeftCircle,
} from "lucide-react";
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

const RegisterScreen = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registration attempted with:", formData);
    }, 2500);
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    passwordsMatch &&
    acceptTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-20">
          <div className="w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse absolute top-1/3 left-1/3"></div>
          <div className="w-80 h-80 bg-yellow-400/15 rounded-full blur-2xl animate-pulse delay-1000 absolute bottom-1/3 right-1/3"></div>
          <div className="w-64 h-64 bg-yellow-400/10 rounded-full blur-xl animate-pulse delay-2000 absolute top-1/2 right-1/4"></div>
        </div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-black/80 backdrop-blur-xl border-yellow-400/20 shadow-2xl shadow-yellow-400/10">
          <CardHeader className="flex items-center ml-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-2 text-white transition-all"
            >
              <ChevronLeftCircle className="w-6 h-6" />
            </Button>
          </CardHeader>

          <CardHeader className="flex flex-col items-center space-y-4 text-center">
            <Link href="/" className="block">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-400/25 flex items-center justify-center">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </Link>

            <CardTitle className="text-2xl font-bold text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-400">
              Join us today and get started
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-300"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-300"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pl-10 pr-10 bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                  placeholder="Create a strong password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-yellow-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < passwordStrength
                            ? passwordStrength <= 2
                              ? "bg-red-500"
                              : passwordStrength <= 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {passwordStrength <= 2 && "Weak password"}
                    {passwordStrength === 3 && "Medium password"}
                    {passwordStrength >= 4 && "Strong password"}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-300"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`pl-10 pr-10 bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:ring-yellow-400/20 ${
                    formData.confirmPassword && !passwordsMatch
                      ? "border-red-500/50"
                      : ""
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-yellow-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                {passwordsMatch && (
                  <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                )}
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-400">
                  Passwords don&apos;t match
                </p>
              )}
            </div>

            {/* Terms and Marketing Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) =>
                    setAcceptTerms(checked === true)
                  }
                  className="border-gray-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-0.5"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-400 cursor-pointer leading-5"
                >
                  I agree to the{" "}
                  <Button
                    variant="link"
                    className="text-yellow-400 hover:text-yellow-300 p-0 h-auto text-sm"
                  >
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button
                    variant="link"
                    className="text-yellow-400 hover:text-yellow-300 p-0 h-auto text-sm"
                  >
                    Privacy Policy
                  </Button>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketing"
                  checked={acceptMarketing}
                  onCheckedChange={(checked) =>
                    setAcceptMarketing(checked === true)
                  }
                  className="border-gray-600 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-0.5"
                />
                <Label
                  htmlFor="marketing"
                  className="text-sm text-gray-400 cursor-pointer leading-5"
                >
                  Send me updates about new features and promotions
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none shadow-lg shadow-yellow-400/25 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/80 px-2 text-gray-400">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <Button
              variant="outline"
              className="w-full bg-gray-900/50 border-gray-700/50 text-white hover:bg-gray-800/50 hover:text-white flex items-center justify-center space-x-2"
            >
              <Image
                src="/icons/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="invert"
              />
              <span>Continue with Google</span>
            </Button>
          </CardContent>

          <CardFooter>
            <div className="w-full text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link href="/login">
                  <Button
                    variant="link"
                    className="text-yellow-400 hover:text-yellow-300 p-0 h-auto font-medium"
                  >
                    Sign in
                  </Button>
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
