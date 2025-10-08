"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { validateUserId, validatePassword, validatePin } from "@/lib/api-service";

type LoginStep = "userId" | "password" | "pin";

export default function LoginPage() {
  // Step management
  const [currentStep, setCurrentStep] = useState<LoginStep>("userId");
  
  // Form fields
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [securityImageConfirmed, setSecurityImageConfirmed] = useState(false);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [securityImage, setSecurityImage] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Step 1: Validate User ID
  const handleValidateUserId = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await validateUserId(userId);
      
      if (response.success) {
        setSecurityImage(response.securityImage || "");
        setCurrentStep("password");
      } else {
        setError(response.message || "Invalid User ID");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Validate Password
  const handleValidatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!securityImageConfirmed) {
      setError("Please confirm your security image");
      return;
    }

    setIsLoading(true);

    try {
      const response = await validatePassword(userId, password, securityImageConfirmed);
      
      if (response.success) {
        setSessionToken(response.sessionToken || "");
        setCurrentStep("pin");
      } else {
        setError(response.message || "Invalid Password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Validate PIN
  const handleValidatePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await validatePin(userId, pin, sessionToken);
      
      if (response.success) {
        // Store token and redirect to dashboard
        if (response.token) {
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
        }
        
        // Redirect to dashboard or home
        window.location.href = "/dashboard";
      } else {
        setError(response.message || "Invalid PIN");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Back button handler
  const handleBack = () => {
    setError("");
    if (currentStep === "password") {
      setCurrentStep("userId");
      setPassword("");
      setSecurityImageConfirmed(false);
      setSecurityImage("");
    } else if (currentStep === "pin") {
      setCurrentStep("password");
      setPin("");
    }
  };

  // Get step title
  const getStepTitle = () => {
    switch (currentStep) {
      case "userId":
        return "Login to start trading";
      case "password":
        return `Validate User ${userId}`;
      case "pin":
        return userId;
      default:
        return "Login";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-4 bg-foreground/5">
      <div className="w-full -mt-80 max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-foreground/60 hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex justify-center">
              <Image
                src="/logo/mainlogo.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </CardTitle>
            <CardDescription className="text-center">
              {getStepTitle()}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Step 1: User ID Validation */}
            {currentStep === "userId" && (
              <form onSubmit={handleValidateUserId} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    type="text"
                    placeholder="Enter your User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Validating..." : "VALIDATE"}
                </Button>
              </form>
            )}

            {/* Step 2: Password and Security Image */}
            {currentStep === "password" && (
              <form onSubmit={handleValidatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userIdDisplay">User ID</Label>
                  <Input
                    id="userIdDisplay"
                    type="text"
                    value={userId}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Security Image */}
                {securityImage && (
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 p-3 border rounded-md">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={securityImage}
                          alt="Security Image"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Checkbox
                          id="securityConfirm"
                          checked={securityImageConfirmed}
                          onChange={(e) => setSecurityImageConfirmed(e.target.checked)}
                          label="Please confirm your secure access image"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    BACK
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "SUBMIT"}
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: PIN Entry */}
            {currentStep === "pin" && (
              <form onSubmit={handleValidatePin} className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 mb-2">
                    {userId.substring(0, 2).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium">{userId}</p>
                  <Link
                    href="#"
                    className="text-xs text-orange-500 hover:text-orange-600 mt-1"
                  >
                    Not you? Switch account
                  </Link>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pin">Enter PIN</Label>
                  <div className="relative">
                    <Input
                      id="pin"
                      type={showPin ? "text" : "password"}
                      placeholder="Enter your PIN"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                      disabled={isLoading}
                      maxLength={6}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "SUBMIT"}
                </Button>

                <div className="text-center">
                  <Link
                    href="#"
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Forgot PIN?
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
