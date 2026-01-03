"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Eye, Upload, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useCategories } from "@/contexts/categories-context";
import { useAuth } from "@/contexts/auth-context";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchPostById, updatePost, clearError } from "@/lib/redux/slices/blogSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Declare CKEditor type for TypeScript
declare global {
  interface Window {
    CKEDITOR: any;
  }
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id ? parseInt(params.id as string) : null;
  const dispatch = useAppDispatch();
  const { currentPost, loading, error } = useAppSelector((state) => state.blog);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentEditorRef = useRef<HTMLTextAreaElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const { categories } = useCategories();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  
  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  
  // Image Fields
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // Fetch post data on mount
  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }
  }, [postId, dispatch]);

  // Populate form when post data is loaded
  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title || "");
      setContent(currentPost.content || "");
      setCategory(currentPost.category_id ? String(currentPost.category_id) : "");
      setTags(currentPost.tags || "");
      setStatus(currentPost.status || "draft");
      setMetaTitle(currentPost.meta_title || "");
      setMetaDescription(currentPost.meta_description || "");
      setSlug(currentPost.slug || "");
      setImageAlt(currentPost.image_alt || "");
      
      if (currentPost.featured_image) {
        setExistingImageUrl(currentPost.featured_image);
        setImagePreview(currentPost.featured_image);
      }
    }
  }, [currentPost]);

  // Load CKEditor script and initialize
  useEffect(() => {
    // Suppress CKEditor version warning
    const originalWarn = console.warn;
    const originalError = console.error;
    
    const suppressCKEditorWarning = (...args: any[]) => {
      const message = args.join(' ');
      if (message.includes('CKEditor') && (message.includes('not secure') || message.includes('4.18.0'))) {
        return;
      }
      originalWarn.apply(console, args);
    };

    const suppressCKEditorError = (...args: any[]) => {
      const message = args.join(' ');
      if (message.includes('CKEditor') && (message.includes('not secure') || message.includes('4.18.0'))) {
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = suppressCKEditorWarning;
    console.error = suppressCKEditorError;

    if (window.CKEDITOR) {
      initializeEditor();
      return () => {
        console.warn = originalWarn;
        console.error = originalError;
      };
    }

    const script = document.createElement("script");
    script.src = "https://cdn.ckeditor.com/4.18.0/full-all/ckeditor.js";
    script.async = true;
    script.onload = () => {
      initializeEditor();
    };
    document.head.appendChild(script);

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
      
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, [content]);

  // Initialize CKEditor
  const initializeEditor = () => {
    if (contentEditorRef.current && window.CKEDITOR && !editorInstanceRef.current) {
      editorInstanceRef.current = window.CKEDITOR.replace("content", {
        height: 400,
      });

      if (content) {
        editorInstanceRef.current.setData(content);
      }

      editorInstanceRef.current.on("change", () => {
        const editorData = editorInstanceRef.current.getData();
        setContent(editorData);
      });

      editorInstanceRef.current.on("instanceReady", () => {
        setIsEditorLoaded(true);
      });
    } else if (editorInstanceRef.current && content) {
      editorInstanceRef.current.setData(content);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === currentPost?.slug) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
    if (!metaTitle || metaTitle === currentPost?.meta_title) {
      setMetaTitle(value);
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Replace spaces with hyphens in filename
      const originalName = file.name;
      const sanitizedName = originalName.replace(/\s+/g, '-');
      
      // Create a new File object with sanitized name
      const sanitizedFile = new File([file], sanitizedName, {
        type: file.type,
        lastModified: file.lastModified,
      });
      
      setImage(sanitizedFile);
      setExistingImageUrl(null); // Clear existing image URL when new image is selected
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId) {
      return;
    }

    // Clear any previous errors
    dispatch(clearError());

    // Get latest content from CKEditor
    let finalContent = content;
    if (editorInstanceRef.current) {
      finalContent = editorInstanceRef.current.getData();
      setContent(finalContent);
    }

    // Prepare form data for API
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", finalContent);
    formData.append("slug", slug);
    formData.append("status", status);
    formData.append("meta_title", metaTitle);
    formData.append("meta_description", metaDescription);
    formData.append("image_alt", imageAlt);
    
    if (category) {
      formData.append("category_id", category);
    }
    
    if (tags) {
      formData.append("tags", tags);
    }
    
    if (image) {
      formData.append("image", image);
    }
    
    if (user?.id) {
      formData.append("author_id", user.id);
    }

    try {
      await dispatch(updatePost({ id: postId, postData: formData })).unwrap();
      // Success - redirect to posts page
      router.push("/posts");
    } catch (err) {
      // Error is handled by Redux state
      console.error("Failed to update post:", err);
    }
  };

  if (!postId) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="text-center py-8">
            <p className="text-destructive">Invalid post ID</p>
            <Link href="/posts">
              <Button className="mt-4">Back to Posts</Button>
            </Link>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (loading && !currentPost) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4"
          >
            <Link href="/posts">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Edit Post
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Update your blog post
              </p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Post Content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Post Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter post title..."
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        This will be the main heading of your blog post
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <textarea
                        ref={contentEditorRef}
                        id="content"
                        placeholder="Write your post content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={20}
                        className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Write your full blog post content here
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Featured Image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Image</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                          <img
                            src={imagePreview}
                            alt={imageAlt || "Preview"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm font-medium mb-2">
                          Click to upload featured image
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <Label htmlFor="imageAlt">Image Alt Text *</Label>
                      <Input
                        id="imageAlt"
                        placeholder="Describe the image for SEO and accessibility..."
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        required={!!imagePreview}
                      />
                      <p className="text-xs text-muted-foreground">
                        Important for SEO and accessibility. Describe what's in the image.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Title *</Label>
                      <Input
                        id="metaTitle"
                        placeholder="SEO-friendly title (50-60 characters recommended)"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        required
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground">
                        {metaTitle.length}/60 characters - This appears in search results
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description *</Label>
                      <textarea
                        id="metaDescription"
                        placeholder="A brief description of your post (150-160 characters recommended)"
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        required
                        rows={3}
                        maxLength={160}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <p className="text-xs text-muted-foreground">
                        {metaDescription.length}/160 characters - This appears in search results below the title
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        placeholder="url-friendly-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        URL-friendly version of your title (auto-generated from title)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                {/* Publish */}
                <Card>
                  <CardHeader>
                    <CardTitle>Publish</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={status === "draft" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setStatus("draft")}
                      >
                        Save Draft
                      </Button>
                      <Button
                        type="button"
                        variant={status === "published" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setStatus("published")}
                      >
                        Publish
                      </Button>
                    </div>
                    <div className="pt-2">
                      <Badge variant={status === "published" ? "default" : "secondary"}>
                        Status: {status}
                      </Badge>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Post"}
                    </Button>
                    {error && (
                      <p className="text-sm text-destructive mt-2">{error}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Post Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Post Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category" className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.length === 0 ? (
                            <SelectItem value="none" disabled>
                              No categories available
                            </SelectItem>
                          ) : (
                            categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {categories.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          <Link
                            href="/categories"
                            className="text-primary hover:underline"
                          >
                            Create categories
                          </Link>{" "}
                          to organize your posts
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="tag1, tag2, tag3"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate tags with commas
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

