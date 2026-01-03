"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MoreVertical,
  Filter,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchPosts, deletePost } from "@/lib/redux/slices/blogSlice";


export default function PostsPage() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.blog);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch posts on mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      const params: any = {
        page: 1,
        limit: 100, // Fetch all posts for now
      };

      if (filterStatus !== "all") {
        params.status = filterStatus;
      }

      if (user?.role !== "admin" && user?.id) {
        params.author_id = parseInt(user.id);
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      await dispatch(fetchPosts(params));
    };

    fetchData();
  }, [dispatch, filterStatus, user]);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      const params: any = {
        page: 1,
        limit: 100,
      };

      if (filterStatus !== "all") {
        params.status = filterStatus;
      }

      if (user?.role !== "admin" && user?.id) {
        params.author_id = parseInt(user.id);
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      await dispatch(fetchPosts(params));
    }, 500); // Wait 500ms after user stops typing

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, dispatch, filterStatus, user]);

  // Use posts directly from API (search and filter are handled by API)
  // Only do client-side filtering if needed for additional filtering
  const filteredPosts = posts.filter((post) => {
    // API already handles search and status filter, but we can add additional client-side filters here if needed
    const matchesFilter = filterStatus === "all" || post.status === filterStatus;
    return matchesFilter;
  });

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await dispatch(deletePost(id)).unwrap();
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Posts
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                {user?.role === "admin" 
                  ? "Manage all blog posts" 
                  : "Manage your blog posts"}
              </p>
            </div>
            <Link href="/posts/new">
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
          </motion.div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("all")}
                    className="flex-1 sm:flex-initial min-w-[80px]"
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === "published" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("published")}
                    className="flex-1 sm:flex-initial min-w-[100px]"
                  >
                    Published
                  </Button>
                  <Button
                    variant={filterStatus === "draft" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("draft")}
                    className="flex-1 sm:flex-initial min-w-[80px]"
                  >
                    Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {user?.role === "admin" ? "All Posts" : "My Posts"} ({filteredPosts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading posts...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-destructive">{error}</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {user?.role === "admin" 
                      ? "No posts found matching your search" 
                      : "You haven't created any posts yet. Create your first post!"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex flex-col gap-3 p-3 sm:p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                          <AvatarFallback className="text-xs sm:text-sm">
                            {post.author_name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-sm sm:text-base leading-tight break-words">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                variant={
                                  post.status === "published"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs shrink-0"
                              >
                                {post.status}
                              </Badge>
                              {post.category_name && (
                                <Badge variant="outline" className="text-xs shrink-0">
                                  {post.category_name}
                                </Badge>
                              )}
                            </div>
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
                        <Link href={`/posts/edit/${post.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 sm:h-9 sm:w-9"
                          onClick={() => post.id && handleDelete(post.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                          <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                    {index < filteredPosts.length - 1 && (
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

