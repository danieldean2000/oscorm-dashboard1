"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import {
  TrendingUp,
  FileText,
  Eye,
  Users,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchPosts } from "@/lib/redux/slices/blogSlice";
import { get } from "@/app/utils/apiMethods";
import { API_ENDPOINTS } from "@/lib/api-config";
import Link from "next/link";

interface UserStats {
  total_users: number;
  admin_count: number;
  blog_user_count: number;
  active_count: number;
  inactive_count: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { posts, loading: postsLoading } = useAppSelector((state) => state.blog);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Fetch posts on mount
  useEffect(() => {
    const fetchData = async () => {
      const params: any = {
        page: 1,
        limit: 100,
      };

      if (user?.role !== "admin" && user?.id) {
        params.author_id = parseInt(user.id);
      }

      await dispatch(fetchPosts(params));
    };

    fetchData();
  }, [dispatch, user]);

  // Fetch user stats for admin
  useEffect(() => {
    const fetchUserStats = async () => {
      if (user?.role === "admin") {
        try {
          setLoadingStats(true);
          const result = await get(API_ENDPOINTS.USERS.STATS);
          if (result.success) {
            setUserStats(result.data);
          }
        } catch (err) {
          console.error("Error fetching user stats:", err);
        } finally {
          setLoadingStats(false);
        }
      }
    };

    fetchUserStats();
  }, [user]);

  // Filter posts based on user role
  const userPosts = user?.role === "admin" 
    ? posts 
    : posts.filter((post) => String(post.author_id) === user?.id);

  // Calculate stats based on role
  const totalPosts = userPosts.length;
  const publishedPosts = userPosts.filter((p) => p.status === "published").length;
  const draftPosts = userPosts.filter((p) => p.status === "draft").length;
  const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0);

  // Admin stats
  const adminStats = [
    {
      title: "Total Posts",
      value: posts.length.toString(),
      change: "",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Active Users",
      value: userStats?.active_count?.toString() || "0",
      change: "",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Total Users",
      value: userStats?.total_users?.toString() || "0",
      change: "",
      icon: Users,
      color: "text-orange-500",
    },
  ];

  // Blog User stats
  const blogUserStats = [
    {
      title: "My Posts",
      value: totalPosts.toString(),
      change: "",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Published",
      value: publishedPosts.toString(),
      change: "",
      icon: FileText,
      color: "text-purple-500",
    },
    {
      title: "Drafts",
      value: draftPosts.toString(),
      change: "",
      icon: FileText,
      color: "text-orange-500",
    },
    {
      title: "Total Views",
      value: totalViews.toString(),
      change: "",
      icon: Eye,
      color: "text-green-500",
    },
  ];

  const stats = user?.role === "admin" ? adminStats : blogUserStats;
  const recentPosts = userPosts.slice(0, 5);

  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            {user?.role === "admin" 
              ? `Welcome back${user?.name ? `, ${user.name}` : ""}! Here's an overview of all blog activity.`
              : `Welcome back${user?.name ? `, ${user.name}` : ""}! Here's an overview of your posts.`
            }
          </p>
          {user && (
            <div className="mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
                {user.role === "blog_user" ? "Blog User" : "Admin"}
              </span>
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl sm:text-2xl font-bold">
                      {postsLoading || loadingStats ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        stat.value
                      )}
                    </div>
                    {stat.change && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-500">{stat.change}</span> from
                        last month
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {user?.role === "admin" ? "Recent Posts (All)" : "My Recent Posts"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {postsLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                  <p className="text-muted-foreground">Loading posts...</p>
                </div>
              ) : recentPosts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {user?.role === "admin" 
                      ? "No posts found" 
                      : "You haven't created any posts yet. Create your first post!"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex flex-col gap-3 p-3 sm:p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                          <AvatarFallback className="text-xs sm:text-sm">
                            {post.author_name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-sm sm:text-base leading-tight break-words">
                              {post.title}
                            </h3>
                            <Badge
                              variant={
                                post.status === "published"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs shrink-0 w-fit"
                            >
                              {post.status}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                            {post.created_at && (
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3 shrink-0" />
                                <span>
                                  {new Date(post.created_at).toLocaleDateString()}
                                </span>
                              </span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <Eye className="h-3 w-3 shrink-0" />
                              {post.views || 0} views
                            </span>
                            {post.author_name && (
                              <span className="truncate">by {post.author_name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-1 sm:gap-2 border-t pt-3 sm:border-0 sm:pt-0">
                        {post.id && (
                          <Link href={`/posts/edit/${post.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                              <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                    {index < recentPosts.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
