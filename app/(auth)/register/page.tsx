"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

import { Input, PasswordInput, Checkbox, Button } from "@/components";
import { registerUser } from "@/lib/services/userService";

export default function RegisterPage() {
  const { showNotification } = useNotificationStore();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await registerUser(formData.name, formData.email, formData.password);
      showNotification({
        message: "Account created successfully! Redirecting to login...",
        type: "success",
      });
    } catch (error) {
      showNotification({
        message: "Registration failed. Please try again.",
        type: "error",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col selection:bg-secondary/20 items-center">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <main className="w-full max-w-5xl bg-white rounded-md shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-neutral-100 overflow-hidden flex flex-col md:flex-row animate-slide-up">
          {/* Left Side: Editorial Branding */}
          <section className="w-full md:w-5/12 bg-[#4B5563] p-12 flex flex-col justify-between text-white relative">
            <div className="space-y-6 relative z-10">
              <h1 className="text-3xl font-bold tracking-tight">
                Atelier Finance
              </h1>
              <div className="space-y-4">
                <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight">
                  Elevate your wealth <br /> to an art form.
                </h2>
                <p className="text-neutral-300 text-lg font-medium leading-relaxed max-w-sm">
                  Join an exclusive circle of investors using editorial-grade
                  data visualization to master their fiscal future.
                </p>
              </div>
            </div>

            {/* Projected Growth Mock Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mt-12 relative z-10">
              <div className="flex items-end gap-2 h-24 mb-4">
                <div className="flex-1 bg-white/20 rounded-t-sm h-[40%]" />
                <div className="flex-1 bg-white/20 rounded-t-sm h-[60%]" />
                <div className="flex-1 bg-white/20 rounded-t-sm h-[50%]" />
                <div className="flex-1 bg-white/40 rounded-t-sm h-[80%]" />
                <div className="flex-1 bg-secondary rounded-t-sm h-full" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  Projected Portfolio Growth
                </span>
                <span className="text-secondary font-bold text-lg">+24.8%</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mt-12 relative z-10">
              <ShieldCheck className="w-4 h-4" /> Bank-grade 256-bit encryption
            </div>
          </section>

          {/* Right Side: Registration Form */}
          <section className="w-full md:w-7/12 p-10 md:p-16 flex flex-col">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-primary mb-2">
                Create Account
              </h2>
              <p className="text-neutral-400 text-sm font-medium">
                Start your journey into the Fiscal Atelier.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-7 flex-1">
              <Input
                label="Full Name"
                placeholder="Alexander Hamilton"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="alex@atelier.finance"
                required
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />

              <PasswordInput
                label="Password"
                placeholder="••••••••••••"
                required
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />

              <div className="px-1">
                <Checkbox
                  id="terms"
                  label="I agree to the Terms and Conditions and the Privacy Policy."
                  required
                />
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                icon={<ChevronRight className="w-5 h-5" />}
                iconPosition="right"
                disabled={
                  isSubmitting ||
                  !formData.password ||
                  !formData.email ||
                  !formData.name
                }
              >
                Create Account
              </Button>
            </form>

            <footer className="mt-10 text-center">
              <p className="text-sm text-neutral-500 font-medium">
                Already have an account?
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline ml-2"
                >
                  Sign in
                </Link>
              </p>
            </footer>
          </section>
        </main>
      </div>
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
