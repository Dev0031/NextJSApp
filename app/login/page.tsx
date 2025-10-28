"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    if (!isLogin && !fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name",
        variant: "destructive",
      })
      return false
    }

    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return false
    }

    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      console.log("[v0] Starting authentication:", isLogin ? "sign in" : "sign up")

      if (isLogin) {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, email, password)
        console.log("[v0] Sign in successful")
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in",
        })
      } else {
        // Register new user
        console.log("[v0] Creating user account...")
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log("[v0] User created, updating profile...")
        await updateProfile(userCredential.user, {
          displayName: fullName,
        })
        console.log("[v0] Profile updated successfully")
        toast({
          title: "Account created!",
          description: "Your account has been successfully created",
        })
      }
      router.push("/home")
    } catch (error: any) {
      console.error("[v0] Authentication error:", error.code, error.message)

      let errorMessage = "An error occurred. Please try again."

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please sign in instead."
      } else if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        errorMessage = "Invalid email or password. Please try again."
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email. Please sign up."
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password."
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address format."
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Email/Password authentication is not enabled. Please contact support."
      } else if (error.code === "auth/configuration-not-found" || error.message?.includes("Firebase")) {
        errorMessage = "Firebase is not properly configured. Please check your environment variables."
      }

      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">{isLogin ? "Welcome back" : "Create your account"}</h1>
          <p className="text-muted-foreground text-balance">
            {isLogin ? "Sign in to access your account" : "Get started with your new account"}
          </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>{isLogin ? "Sign In" : "Sign Up"}</CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to access your account"
                : "Fill in your details to create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isLoading}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                {!isLogin && <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>{isLogin ? "Sign In" : "Create Account"}</>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFullName("")
                  setEmail("")
                  setPassword("")
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                {isLogin ? (
                  <>
                    Don't have an account? <span className="font-semibold text-primary">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account? <span className="font-semibold text-primary">Sign in</span>
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
