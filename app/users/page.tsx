"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  UserPlus,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/api-config";
import { get, post, put, del } from "@/app/utils/apiMethods";

const API_BASE_URL = API_ENDPOINTS.USERS.BASE;

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "blog_user";
  posts: number;
  status: "active" | "inactive";
  joined: string;
}

interface UserStats {
  total_users: number;
  admin_count: number;
  blog_user_count: number;
  active_count: number;
  inactive_count: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "blog_user" as "admin" | "blog_user",
    status: "active" as "active" | "inactive",
  });

  // Transform API response to frontend format
  const transformUser = (apiUser: any): User => ({
    id: String(apiUser.id),
    name: apiUser.name,
    email: apiUser.email,
    role: apiUser.role,
    posts: apiUser.posts_count || 0,
    status: apiUser.status,
    joined: apiUser.created_at
      ? new Date(apiUser.created_at).toLocaleDateString()
      : new Date().toLocaleDateString(),
  });

  // Fetch all users
  const fetchUsers = async (search: string = "") => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search) {
        params.append("search", search);
      }
      params.append("limit", "100");

      const result = await get(`${API_BASE_URL}?${params.toString()}`);

      if (result.success) {
        const transformedUsers = result.data.map(transformUser);
        setUsers(transformedUsers);
      } else {
        setError(result.message || "Failed to fetch users");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch users. Make sure backend server is running.");
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user statistics
  const fetchStats = async () => {
    try {
      const result = await get(API_ENDPOINTS.USERS.STATS);

      if (result.success) {
        setStats(result.data);
      }
    } catch (err: any) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  // Refetch when search query changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "blog_user",
        status: "active",
      });
    }
    setIsDialogOpen(true);
    setError(null);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "blog_user",
      status: "active",
    });
    setError(null);
  };

  const handleCreateUser = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Name, email, and password are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await post(API_BASE_URL, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.status,
      });

      if (result.success) {
        await fetchUsers();
        await fetchStats();
        handleCloseDialog();
      } else {
        setError(result.message || result.errors?.[0]?.msg || "Failed to create user");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create user");
      console.error("Error creating user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser || !formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const updateData: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      };

      // Only include password if provided
      if (formData.password.trim()) {
        updateData.password = formData.password;
      }

      const result = await put(`${API_BASE_URL}/${editingUser.id}`, updateData);

      if (result.success) {
        await fetchUsers();
        await fetchStats();
        handleCloseDialog();
      } else {
        setError(result.message || result.errors?.[0]?.msg || "Failed to update user");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update user");
      console.error("Error updating user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE_URL}/${id}`);

      if (result.success) {
        await fetchUsers();
        await fetchStats();
      } else {
        setError(result.message || "Failed to delete user");
        alert(result.message || "Failed to delete user");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
      console.error("Error deleting user:", err);
      alert(err.message || "Failed to delete user");
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
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Users
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Manage all blog users and their permissions
              </p>
            </div>
            <Button 
              className="w-full sm:w-auto"
              onClick={() => handleOpenDialog()}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
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
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {stats?.total_users ?? users.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total Users
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
                    {stats?.admin_count ?? users.filter((u) => u.role === "admin").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Administrators
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {stats?.active_count ?? users.filter((u) => u.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Active Users
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
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>All Users ({users.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                  <p className="text-muted-foreground">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {searchQuery ? "No users found matching your search." : "No users found."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {users.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-col gap-3 p-3 sm:p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                            <AvatarFallback className="text-xs sm:text-sm">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold text-sm sm:text-base break-words">
                                {user.name}
                              </h3>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge
                                  variant={
                                    user.role === "admin" ? "default" : "secondary"
                                  }
                                  className="text-xs shrink-0 capitalize"
                                >
                                  {user.role === "blog_user" ? "Blog User" : "Admin"}
                                </Badge>
                                <Badge
                                  variant={
                                    user.status === "active"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="text-xs shrink-0"
                                >
                                  {user.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                              <span className="break-all sm:break-normal">{user.email}</span>
                              <span>{user.posts} posts</span>
                              <span>Joined {user.joined}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-1 sm:gap-2 border-t pt-3 sm:border-0 sm:pt-0">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 sm:h-9 sm:w-9"
                            onClick={() => handleOpenDialog(user)}
                            disabled={isSubmitting}
                          >
                            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={isSubmitting}
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                      {index < users.length - 1 && (
                        <div className="border-t my-2" />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Create/Edit User Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? "Edit User" : "Add New User"}
                </DialogTitle>
                <DialogDescription>
                  {editingUser
                    ? "Update user information. Leave password empty to keep current password."
                    : "Create a new user account for the blog."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password {editingUser ? "(leave empty to keep current)" : "*"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={editingUser ? "••••••••" : "Enter password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required={!editingUser}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: "admin" | "blog_user") =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger id="role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog_user">Blog User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "inactive") =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {error && (
                  <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm">
                    {error}
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleCloseDialog}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={editingUser ? handleUpdateUser : handleCreateUser}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingUser ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingUser ? "Update" : "Create"} User
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

