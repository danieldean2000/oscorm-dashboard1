"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Home } from "lucide-react";
import TestimonialSection from "@/components/Home/TestimonialSection";
import Testimonials from "@/components/Home/Testimonials";
import CTASection from "@/components/Home/CTASection";

export default function HomeManagePage() {

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <Home className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Home Page Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage testimonials and CTA section for your home page
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Section Header */}
          <TestimonialSection />

          {/* Testimonials List */}
          <Testimonials />

          {/* CTA Section */}
          <CTASection />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

