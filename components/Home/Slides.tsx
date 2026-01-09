"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Save, 
  Trash2, 
  Plus,
  FileText,
  Loader2
} from "lucide-react";
import { get, put, del, post } from "@/app/utils/apiMethods";
import { getApiUrl } from "@/lib/api-config";

interface Slide {
  id?: string;
  title: string;
  description: string;
  image: string;
  link: string;
  order: number;
  isActive: boolean;
}

const API_BASE = getApiUrl("api/home-slides");

export default function Slides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchSlides = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await get(API_BASE);
      
      if (result.success && result.data) {
        setSlides(result.data);
      } else if (result.success && !result.data) {
        setSlides([]);
      } else {
        setError(result.message || "Failed to fetch slides");
      }
    } catch (err: any) {
      console.error("Error fetching slides:", err);
      setError(err.message || "Failed to fetch slides");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleSave = async (slideId: string) => {
    const slide = slides.find(s => s.id === slideId);
    if (!slide) return;

    if (!slide.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const payload = {
        title: slide.title.trim(),
        description: slide.description.trim(),
        image: slide.image.trim(),
        link: slide.link.trim(),
        order: slide.order,
        isActive: slide.isActive,
      };

      const isNew = !slide.id;
      const result = isNew 
        ? await post(API_BASE, payload)
        : await put(`${API_BASE}/${slide.id}`, payload);

      if (result.success) {
        setSuccessMessage(`Slide ${isNew ? "created" : "updated"} successfully!`);
        setEditingSlide(null);
        await fetchSlides();
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || result.errors?.[0]?.msg || `Failed to ${isNew ? "create" : "update"} slide`);
      }
    } catch (err: any) {
      console.error("Error saving slide:", err);
      setError(err.message || "Failed to save slide");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (slideId: string) => {
    const slide = slides.find(s => s.id === slideId);
    if (!slide || !slide.id) {
      setError("No slide to delete");
      return;
    }

    if (!confirm("Are you sure you want to delete this slide?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await del(`${API_BASE}/${slide.id}`);

      if (result.success) {
        setSuccessMessage("Slide deleted successfully!");
        await fetchSlides();
        
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(result.message || "Failed to delete slide");
      }
    } catch (err: any) {
      console.error("Error deleting slide:", err);
      setError(err.message || "Failed to delete slide");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: "New Slide",
      description: "Slide description",
      image: "/images/slide-default.jpg",
      link: "/",
      order: slides.length + 1,
      isActive: true,
    };
    setSlides([...slides, newSlide]);
    setEditingSlide(newSlide.id!);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Slides Management</CardTitle>
            </div>
            <Button onClick={handleAddSlide} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm mb-4">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm mb-4">
              {successMessage}
            </div>
          )}

          <div className="space-y-4">
            {slides.map((slide, index) => (
              <div key={slide.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Slide {index + 1}
                    </span>
                    <Badge variant={slide.isActive ? "default" : "secondary"}>
                      {slide.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    {editingSlide === slide.id ? (
                      <Button onClick={() => handleSave(slide.id!)} size="sm" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                      </Button>
                    ) : (
                      <Button onClick={() => setEditingSlide(slide.id!)} variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(slide.id!)}
                      variant="destructive"
                      size="sm"
                      disabled={isSubmitting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {editingSlide === slide.id ? (
                  <div className="space-y-3">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={slide.title}
                        onChange={(e) => {
                          const updated = slides.map(s =>
                            s.id === slide.id ? { ...s, title: e.target.value } : s
                          );
                          setSlides(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <textarea
                        className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                        value={slide.description}
                        onChange={(e) => {
                          const updated = slides.map(s =>
                            s.id === slide.id ? { ...s, description: e.target.value } : s
                          );
                          setSlides(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={slide.image}
                        onChange={(e) => {
                          const updated = slides.map(s =>
                            s.id === slide.id ? { ...s, image: e.target.value } : s
                          );
                          setSlides(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Link</Label>
                      <Input
                        value={slide.link}
                        onChange={(e) => {
                          const updated = slides.map(s =>
                            s.id === slide.id ? { ...s, link: e.target.value } : s
                          );
                          setSlides(updated);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-semibold">{slide.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{slide.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">Image: {slide.image}</p>
                    <p className="text-xs text-muted-foreground">Link: {slide.link}</p>
                  </div>
                )}
              </div>
            ))}

            {slides.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No slides added yet. Click "Add Slide" to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

