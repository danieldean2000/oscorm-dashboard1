"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Trash2,
  Loader2,
  Mail,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/api-config";
import { get, del } from "@/app/utils/apiMethods";

const API_BASE_URL = API_ENDPOINTS.NEWSLETTER.BASE;

interface NewsletterSubscription {
  id: string;
  email: string;
  created_at: string;
}

export default function NewsletterPage() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // Transform API response to frontend format
  const transformSubscription = (apiSubscription: any): NewsletterSubscription => ({
    id: String(apiSubscription.id),
    email: apiSubscription.email,
    created_at: apiSubscription.created_at,
  });

  // Fetch all newsletter subscriptions
  const fetchSubscriptions = async (page: number = 1, limit: number = 100) => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const result = await get(`${API_BASE_URL}?${params.toString()}`);

      if (result.success) {
        const transformedSubscriptions = result.data.map(transformSubscription);
        setSubscriptions(transformedSubscriptions);
        if (result.pagination) {
          setPagination(result.pagination);
        }
      } else {
        setError(result.message || "Failed to fetch newsletter subscriptions");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch newsletter subscriptions. Make sure backend server is running.");
      console.error("Error fetching newsletter subscriptions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Filter subscriptions based on search query
  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSubscription = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscription?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE_URL}/${id}`);

      if (result.success) {
        await fetchSubscriptions(pagination.page, pagination.limit);
      } else {
        setError(result.message || "Failed to delete subscription");
        alert(result.message || "Failed to delete subscription");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete subscription");
      console.error("Error deleting subscription:", err);
      alert(err.message || "Failed to delete subscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Newsletter Subscriptions
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Manage all newsletter email subscriptions
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 text-destructive px-4 py-3 rounded-md border border-destructive/20"
            >
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Stats */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {pagination.total || subscriptions.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total Subscriptions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {filteredSubscriptions.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Filtered Results
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions List */}
          <Card>
            <CardHeader>
              <CardTitle>
                All Subscriptions ({filteredSubscriptions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                  <p className="text-muted-foreground">Loading subscriptions...</p>
                </div>
              ) : filteredSubscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "No subscriptions found matching your search."
                      : "No newsletter subscriptions found."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {filteredSubscriptions.map((subscription, index) => (
                    <motion.div
                      key={subscription.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-col gap-3 p-3 sm:p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                            <AvatarFallback className="text-xs sm:text-sm">
                              <Mail className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold text-sm sm:text-base break-words">
                                {subscription.email}
                              </h3>
                            </div>
                            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                              {subscription.created_at && (
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="h-3 w-3 shrink-0" />
                                  <span>
                                    Subscribed on{" "}
                                    {new Date(subscription.created_at).toLocaleDateString()}
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-1 sm:gap-2 border-t pt-3 sm:border-0 sm:pt-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteSubscription(subscription.id)}
                            disabled={isSubmitting}
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                      {index < filteredSubscriptions.length - 1 && (
                        <div className="border-t my-2" />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

