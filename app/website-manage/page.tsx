"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Briefcase, 
  UserPlus, 
  Globe,
  ArrowRight,
  HelpCircle
} from "lucide-react";

export default function WebsiteManagePage() {
  const pages = [
    {
      title: "Home Page",
      description: "Manage hero section, slides, and service cards for your home page",
      href: "/website-manage/home",
      icon: Home,
      color: "text-blue-500",
    },
    {
      title: "Service Page",
      description: "Manage service section header and service cards with detailed information",
      href: "/website-manage/service",
      icon: Briefcase,
      color: "text-purple-500",
    },
    {
      title: "Hire Us Page",
      description: "Manage contact information, form fields, and why choose us section",
      href: "/website-manage/hire-us",
      icon: UserPlus,
      color: "text-green-500",
    },
    {
      title: "FAQ Page",
      description: "Manage frequently asked questions and answers for your website",
      href: "/website-manage/faq",
      icon: HelpCircle,
      color: "text-orange-500",
    },
  ];

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
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Website Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage all your website pages and content from one place
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={page.href}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={`h-6 w-6 ${page.color}`} />
                          <CardTitle>{page.title}</CardTitle>
                        </div>
                        <CardDescription>{page.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          Manage Page
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

