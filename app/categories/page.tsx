"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Tag,
  X,
  Save,
  Loader2,
} from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api-config";
import { get, post, put, del } from "@/app/utils/apiMethods";

const API_BASE_URL = API_ENDPOINTS.CATEGORIES.BASE;

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  // Transform API response to frontend format
  const transformCategory = (apiCategory: any): Category => ({
    id: String(apiCategory.id),
    name: apiCategory.name,
    slug: apiCategory.slug,
    description: apiCategory.description || "",
    createdAt: apiCategory.created_at
      ? new Date(apiCategory.created_at).toLocaleDateString()
      : new Date().toLocaleDateString(),
  });

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await get(API_BASE_URL);

      if (result.success) {
        const transformedCategories = result.data.map(transformCategory);
        setCategories(transformedCategories);
      } else {
        setError(result.message || "Failed to fetch categories");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!formData.name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");

      const result = await post(API_BASE_URL, {
        name: formData.name,
        slug: slug,
        description: formData.description || null,
      });

      if (result.success) {
        await fetchCategories(); // Refresh the list
        setFormData({ name: "", slug: "", description: "" });
        setIsAdding(false);
      } else {
        setError(result.message || result.errors?.[0]?.msg || "Failed to create category");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create category");
      console.error("Error creating category:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
  };

  const handleUpdateCategory = async () => {
    if (!formData.name.trim() || !editingId) {
      setError("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");

      const result = await put(`${API_BASE_URL}/${editingId}`, {
        name: formData.name,
        slug: slug,
        description: formData.description || null,
      });

      if (result.success) {
        await fetchCategories(); // Refresh the list
        setFormData({ name: "", slug: "", description: "" });
        setEditingId(null);
      } else {
        setError(result.message || result.errors?.[0]?.msg || "Failed to update category");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update category");
      console.error("Error updating category:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", slug: "", description: "" });
    setIsAdding(false);
    setEditingId(null);
    setError(null);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE_URL}/${id}`);

      if (result.success) {
        await fetchCategories(); // Refresh the list
      } else {
        setError(result.message || "Failed to delete category");
        alert(result.message || "Failed to delete category");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete category");
      console.error("Error deleting category:", err);
      alert(err.message || "Failed to delete category");
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
                Categories
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Manage blog post categories
              </p>
            </div>
            {!isAdding && !editingId && (
              <Button
                onClick={() => {
                  setIsAdding(true);
                  setError(null);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            )}
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

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingId ? "Edit Category" : "Add New Category"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Tutorial, Technical, Design"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (!formData.slug || !editingId) {
                          const slug = e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "-");
                          setFormData((prev) => ({ ...prev, slug }));
                        }
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      placeholder="url-friendly-slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Auto-generated from name (editable)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Brief description of the category"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={editingId ? handleUpdateCategory : handleAddCategory}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {editingId ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {editingId ? "Update" : "Add"} Category
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Categories List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>All Categories ({categories.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {isLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                    <p className="text-muted-foreground">Loading categories...</p>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="text-center py-8">
                    <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No categories found. Create your first category!
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="h-full">
                          <CardContent className="pt-4 sm:pt-6">
                            <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-base sm:text-lg mb-1.5 break-words">
                                  {category.name}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  {category.slug}
                                </Badge>
                              </div>
                              <div className="flex gap-1 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 sm:h-9 sm:w-9"
                                  onClick={() => handleEditCategory(category)}
                                >
                                  <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 sm:h-9 sm:w-9 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteCategory(category.id)}
                                  disabled={isSubmitting}
                                >
                                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                            </div>
                            {category.description && (
                              <p className="text-sm text-muted-foreground break-words">
                                {category.description}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                              Created: {category.createdAt}
                            </p>
                          </CardContent>
                        </Card>
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

