"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, ChevronRight } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";
import { Input, PasswordInput, Checkbox, Button } from "@/components";

import { loginUser } from "@/lib/services/userService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { showNotification } = useNotificationStore();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = React.useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(formData.email, formData.password);
      showNotification({
        message: "Login successful! Redirecting...",
        type: "success",
      });

      router.push("dashboard");
    } catch (error) {
      showNotification({
        message: "Invalid email or password.",
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center p-6 selection:bg-secondary/20">
      {/* 1. Brand Identity */}
      <header className="text-center mb-10 animate-fade-in">
        <div className="bg-primary w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-primary/20 transition-transform hover:scale-105">
          <div className="w-6 h-4 border-2 border-white rounded-[3px] relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">
          Atelier Finance
        </h1>
        <p className="text-neutral-400 text-sm mt-1.5 font-medium">
          Elevated insights for the modern steward.
        </p>
      </header>

      {/* 2. Authentication Card */}
      <main className="w-full max-w-120 bg-white rounded-md shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-neutral-100 p-10 md:p-12 animate-slide-up">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-1">Welcome back</h2>
          <p className="text-neutral-400 text-sm font-medium">
            Please enter your details to access your atelier.
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="relative mb-10 text-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-100"></span>
          </div>
          <span className="relative bg-white px-5 text-[10px] font-bold text-neutral-300 uppercase tracking-[0.2em]">
            login with email and password
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-7">
          <Input
            label="Email Address"
            type="email"
            placeholder="steward@atelier.finance"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={loading}
          />

          <PasswordInput
            label="Password"
            showForgot={true}
            disabled={loading}
            placeholder="••••••••"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <div className="px-1">
            <Checkbox id="remember" label="Keep me logged in for 30 days" />
          </div>

          <Button
            className="w-full"
            variant="primary"
            size="md"
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
            disabled={loading || !formData.email || !formData.password}
          >
            Sign In to Dashboard
          </Button>
        </form>

        <footer className="mt-10 text-center">
          <p className="text-sm text-neutral-500 font-medium">
            New to Atelier?
            <Link
              href="/register"
              className="text-secondary font-bold hover:underline ml-2 transition-all"
            >
              Create an account
            </Link>
          </p>
        </footer>
      </main>

      {/* 3. Trust Indicators */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        <div className="flex items-center gap-2.5 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
          <ShieldCheck className="w-4 h-4 text-neutral-300" /> Bank-grade
          security
        </div>
        <div className="flex items-center gap-2.5 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
          <Lock className="w-4 h-4 text-neutral-300" /> 256-bit encryption
        </div>
      </div>

      {/* 4. Utility Footer */}
      <footer className="mt-auto w-full max-w-6xl pt-16 pb-10 flex flex-col md:flex-row justify-between items-center border-t border-neutral-100 text-neutral-400 text-[10px] font-bold uppercase tracking-[0.15em] gap-6">
        <p className="order-2 md:order-1">
          © 2026 ATELIER FINANCE. ALL RIGHTS RESERVED.
        </p>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 order-1 md:order-2">
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link
            href="/cookies"
            className="hover:text-primary transition-colors"
          >
            Cookie Settings
          </Link>
          <Link
            href="/security"
            className="hover:text-primary transition-colors"
          >
            Security Documentation
          </Link>
        </nav>
      </footer>
    </div>
  );
}

/**
 * Local Helper Component for Social Auth
 */
function SocialButton({ provider }: { provider: "Google" | "Apple" }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-neutral-50 border border-neutral-100 hover:bg-neutral-100 hover:border-neutral-200 transition-all text-sm font-bold text-primary active:scale-[0.97]"
    >
      {/* Placeholder for Provider Icon */}
      <div className="w-4 h-4 bg-neutral-300 rounded-[4px]" />
      {provider}
    </button>
  );
}
