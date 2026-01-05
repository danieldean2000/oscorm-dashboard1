"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  MessageSquare,
  Filter,
  Loader2,
  Calendar,
  Mail,
  User,
  Star,
  Link as LinkIcon,
} from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api-config";
import { get, patch, del } from "@/app/utils/apiMethods";

const API_BASE_URL = API_ENDPOINTS.BLOG_COMMENTS.BASE;
const POSTS_API_URL = API_ENDPOINTS.BLOG_POSTS.BASE;

interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  content: string;
  review?: number | null;
  url?: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at?: string;
  post_title?: string;
}

interface Post {
  id: number;
  title: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all");

  // Fetch all posts to get titles
  const fetchPosts = async () => {
    try {
      const result = await get(`${POSTS_API_URL}?limit=1000`);

      if (result.success && result.data) {
        const postsMap: Record<number, string> = {};
        result.data.forEach((post: Post) => {
          postsMap[post.id] = post.title;
        });
        setPosts(postsMap);
        return true;
      }
    } catch (err: any) {
      console.error("Error fetching posts:", err);
    }
    return false;
  };

  // Transform API response to frontend format
  const transformComment = (apiComment: any): Comment => ({
    id: apiComment.id,
    post_id: apiComment.post_id,
    name: apiComment.name,
    email: apiComment.email,
    content: apiComment.content,
    review: apiComment.review !== undefined && apiComment.review !== null ? parseInt(apiComment.review) : null,
    url: apiComment.url || null,
    is_approved: apiComment.is_approved === true || apiComment.is_approved === 1,
    created_at: apiComment.created_at,
    updated_at: apiComment.updated_at,
    post_title: posts[apiComment.post_id] || `Post #${apiComment.post_id}`,
  });

  // Fetch all comments
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      params.append("limit", "100");
      
      if (filterStatus === "approved") {
        params.append("is_approved", "true");
      } else if (filterStatus === "pending") {
        params.append("is_approved", "false");
      }

      const result = await get(`${API_BASE_URL}/all?${params.toString()}`);

      if (result.success) {
        const transformedComments = result.data.map(transformComment);
        setComments(transformedComments);
      } else {
        setError(result.message || "Failed to fetch comments");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch comments. Make sure backend server is running.");
      console.error("Error fetching comments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch posts first, then comments
  useEffect(() => {
    const loadData = async () => {
      const postsLoaded = await fetchPosts();
      if (postsLoaded) {
        // Fetch comments after posts are loaded
        fetchComments();
      }
    };
    loadData();
  }, []);

  // Fetch comments when filter changes (only if posts are already loaded)
  useEffect(() => {
    if (Object.keys(posts).length > 0) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  // Update comments when posts are loaded
  useEffect(() => {
    if (Object.keys(posts).length > 0 && comments.length > 0) {
      const updatedComments = comments.map((comment) => ({
        ...comment,
        post_title: posts[comment.post_id] || `Post #${comment.post_id}`,
      }));
      // Only update if titles actually changed
      const hasChanges = updatedComments.some(
        (c, i) => c.post_title !== comments[i]?.post_title
      );
      if (hasChanges) {
        setComments(updatedComments);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  // Filter comments by search query
  const filteredComments = comments.filter((comment) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      comment.name.toLowerCase().includes(query) ||
      comment.email.toLowerCase().includes(query) ||
      comment.content.toLowerCase().includes(query)
    );
  });

  const handleApprove = async (id: number, currentStatus: boolean) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const result = await patch(API_ENDPOINTS.BLOG_COMMENTS.APPROVE(id), {
        is_approved: !currentStatus,
      });

      if (result.success) {
        await fetchComments(); // Refresh the list
      } else {
        setError(result.message || "Failed to update comment status");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update comment status");
      console.error("Error updating comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE_URL}/${id}`);

      if (result.success) {
        await fetchComments(); // Refresh the list
      } else {
        setError(result.message || "Failed to delete comment");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete comment");
      console.error("Error deleting comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pendingCount = comments.filter((c) => !c.is_approved).length;
  const approvedCount = comments.filter((c) => c.is_approved).length;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
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
                Comments
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Manage blog post comments and approvals
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm">
                Total: {comments.length}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Pending: {pendingCount}
              </Badge>
              <Badge variant="default" className="text-sm">
                Approved: {approvedCount}
              </Badge>
            </div>
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

          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or content..."
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
                    variant={filterStatus === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("pending")}
                    className="flex-1 sm:flex-initial min-w-[100px]"
                  >
                    Pending
                  </Button>
                  <Button
                    variant={filterStatus === "approved" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus("approved")}
                    className="flex-1 sm:flex-initial min-w-[100px]"
                  >
                    Approved
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          <Card>
            <CardHeader>
              <CardTitle>
                Comments ({filteredComments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                  <p className="text-muted-foreground">Loading comments...</p>
                </div>
              ) : filteredComments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "No comments found matching your search"
                      : filterStatus === "pending"
                      ? "No pending comments"
                      : filterStatus === "approved"
                      ? "No approved comments"
                      : "No comments found"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {filteredComments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-col gap-3 p-3 sm:p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                            <AvatarFallback className="text-xs sm:text-sm">
                              {comment.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold text-sm sm:text-base">
                                    {comment.name}
                                  </h3>
                                  <Badge
                                    variant={
                                      comment.is_approved ? "default" : "secondary"
                                    }
                                    className="text-xs shrink-0"
                                  >
                                    {comment.is_approved ? "Approved" : "Pending"}
                                  </Badge>
                                  {comment.review && (
                                    <Badge variant="outline" className="text-xs shrink-0 flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      {comment.review}/5
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                  <Badge variant="outline" className="text-xs w-fit">
                                    <span className="font-medium">Post:</span>{" "}
                                    <span className="truncate max-w-[200px] sm:max-w-[300px]">
                                      {comment.post_title || `Post #${comment.post_id}`}
                                    </span>
                                  </Badge>
                                  <span className="text-xs text-muted-foreground hidden sm:inline">
                                    (ID: {comment.post_id})
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <Mail className="h-3 w-3 shrink-0" />
                                  {comment.email}
                                </span>
                                {comment.created_at && (
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3 shrink-0" />
                                    {new Date(comment.created_at).toLocaleDateString()}
                                  </span>
                                )}
                                {comment.review && (
                                  <span className="flex items-center gap-1.5">
                                    <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium text-foreground">
                                      Rating: {comment.review}/5
                                    </span>
                                  </span>
                                )}
                                {comment.url && (
                                  <span className="flex items-center gap-1.5">
                                    <LinkIcon className="h-3 w-3 shrink-0" />
                                    <span className="text-muted-foreground">Website:</span>
                                    <a
                                      href={comment.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline truncate max-w-[250px] sm:max-w-[400px]"
                                      title={comment.url}
                                    >
                                      {comment.url}
                                    </a>
                                  </span>
                                )}
                              </div>
                              <p className="text-sm sm:text-base text-foreground mt-2 break-words">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-1 sm:gap-2 border-t pt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 sm:h-9"
                            onClick={() =>
                              handleApprove(comment.id, comment.is_approved)
                            }
                            disabled={isSubmitting}
                          >
                            {comment.is_approved ? (
                              <>
                                <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Unapprove</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Approve</span>
                              </>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(comment.id)}
                            disabled={isSubmitting}
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                      {index < filteredComments.length - 1 && (
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

