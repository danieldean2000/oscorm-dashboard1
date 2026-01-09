"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Briefcase } from "lucide-react";

// Import all Service Components
import { ServiceSectionHeader } from "@/components/Services/MainCategory/ServiceSectionHeader";
import { ServiceCards } from "@/components/Services/MainCategory/ServiceCards";
import { TrustedBySectionComponent } from "@/components/Services/MainCategory/TrustedBySection";
import { WhatWeDeliver } from "@/components/Services/MainCategory/WhatWeDeliver";
import { WhyAvoidFreelancers } from "@/components/Services/MainCategory/WhyAvoidFreelancers";
import { ProvenDeliveryModel } from "@/components/Services/MainCategory/ProvenDeliveryModel";
import { RealTimeTracking } from "@/components/Services/MainCategory/RealTimeTracking";
import { EngagementModels } from "@/components/Services/MainCategory/EngagementModels";
import { ToolsTechnologies } from "@/components/Services/MainCategory/ToolsTechnologies";
import { AIElevatesOutput } from "@/components/Services/MainCategory/AIElevatesOutput";
import { PortfolioShowcase } from "@/components/Services/MainCategory/PortfolioShowcase";
import { WhyOscorm } from "@/components/Services/MainCategory/WhyOscorm";
import Hero from "@/components/Services/MainCategory/Hero";
export default function MainCategoryPage() {
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
              <Briefcase className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Main Category Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage main category sections and service cards
                </p>
              </div>
            </div>
          </motion.div>

          {/* Service Section Header */}
          <ServiceSectionHeader />

          <Hero />


          {/* Service Cards */}
          <ServiceCards />

          {/* Trusted By Industry Leaders Section */}
          <TrustedBySectionComponent />

          {/* What We Deliver Section */}
          <WhatWeDeliver />

          {/* Why Avoid Freelancers Section */}
          <WhyAvoidFreelancers />

          {/* Proven Delivery Model Section */}
          <ProvenDeliveryModel />

          {/* Real-Time Tracking Section */}
          <RealTimeTracking />

          {/* Engagement Models Section */}
          <EngagementModels />

          {/* Tools & Technologies Section */}
          <ToolsTechnologies />

          {/* AI That Elevates Every Output Section */}
          <AIElevatesOutput />

          {/* Portfolio Showcase Section */}
          <PortfolioShowcase />

          {/* Why Oscorm Section */}
          <WhyOscorm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
